"use client";
// One listing from rvlmakelaars.nl: photo, address, town and price. Living area and rooms are not shown:
// the site loads them by script from its feed, so they were not verified for this concept.
import Image from "next/image";
import { ArrowRight } from "@/components/icons";
import { useT } from "@/lib/lang";
import { c, euro } from "./copy";
import type { RvlListing } from "./types";

export default function ListingCard({ l, onOpen, priority }: { l: RvlListing; onOpen?: () => void; priority?: boolean }) {
  const t = useT();
  return (
    <article className="rvl-card">
      <div className="rvl-card-img">
        <Image src={l.image} alt={`${l.street}, ${l.town}`} fill priority={priority} sizes="(min-width: 1100px) 300px, (min-width: 700px) 45vw, 82vw" />
      </div>
      <div className="rvl-card-body">
        <h3 className="rvl-card-street">{l.street}</h3>
        <span className="rvl-card-town">{l.town}</span>
        <span className="rvl-price">{euro(l.price)}<small>{t(c.listings.kk)}</small></span>
      </div>
      {onOpen
        ? <button type="button" className="rvl-link" onClick={onOpen}>{t(c.listings.view)} <ArrowRight /></button>
        : <span className="rvl-link" aria-disabled>{t(c.listings.view)} <ArrowRight /></span>}
    </article>
  );
}
