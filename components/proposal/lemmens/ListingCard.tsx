"use client";
// One listing from lemmens.nl (photo, address, price, sizes). Used on the homepage and the Aanbod page.
import Image from "next/image";
import { useT } from "@/lib/lang";
import { c, euro } from "./copy";
import { Area, Plot } from "./icons";
import type { LemmensListing } from "./types";

export default function ListingCard({ l, onOpen, priority }: { l: LemmensListing; onOpen?: () => void; priority?: boolean }) {
  const t = useT();
  const body = (
    <>
      <div className="lm-card-img">
        <Image src={l.image} alt={`${l.street}, ${l.town}`} fill priority={priority} sizes="(min-width: 1100px) 380px, (min-width: 700px) 45vw, 90vw" />
        <div className="lm-badges">
          {l.isNew && <span className="lm-badge new">{t(c.listings.isNew)}</span>}
          <span className="lm-badge">{t(l.deal === "koop" ? c.listings.koop : c.listings.huur)}</span>
        </div>
      </div>
      <div className="lm-card-body">
        <div className="lm-card-top">
          <h3 className="lm-h3">{l.street}</h3>
          <span className="lm-num lm-price">
            {euro(l.price)}<small>{l.deal === "koop" ? t(c.listings.kk) : t(c.listings.pm)}</small>
          </span>
        </div>
        <span className="lm-muted" style={{ fontSize: 14.5 }}>{l.postcode} {l.town}</span>
        <div className="lm-specs">
          <span><Area />{l.area} m² {t(l.kind === "wonen" ? c.listings.area : c.listings.floor)}</span>
          {l.plot && <span><Plot />{l.plot} m² {t(c.listings.plot)}</span>}
        </div>
      </div>
    </>
  );
  return onOpen
    ? <button type="button" className="lm-card" onClick={onOpen}>{body}</button>
    : <article className="lm-card">{body}</article>;
}
