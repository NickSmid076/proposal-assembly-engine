"use client";
// One listing from domstadmakelaars.nl (photo, address, price, size, rooms, type). A home that is sold
// subject to contract gets the diagonal red strip of Domstad's own TE KOOP sign, saying VERKOCHT.
import Image from "next/image";
import { ArrowRight } from "@/components/icons";
import { useT } from "@/lib/lang";
import { c, euro } from "./copy";
import { Area, Rooms } from "./icons";
import type { DomListing } from "./types";

export default function ListingCard({ l, onOpen, priority }: { l: DomListing; onOpen?: () => void; priority?: boolean }) {
  const t = useT();
  const sold = l.status === "verkocht-ov";
  return (
    <article className="dom-card">
      <div className="dom-card-img">
        <Image src={l.image} alt={`${l.street}, ${l.town}`} fill priority={priority} sizes="(min-width: 1100px) 380px, (min-width: 700px) 45vw, 82vw" />
        {sold && <span className="dom-strip" aria-hidden>{t(c.listings.status["verkocht-ov"])}</span>}
      </div>
      <div className="dom-card-body">
        <span className={`dom-status ${sold ? "off" : ""}`}>{t(c.listings.status[l.status])}</span>
        <h3 className="dom-h3">{l.street}</h3>
        <span className="dom-muted dom-card-place">{l.postcode} {l.town} · {l.kind}</span>
        <span className="dom-price">{euro(l.price)}<small>{t(c.listings.kk)}</small></span>
        <div className="dom-specs">
          <span><Area />{l.area} m² {t(c.listings.living)}</span>
          <span><Rooms />{t(c.listings.rooms)(l.rooms)}</span>
        </div>
      </div>
      <div className="dom-card-actions">
        {onOpen
          ? <button type="button" className="dom-link" onClick={onOpen}>{t(c.listings.view)} <ArrowRight /></button>
          : <span className="dom-link" aria-disabled>{t(c.listings.view)} <ArrowRight /></span>}
      </div>
    </article>
  );
}
