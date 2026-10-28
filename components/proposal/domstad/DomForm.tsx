"use client";
// Demo valuation form in three short steps. Validates in the browser and shows the thank-you state.
// It makes NO network request and stores nothing: it only shows how the real form would behave.
// Step, postcode (as it is typed), house type and sent state are reported through `onReport`, which drives the map.
import { useEffect, useId, useRef, useState, type FormEvent, type InputHTMLAttributes } from "react";
import { ArrowRight, Check } from "@/components/icons";
import { useT } from "@/lib/lang";
import { c } from "./copy";
import { Calendar, Moon, Sun } from "./icons";
import { HOUSE_TYPES, type HouseType, type Prefill } from "./types";

type Field = "postcode" | "number" | "area" | "name" | "phone" | "email";
type Values = Record<Field | "type" | "when", string>;

const RULES: Record<Field, (v: string) => boolean> = {
  postcode: (v) => /^\s*\d{4}\s?[a-zA-Z]{2}\s*$/.test(v),
  number: (v) => /\d/.test(v),
  area: (v) => v.trim() === "" || /^\d{2,4}([.,]\d)?$/.test(v.trim()),
  name: (v) => v.trim().length >= 2,
  phone: (v) => v.replace(/\D/g, "").length >= 10,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
};
const STEP_FIELDS: Field[][] = [["postcode", "number"], ["area"], ["name", "phone", "email"]];

/** What the map needs to know. `postcode` is only set once it is a valid Dutch postcode. */
export type Report = { step: number; sent: boolean; postcode: string; type: HouseType };

export default function DomForm({ owner, prefill, onReport }: { owner: string; prefill?: Prefill; onReport: (r: Report) => void }) {
  const t = useT();
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({
    postcode: prefill?.postcode ?? "", number: prefill?.number ?? "", type: "", area: "", when: "", name: "", phone: "", email: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field | "type", boolean>>>({});
  const [sent, setSent] = useState(false);
  const steps = t(c.form.steps);
  const types = t(c.form.types);

  const houseType: HouseType = (values.type as HouseType) || "appartement";
  const postcode = RULES.postcode(values.postcode) ? values.postcode : "";
  useEffect(() => {
    onReport({ step, sent, postcode, type: houseType });
  }, [step, sent, postcode, houseType, onReport]);

  const set = (k: keyof Values, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (k === "type") setErrors((e) => ({ ...e, type: false }));
    else if (k in RULES && errors[k as Field]) setErrors((e) => ({ ...e, [k]: !RULES[k as Field](v) }));
  };

  function next(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const bad: (Field | "type")[] = STEP_FIELDS[step].filter((f) => !RULES[f](values[f]));
    if (step === 1 && !values.type) bad.unshift("type");
    setErrors(Object.fromEntries(bad.map((f) => [f, true])));
    if (bad.length) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${bad[0]}"]`)?.focus();
      return;
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("input")?.focus({ preventScroll: true }));
    } else setSent(true);
  }

  if (sent) {
    return (
      <div className="dom-done" role="status">
        <span className="dom-done-mark"><Check /></span>
        <h2 className="dom-h2" style={{ fontSize: 32 }}>{t(c.form.doneTitle)(values.name.trim().split(/\s+/)[0])}</h2>
        <p className="dom-lead">{t(c.form.doneBody)(owner, values.when)}</p>
        <div style={{ width: "100%" }}>
          <p style={{ fontWeight: 600, marginBottom: 6 }}>{t(c.form.nextTitle)}</p>
          <ol className="dom-timeline">{t(c.form.nextSteps).map((s) => <li key={s}>{s}</li>)}</ol>
        </div>
        <p className="dom-demo"><span className="dom-tag">{t(c.example)}</span> {t(c.form.sentDemo)}</p>
        <button type="button" className="dom-back" onClick={() => { setSent(false); setStep(0); setErrors({}); }}>{t(c.form.again)}</button>
      </div>
    );
  }

  const input = (name: Field, label: string, props: InputHTMLAttributes<HTMLInputElement> = {}, optional = false) => (
    <div className="dom-field">
      <label htmlFor={`${id}-${name}`}>{label}{optional && <span> ({t(c.form.optional)})</span>}</label>
      <input id={`${id}-${name}`} name={name} className="dom-input" value={values[name]} {...props}
        aria-invalid={errors[name] ? true : undefined} aria-describedby={errors[name] ? `${id}-${name}-err` : undefined}
        onChange={(e) => set(name, e.currentTarget.value)}
        onBlur={(e) => {
          const v = e.currentTarget.value; // read now: React clears currentTarget before the state updater runs
          if (v) setErrors((s) => ({ ...s, [name]: !RULES[name](v) }));
        }} />
      {errors[name] && <p id={`${id}-${name}-err`} className="dom-error">{t(c.form.errors[name])}</p>}
    </div>
  );

  const whenIcons = [Sun, Moon, Calendar];

  return (
    <form ref={formRef} className="dom-form" noValidate onSubmit={next} aria-labelledby={`${id}-h`}>
      <ol className="dom-steps" aria-label={t(c.form.progress)(step + 1, steps.length)}>
        {steps.map((s, i) => (
          <li key={s} data-on={i <= step ? "1" : "0"} aria-current={i === step ? "step" : undefined}>
            <b style={{ fontWeight: "inherit" }}>{i + 1}<span>. {s}</span></b>
          </li>
        ))}
      </ol>
      <h2 id={`${id}-h`} className="dom-h3" style={{ fontSize: 24 }}>{steps[step]}</h2>

      <div className="dom-step dom-form" key={step}>
        {step === 0 && (
          <div className="dom-form-row">
            {input("postcode", t(c.form.postcode), { autoComplete: "postal-code" })}
            {input("number", t(c.form.number))}
          </div>
        )}
        {step === 1 && (
          <>
            <fieldset className="dom-field" aria-describedby={errors.type ? `${id}-type-err` : undefined}>
              <legend className="dom-legend">{t(c.form.type)}</legend>
              <div className="dom-tiles">
                {HOUSE_TYPES.map((key, i) => (
                  <label key={key} className="dom-tile">
                    <input type="radio" name="type" value={key} checked={values.type === key} onChange={() => set("type", key)} />{types[i]}
                  </label>
                ))}
              </div>
              {errors.type && <p id={`${id}-type-err`} className="dom-error">{t(c.form.errors.type)}</p>}
            </fieldset>
            <div style={{ maxWidth: 260 }}>{input("area", t(c.form.area), { inputMode: "decimal" }, true)}</div>
          </>
        )}
        {step === 2 && (
          <>
            <fieldset className="dom-field">
              <legend className="dom-legend">{t(c.form.when)} <span>({t(c.form.optional)})</span></legend>
              <div className="dom-tiles three">
                {t(c.form.whens).map((o, i) => {
                  const Icon = whenIcons[i];
                  return (
                    <label key={o} className="dom-tile">
                      <input type="radio" name="when" value={o} checked={values.when === o} onChange={() => set("when", o)} /><Icon />{o}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            {input("name", t(c.form.name), { autoComplete: "name" })}
            {input("phone", t(c.form.phone), { type: "tel", autoComplete: "tel", inputMode: "tel" })}
            {input("email", t(c.form.email), { type: "email", autoComplete: "email" })}
            <p className="dom-privacy">{t(c.form.privacy)}</p>
          </>
        )}
      </div>

      <div className="dom-form-nav">
        <button type="submit" className="dom-btn">
          {step === steps.length - 1 ? t(c.form.submit) : t(c.form.next)} <ArrowRight />
        </button>
        {step > 0 && <button type="button" className="dom-back" onClick={() => setStep(step - 1)}>{t(c.form.back)}</button>}
        {step === steps.length - 1 && <p className="dom-demo"><span className="dom-tag">{t(c.example)}</span> {t(c.form.demo)}</p>}
      </div>
    </form>
  );
}
