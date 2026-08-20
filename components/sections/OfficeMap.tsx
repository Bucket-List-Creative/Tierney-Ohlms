import { Button } from "@/components/primitives/Button";
import { LineIcon } from "@/components/icons/LineIcon";
import { MapCard } from "@/components/primitives/MapCard";
import type { SiteSettings } from "@/lib/types";

export function OfficeMap({site}:{site:SiteSettings}){const href=`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${site.addressLine1} ${site.addressLine2}`)}`;return <section className="border-t border-rule bg-white"><div className="container-x flex flex-wrap items-end justify-between gap-8 pb-10 pt-16"><div><span className="eyebrow">Our office</span><h2 className="mb-0 mt-3 font-display text-[clamp(25px,2.4vw,34px)] font-medium leading-tight">{site.addressLine1}<br/>{site.addressLine2}</h2></div><Button href={href} target="_blank" rel="noopener noreferrer" size="sm">Get directions<LineIcon name="arrow-up-right" size={15}/></Button></div><MapCard addressLine1={site.addressLine1} addressLine2={site.addressLine2} className="h-[52vh] min-h-[360px] w-full !rounded-none !border-x-0 !border-b-0 grayscale"/></section>}
