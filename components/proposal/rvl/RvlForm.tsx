"use client";
// Demo valuation form in four short steps. Postcode + house number look up the real address (PDOK, see
// address.ts); everything the visitor gives is reported through `onReport`, which drives the home card.
// It sends NOTHING and stores nothing: photos stay in the browser as object URLs and are released on unmount.
import { useEffect, useId, useRef, useState, type FormEvent, type InputHTMLAttributes, type JSX } from "react";
import { ArrowRight, Check, Mail } from "@/components/icons";
import { useT } from "@/lib/lang";
import { lookup, validPostcode, type Address } from "./address";
import { c } from "./copy";
import { Calendar, Camera, Chat, Moon, Phone, Sun } from "./icons";
import { HOUSE_TYPES, type HouseType, type Prefill } from "./types";

type Field = "postcode" | "number" | "street" | "town" | "area" | "rooms" | "name" | "phone" | "email";
export type Values = Record<Field | "when" | "reply", string> & { type: HouseType | "" };
export type Lookup = "idle" | "looking" | "found" | "notfound" | "offline";

const RULES: Record<Field, (v: string) => boolean> = {
  postcode: (v) => validPostcode(v),
  number: (v) => /^\s*\d+/.test(v),
  street: (v) => v.trim().length >= 2,
  town: (v) => v.trim().length >= 2,
  area: (v) => v.trim() === "" || /^\d{2,4}([.,]\d)?$/.test(v.trim()),
  rooms: (v) => v.trim() === "" || /^\d{1,2}$/.test(v.trim()),
  name: (v) => v.trim().length >= 2,
  phone: (v) => v.replace(/\D/g, "").length >= 10,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
};

/** Everything the home card shows. */
export type Report = { step: number; sent: boolean; values: Values; lookup: Lookup; address: Address | null; photos: string[] };

export default function RvlForm({ prefill, office, onReport }: { prefill?: Prefill; /** Office the request goes to. */ office: string; onReport: (r: Report) => void }) {
  const t = useT();
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({
    postcode: prefill?.postcode ?? "", number: prefill?.number ?? "", street: "", town: "",
    type: "", area: "", rooms: "", when: "", reply: "", name: "", phone: "", email: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field | "type", boolean>>>({});
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<Lookup>("idle");
  const [address, setAddress] = useState<Address | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const steps = t(c.form.steps);
  const manual = status === "offline" || status === "notfound";

  useEffect(() => { onReport({ step, sent, values, lookup: status, address, photos }); }, [step, sent, values, status, address, photos, onReport]);

  // Look the address up shortly after postcode and number are complete; a newer lookup cancels the older one.
  useEffect(() => {
    if (!RULES.postcode(values.postcode) || !RULES.number(values.number)) { setStatus("idle"); setAddress(null); return; }
    const ctl = new AbortController();
    const timer = setTimeout(async () => {
      setStatus("looking");
      try {
        const a = await lookup(values.postcode, values.number, ctl.signal);
        if (ctl.signal.aborted) return;
        setAddress(a);
        setStatus(a ? "found" : "notfound");
        if (a) {
          setValues((v) => ({ ...v, street: a.street, town: a.town, area: v.area || (a.area && a.residential !== false ? String(a.area) : "") }));
          setErrors((e) => ({ ...e, number: false, street: false, town: false }));
        }
      } catch {
        if (!ctl.signal.aborted) { setAddress(null); setStatus("offline"); }
      }
    }, 350);
    return () => { clearTimeout(timer); ctl.abort(); };
  }, [values.postcode, values.number]);

  // Release the photo previews when the form goes away.
  const photosRef = useRef(photos);
  photosRef.current = photos;
  useEffect(() => () => photosRef.current.forEach((u) => URL.revokeObjectURL(u)), []);

  const set = (k: keyof Values, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (k === "type") setErrors((e) => ({ ...e, type: false }));
    else if (k in RULES && errors[k as Field]) setErrors((e) => ({ ...e, [k]: !RULES[k as Field](v) }));
  };

  function addPhotos(files: FileList | null) {
    if (!files) return;
    const urls = [...files].filter((f) => f.type.startsWith("image/")).slice(0, 6 - photos.length).map((f) => URL.createObjectURL(f));
    setPhotos((p) => [...p, ...urls]);
  }

  function next(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fields: Field[][] = [["postcode", "number", ...(manual ? (["street", "town"] as Field[]) : [])], ["area", "rooms"], [], ["name", "phone", "email"]];
    const bad: (Field | "type")[] = fields[step].filter((f) => !RULES[f](values[f]));
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
      <div className="rvl-done" role="status">
        <span className="rvl-done-mark"><Check /></span>
        <h2 className="rvl-h2" style={{ fontSize: 34 }}>{t(c.form.doneTitle)(values.name.trim().split(/\s+/)[0])}</h2>
        <p className="rvl-lead">{t(c.form.doneBody)(office)}</p>
        <div style={{ width: "100%" }}>
          <p style={{ fontWeight: 600, marginBottom: 6 }}>{t(c.form.nextTitle)}</p>
          <ol className="rvl-timeline">{t(c.form.nextSteps).map((s) => <li key={s}>{s}</li>)}</ol>
        </div>
        <p className="rvl-demo"><span className="rvl-tag">{t(c.example)}</span> {t(c.form.sentDemo)}</p>
        <button type="button" className="rvl-back" onClick={() => { setSent(false); setStep(0); setErrors({}); }}>{t(c.form.again)}</button>
      </div>
    );
  }

  const input = (name: Field, label: string, props: InputHTMLAttributes<HTMLInputElement> = {}, optional = false) => (
    <div className="rvl-field">
      <label htmlFor={`${id}-${name}`}>{label}{optional && <span> ({t(c.form.optional)})</span>}</label>
      <input id={`${id}-${name}`} name={name} className="rvl-input" value={values[name]} {...props}
        aria-invalid={errors[name] ? true : undefined} aria-describedby={errors[name] ? `${id}-${name}-err` : undefined}
        onChange={(e) => set(name, e.currentTarget.value)}
        onBlur={(e) => {
          const v = e.currentTarget.value; // read now: React clears currentTarget before the state updater runs
          if (v) setErrors((s) => ({ ...s, [name]: !RULES[name](v) }));
        }} />
      {errors[name] && <p id={`${id}-${name}-err`} className="rvl-error">{t(c.form.errors[name])}</p>}
    </div>
  );

  const choice = (name: "when" | "reply", legend: string, options: string[], icons: ((p: { className?: string }) => JSX.Element)[]) => (
    <fieldset className="rvl-field">
      <legend className="rvl-legend">{legend} <span>({t(c.form.optional)})</span></legend>
      <div className="rvl-tiles three">
        {options.map((o, i) => {
          const Icon = icons[i];
          return (
            <label key={o} className="rvl-tile">
              <input type="radio" name={name} value={o} checked={values[name] === o} onChange={() => set(name, o)} /><Icon />{o}
            </label>
          );
        })}
      </div>
    </fieldset>
  );

  return (
    <form ref={formRef} className="rvl-form" noValidate onSubmit={next} aria-labelledby={`${id}-h`}>
      <ol className="rvl-steps" aria-label={t(c.form.progress)(step + 1, steps.length)}>
        {steps.map((s, i) => (
          <li key={s} data-on={i <= step ? "1" : "0"} aria-current={i === step ? "step" : undefined}>
            <b style={{ fontWeight: "inherit" }}>{i + 1}<span>. {s}</span></b>
          </li>
        ))}
      </ol>
      <h2 id={`${id}-h`} className="rvl-h3">{steps[step]}</h2>

      <div className="rvl-step rvl-form" key={step}>
        {step === 0 && (
          <>
            <div className="rvl-form-row">
              {input("postcode", t(c.form.postcode), { autoComplete: "postal-code", placeholder: "3583 EN" })}
              {input("number", t(c.form.number), { placeholder: "44" })}
            </div>
            <p className="rvl-lookup" aria-live="polite" data-s={status}>
              {status === "looking" && t(c.card.looking)}
              {status === "notfound" && t(c.card.notFound)}
              {status === "offline" && t(c.card.offline)}
            </p>
            {manual && (
              <div className="rvl-form-row">
                {input("street", t(c.form.street), { autoComplete: "address-line1" })}
                {input("town", t(c.form.town), { autoComplete: "address-level2" })}
              </div>
            )}
          </>
        )}
        {step === 1 && (
          <>
            <fieldset className="rvl-field" aria-describedby={errors.type ? `${id}-type-err` : undefined}>
              <legend className="rvl-legend">{t(c.form.type)}</legend>
              <div className="rvl-tiles">
                {HOUSE_TYPES.map((key, i) => (
                  <label key={key} className="rvl-tile">
                    <input type="radio" name="type" value={key} checked={values.type === key} onChange={() => set("type", key)} />{t(c.form.types)[i]}
                  </label>
                ))}
              </div>
              {errors.type && <p id={`${id}-type-err`} className="rvl-error">{t(c.form.errors.type)}</p>}
            </fieldset>
            <div className="rvl-form-row">
              {input("area", t(c.form.area), { inputMode: "decimal" }, true)}
              {input("rooms", t(c.form.rooms), { inputMode: "numeric" }, true)}
            </div>
            <div className="rvl-field">
              <span className="rvl-legend">{t(c.form.photos)} <span>({t(c.form.optional)})</span></span>
              <label className="rvl-upload">
                <input type="file" accept="image/*" multiple onChange={(e) => { addPhotos(e.currentTarget.files); e.currentTarget.value = ""; }} disabled={photos.length >= 6} />
                <Camera />{t(c.form.photosAdd)}{photos.length > 0 && <b>{t(c.card.photos)(photos.length)}</b>}
              </label>
              <p className="rvl-privacy">{t(c.form.photosHint)}</p>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            {choice("when", t(c.form.when), t(c.form.whens), [Sun, Moon, Calendar])}
            {choice("reply", t(c.form.reply), t(c.form.replies), [Phone, Chat, Mail])}
          </>
        )}
        {step === 3 && (
          <>
            {input("name", t(c.form.name), { autoComplete: "name" })}
            {input("phone", t(c.form.phone), { type: "tel", autoComplete: "tel", inputMode: "tel" })}
            {input("email", t(c.form.email), { type: "email", autoComplete: "email" })}
            <p className="rvl-privacy">{t(c.form.privacy)}</p>
          </>
        )}
      </div>

      <div className="rvl-form-nav">
        <button type="submit" className="rvl-btn">
          {step === steps.length - 1 ? t(c.form.submit) : t(c.form.next)} <ArrowRight />
        </button>
        {step > 0 && <button type="button" className="rvl-back" onClick={() => setStep(step - 1)}>{t(c.form.back)}</button>}
        {step === steps.length - 1 && <p className="rvl-demo"><span className="rvl-tag">{t(c.example)}</span> {t(c.form.demo)}</p>}
      </div>
    </form>
  );
}
