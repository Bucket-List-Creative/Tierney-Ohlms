import {
  BookText,
  ArrowLeftRight,
  ChartColumnIncreasing,
  ChartPie,
  Gauge,
  Landmark,
  Wallet,
  BadgeCheck,
  TrendingUp,
  Cpu,
  Headset,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Check,
  Inbox,
  Sparkles,
  CalendarCheck,
  Users,
  Star,
  type LucideIcon,
} from "lucide-react";

/**
 * Typed icon registry backed by Lucide (clean, consistent line icons).
 * Sanity `icon` fields are enum strings resolved against these keys, so the
 * stroke weight and sizing stay consistent across the whole system.
 */
const ICONS = {
  // Services (ladder)
  cleanup: Sparkles,
  close: CalendarCheck,
  controller: Gauge,
  tax: Landmark,
  payroll: Users,
  automation: Cpu,
  // Legacy service icons (kept for compatibility)
  bookkeeping: BookText,
  "ap-ar": ArrowLeftRight,
  reporting: ChartColumnIncreasing,
  budget: ChartPie,
  compliance: Landmark,
  // Why-choose / highlights
  cost: Wallet,
  team: BadgeCheck,
  scalable: TrendingUp,
  technology: Cpu,
  support: Headset,
  peace: ShieldCheck,
  // Contact + utility
  phone: Phone,
  mail: Mail,
  location: MapPin,
  clock: Clock,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  check: Check,
  star: Star,
  inbox: Inbox,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof ICONS;

export const ICON_KEYS = Object.keys(ICONS) as IconKey[];

export function getIcon(name: IconKey): LucideIcon {
  return ICONS[name] ?? BookText;
}
