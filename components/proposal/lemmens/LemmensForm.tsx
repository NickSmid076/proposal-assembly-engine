"use client";
// Demo valuation form in three short steps. Validates in the browser and shows the thank-you state.
// It makes NO network request and stores nothing: it only shows how the real form would behave.
import { useId, useRef, useState, type FormEvent, type InputHTMLAttributes } from "react";
import { ArrowRight, Check } from "@/components/icons";
import { useT } from "@/lib/lang";
import { c } from "./copy";
import type { Prefill } from "./types";

type Field = "postcode" | "number" | "name" | "phone" | "email";
type Values = Record<Field | "type" | "when", string>;

const RULES: Record<Field, (v: string) => boolean> = {
  postcode: (v) => /^\s*\d{4}\s?[a-zA-Z]{2}\s*$/.test(v),
  number: (v) => /\d/.test(v),
  name: (v) => v.trim().length >= 2,
  phone: (v) => v.replace(/\D/g, "").length >= 10,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
};
const STEP_FIELDS: Field[][] = [["postcode", "number"], [], ["name", "phone", "email"]];

export default function LemmensForm({ owner, prefill }: { owner: string; prefill?: Prefill }) {
  const t = useT();
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({
    postcode: prefill?.postcode ?? "", number: prefill?.number ?? "", type: "", when: "", name: "", phone: "", email: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});
  const [sent, setSent] = useState(false);
  const steps = t(c.form.steps);

  const set = (k: keyof Values, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (k in RULES && errors[k as Field]) setErrors((e) => ({ ...e, [k]: !RULES[k as Field](v) }));
  };

  function next(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const bad = STEP_FIELDS[step].filter((f) => !RULES[f](values[f]));
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
      <div className="lm-done" role="status">
        <span className="lm-done-mark"><Check /></span>
        <h2 className="lm-h2" style={{ fontSize: 32 }}>{t(c.form.doneTitle)(values.name.trim().split(/\s+/)[0])}</h2>
        <p className="lm-lead">{t(c.form.doneBody)(owner)}</p>
        <div style={{ width: "100%" }}>
          <p style={{ fontWeight: 600, marginBottom: 6 }}>{t(c.form.nextTitle)}</p>
          <ol className="lm-timeline">{t(c.form.nextSteps).map((s) => <li key={s}>{s}</li>)}</ol>
        </div>
        <p className="lm-demo"><span className="lm-tag">{t(c.example)}</span> {t(c.form.sentDemo)}</p>
        <button type="button" className="lm-back" onClick={() => { setSent(false); setStep(0); setErrors({}); }}>{t(c.form.again)}</button>
      </div>
    );
  }

  const input = (name: Field, label: string, props: InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="lm-field">
      <label htmlFor={`${id}-${name}`}>{label}</label>
      <input id={`${id}-${name}`} name={name} className="lm-input" value={values[name]} {...props}
        aria-invalid={errors[name] ? true : undefined} aria-describedby={errors[name] ? `${id}-${name}-err` : undefined}
        onChange={(e) => set(name, e.currentTarget.value)}
        onBlur={(e) => e.currentTarget.value && setErrors((s) => ({ ...s, [name]: !RULES[name](e.currentTarget.value) }))} />
      {errors[name] && <p id={`${id}-${name}-err`} className="lm-error">{t(c.form.errors[name])}</p>}
    </div>
  );

  const tiles = (name: "type" | "when", legend: string, options: string[], three = false) => (
    <fieldset className="lm-field">
      <legend className="lm-legend">{legend} <span>({t(c.form.optional)})</span></legend>
      <div className={`lm-tiles ${three ? "three" : ""}`}>
        {options.map((o) => (
          <label key={o} className="lm-tile">
            <input type="radio" name={name} value={o} checked={values[name] === o} onChange={() => set(name, o)} />{o}
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <form ref={formRef} className="lm-form" noValidate onSubmit={next} aria-labelledby={`${id}-h`}>
      <div className="lm-progress">
        <div className="lm-progress-top">
          <b id={`${id}-h`}>{steps[step]}</b><span>{t(c.form.progress)(step + 1, steps.length)}</span>
        </div>
        <div className="lm-progress-bar" aria-hidden><i style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
      </div>

      <div className="lm-step lm-form" key={step}>
        {step === 0 && (
          <>
            <div className="lm-form-row">
              {input("postcode", t(c.form.postcode), { autoComplete: "postal-code" })}
              {input("number", t(c.form.number), { inputMode: "text" })}
            </div>
            {tiles("type", t(c.form.type), t(c.form.types), true)}
          </>
        )}
        {step === 1 && tiles("when", t(c.form.when), t(c.form.whens))}
        {step === 2 && (
          <>
            {input("name", t(c.form.name), { autoComplete: "name" })}
            {input("phone", t(c.form.phone), { type: "tel", autoComplete: "tel", inputMode: "tel" })}
            {input("email", t(c.form.email), { type: "email", autoComplete: "email" })}
            <p className="lm-privacy">{t(c.form.privacy)}</p>
          </>
        )}
      </div>

      <div className="lm-form-nav">
        <button type="submit" className="lm-btn">
          {step === steps.length - 1 ? t(c.form.submit) : t(c.form.next)} <ArrowRight />
        </button>
        {step > 0 && <button type="button" className="lm-back" onClick={() => setStep(step - 1)}>{t(c.form.back)}</button>}
        {step === steps.length - 1 && <p className="lm-demo"><span className="lm-tag">{t(c.example)}</span> {t(c.form.demo)}</p>}
      </div>
    </form>
  );
}
