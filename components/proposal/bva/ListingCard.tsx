"use client";
// One listing from bvamakelaardij.nl (photo, address, price, size, rooms) with the Eerlijk Bieden action
// inside the card instead of a floating button. Used on the homepage and the Aanbod page.
import Image from "next/image";
import { ArrowRight } from "@/components/icons";
import { useT } from "@/lib/lang";
import { c, euro, m2 } from "./copy";
import { Area, Gavel, Rooms } from "./icons";
import type { BvaListing } from "./types";

export default function ListingCard({ l, onOpen, priority }: { l: BvaListing; onOpen?: () => void; priority?: boolean }) {
  const t = useT();
  const open = l.status === "beschikbaar" || l.status === "nieuw";
  return (
    <article className="bva-card">
      <div className="bva-card-img">
        <Image src={l.image} alt={`${l.street}, ${l.town}`} fill priority={priority} sizes="(min-width: 1100px) 380px, (min-width: 700px) 45vw, 82vw" />
      </div>
      <div className="bva-card-body">
        <span className={`bva-status ${open ? "" : "off"}`}>{t(c.listings.status[l.status])}</span>
        <div className="bva-card-top">
          <h3 className="bva-h3">{l.street}</h3>
          {open && <span className="bva-num bva-price">{euro(l.price)}<small>{t(c.listings.kk)}</small></span>}
        </div>
        <span className="bva-muted" style={{ fontSize: 14.5 }}>{l.postcode} {l.town}</span>
        <div className="bva-specs">
          <span><Area />{m2(l.area)} m² {t(c.listings.living)}</span>
          <span><Rooms />{t(c.listings.rooms)(l.rooms)}</span>
        </div>
      </div>
      <div className="bva-card-actions">
        {onOpen
          ? <button type="button" className="bva-link" onClick={onOpen}>{t(c.listings.view)} <ArrowRight /></button>
          : <span className="bva-link" aria-disabled>{t(c.listings.view)} <ArrowRight /></span>}
        {open && (
          <button type="button" className="bva-bid" aria-disabled title={t(c.listings.bidVia)}>
            <Gavel />{t(c.listings.bid)}
          </button>
        )}
      </div>
    </article>
  );
}
