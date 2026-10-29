"use client";
// The home card next to the valuation form: a spec sheet in the style of a listing brochure that fills
// itself as the visitor answers. The address comes from the PDOK lookup, area and build year from the BAG,
// the rest from the form. When the request is sent the card turns over to show where it went.
import { Check } from "@/components/icons";
import { useT } from "@/lib/lang";
import { inUtrecht } from "./address";
import { c } from "./copy";
import type { Report } from "./RvlForm";
import { Area, Calendar, Chat, Pin, RvlLogo, Rooms, Year } from "./icons";
import { HOUSE_TYPES, type RvlOffice } from "./types";

export default function HomeCard({ report, office }: { report: Report; office: RvlOffice }) {
  const t = useT();
  const { values: v, address: a, lookup, sent, photos } = report;
  const street = a ? `${a.street} ${a.number}` : v.street ? `${v.street} ${v.number}` : "";
  const town = a ? `${a.postcode} ${a.town}` : v.town ? `${v.postcode.toUpperCase()} ${v.town}` : "";
  const known = street !== "";
  const outside = known && !inUtrecht(a?.postcode ?? v.postcode);
  const type = v.type ? t(c.form.types)[HOUSE_TYPES.indexOf(v.type)] : "";
  const area = v.area || (a?.area ? String(a.area) : "");
  const fromBag = a?.area !== undefined && area === String(a.area);

  const rows: [string, string, (p: { className?: string }) => React.JSX.Element, string?][] = [
    [t(c.card.area), area ? `${area} m²` : "", Area, fromBag ? t(c.card.bag) : undefined],
    [t(c.card.year), a?.year ? String(a.year) : "", Year, a?.year ? t(c.card.bag) : undefined],
    [t(c.card.type), type, Pin],
    [t(c.card.rooms), v.rooms, Rooms],
    [t(c.card.when), v.when, Calendar],
    [t(c.card.reply), v.reply, Chat],
  ];

  return (
    <div className="rvl-card3d" data-sent={sent ? "1" : "0"} aria-live="polite">
      <div className="rvl-sheet">
        {/* Front: the spec sheet */}
        <section className="rvl-sheet-face" aria-label={t(c.card.label)} aria-hidden={sent}>
          <header className="rvl-sheet-head">
            <RvlLogo mark />
            <span>{t(c.card.label)}</span>
          </header>
          <div className="rvl-sheet-addr" data-k={known ? street : "empty"}>
            {known ? (
              <>
                <h3>{street}</h3>
                <p>{town}{a?.buurt ? ` · ${a.buurt}` : ""}</p>
              </>
            ) : (
              <p className="rvl-sheet-empty">{lookup === "looking" ? t(c.card.looking) : t(c.card.empty)}</p>
            )}
          </div>
          <dl className="rvl-sheet-specs">
            {rows.map(([label, value, Icon, note]) => (
              <div key={label} data-on={value ? "1" : "0"}>
                <dt><Icon />{label}</dt>
                <dd key={value}>{value || "—"}{note && <small>{note}</small>}</dd>
              </div>
            ))}
          </dl>
          {photos.length > 0 && (
            <ul className="rvl-sheet-photos" aria-label={t(c.card.photos)(photos.length)}>
              {/* eslint-disable-next-line @next/next/no-img-element -- local object URLs, never uploaded */}
              {photos.map((u) => <li key={u}><img src={u} alt="" /></li>)}
            </ul>
          )}
          <footer className="rvl-sheet-foot">
            {known && a?.residential === false ? <span>{t(c.card.notHome)}</span>
              : outside ? <span>{t(c.card.outside)}</span>
              : (
                <>
                  <span className="rvl-sheet-k">{t(c.card.to)}</span>
                  <b>{t(c.footer.office)(office.name)}</b>
                  <span>{office.street}</span>
                </>
              )}
          </footer>
        </section>
        {/* Back: what happened to the request */}
        <section className="rvl-sheet-face rvl-sheet-back" aria-hidden={!sent}>
          <span className="rvl-done-mark"><Check /></span>
          <p className="rvl-sheet-k">{t(c.card.sent)}</p>
          <h3>{t(c.footer.office)(office.name)}</h3>
          <p>{office.street}, {office.postcode} {office.town}</p>
          <div className="rvl-sheet-rule" />
          <p><b>{street}</b><br />{town}</p>
          <p className="rvl-sheet-meta">{[type, area && `${area} m²`, v.when, photos.length ? t(c.card.photos)(photos.length) : ""].filter(Boolean).join(" · ")}</p>
        </section>
      </div>
    </div>
  );
}
