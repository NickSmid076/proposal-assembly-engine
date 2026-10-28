"use client";
// Demo valuation form in three short steps. Validates in the browser and shows the thank-you state.
// It makes NO network request and stores nothing: it only shows how the real form would behave.
// Every change in step, house type or sent state is reported through `onBuild`, which drives the 3D house.
import { useEffect, useId, useRef, useState, type FormEvent, type InputHTMLAttributes } from "react";
import { ArrowRight, Check } from "@/components/icons";
import { useT } from "@/lib/lang";
import { c } from "./copy";
import { Calendar, Moon, Sun } from "./icons";
import { HOUSE_TYPES, type BuildStage, type HouseType, type Prefill } from "./types";

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

export type Build = { stage: BuildStage; type: HouseType };

export default function BvaForm({ owner, prefill, onBuild }: { owner: string; prefill?: Prefill; onBuild: (b: Build) => void }) {
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
  useEffect(() => {
    onBuild({ stage: (sent ? 3 : step) as BuildStage, type: houseType });
  }, [step, sent, houseType, onBuild]);

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
      <div className="bva-done" role="status">
        <span className="bva-done-mark"><Check /></span>
        <h2 className="bva-h2" style={{ fontSize: 32 }}>{t(c.form.doneTitle)(values.name.trim().split(/\s+/)[0])}</h2>
        <p className="bva-lead">{t(c.form.doneBody)(owner, values.when)}</p>
        <div style={{ width: "100%" }}>
          <p style={{ fontWeight: 600, marginBottom: 6 }}>{t(c.form.nextTitle)}</p>
          <ol className="bva-timeline">{t(c.form.nextSteps).map((s) => <li key={s}>{s}</li>)}</ol>
        </div>
        <p className="bva-demo"><span className="bva-tag">{t(c.example)}</span> {t(c.form.sentDemo)}</p>
        <button type="button" className="bva-back" onClick={() => { setSent(false); setStep(0); setErrors({}); }}>{t(c.form.again)}</button>
      </div>
    );
  }

  const input = (name: Field, label: string, props: InputHTMLAttributes<HTMLInputElement> = {}, optional = false) => (
    <div className="bva-field">
      <label htmlFor={`${id}-${name}`}>{label}{optional && <span> ({t(c.form.optional)})</span>}</label>
      <input id={`${id}-${name}`} name={name} className="bva-input" value={values[name]} {...props}
        aria-invalid={errors[name] ? true : undefined} aria-describedby={errors[name] ? `${id}-${name}-err` : undefined}
        onChange={(e) => set(name, e.currentTarget.value)}
        onBlur={(e) => {
          const v = e.currentTarget.value; // read now: React clears currentTarget before the state updater runs
          if (v) setErrors((s) => ({ ...s, [name]: !RULES[name](v) }));
        }} />
      {errors[name] && <p id={`${id}-${name}-err`} className="bva-error">{t(c.form.errors[name])}</p>}
    </div>
  );

  const whenIcons = [Sun, Moon, Calendar];

  return (
    <form ref={formRef} className="bva-form" noValidate onSubmit={next} aria-labelledby={`${id}-h`}>
      <ol className="bva-steps" aria-label={t(c.form.progress)(step + 1, steps.length)}>
        {steps.map((s, i) => (
          <li key={s} data-on={i <= step ? "1" : "0"} aria-current={i === step ? "step" : undefined}>
            <b style={{ fontWeight: "inherit" }}>{i + 1}<span>. {s}</span></b>
          </li>
        ))}
      </ol>
      <h2 id={`${id}-h`} className="bva-h3" style={{ fontSize: 24 }}>{steps[step]}</h2>

      <div className="bva-step bva-form" key={step}>
        {step === 0 && (
          <div className="bva-form-row">
            {input("postcode", t(c.form.postcode), { autoComplete: "postal-code" })}
            {input("number", t(c.form.number))}
          </div>
        )}
        {step === 1 && (
          <>
            <fieldset className="bva-field" aria-describedby={errors.type ? `${id}-type-err` : undefined}>
              <legend className="bva-legend">{t(c.form.type)}</legend>
              <div className="bva-tiles">
                {HOUSE_TYPES.map((key, i) => (
                  <label key={key} className="bva-tile">
                    <input type="radio" name="type" value={key} checked={values.type === key} onChange={() => set("type", key)} />{types[i]}
                  </label>
                ))}
              </div>
              {errors.type && <p id={`${id}-type-err`} className="bva-error">{t(c.form.errors.type)}</p>}
            </fieldset>
            <div style={{ maxWidth: 260 }}>{input("area", t(c.form.area), { inputMode: "decimal" }, true)}</div>
          </>
        )}
        {step === 2 && (
          <>
            <fieldset className="bva-field">
              <legend className="bva-legend">{t(c.form.when)} <span>({t(c.form.optional)})</span></legend>
              <div className="bva-tiles three">
                {t(c.form.whens).map((o, i) => {
                  const Icon = whenIcons[i];
                  return (
                    <label key={o} className="bva-tile">
                      <input type="radio" name="when" value={o} checked={values.when === o} onChange={() => set("when", o)} /><Icon />{o}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            {input("name", t(c.form.name), { autoComplete: "name" })}
            {input("phone", t(c.form.phone), { type: "tel", autoComplete: "tel", inputMode: "tel" })}
            {input("email", t(c.form.email), { type: "email", autoComplete: "email" })}
            <p className="bva-privacy">{t(c.form.privacy)}</p>
          </>
        )}
      </div>

      <div className="bva-form-nav">
        <button type="submit" className="bva-btn">
          {step === steps.length - 1 ? t(c.form.submit) : t(c.form.next)} <ArrowRight />
        </button>
        {step > 0 && <button type="button" className="bva-back" onClick={() => setStep(step - 1)}>{t(c.form.back)}</button>}
        {step === steps.length - 1 && <p className="bva-demo"><span className="bva-tag">{t(c.example)}</span> {t(c.form.demo)}</p>}
      </div>
    </form>
  );
}
