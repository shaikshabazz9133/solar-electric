import { createElement, type ComponentProps } from "react";
import {
  Activity,
  AirVent,
  Award,
  BadgeCheck,
  BatteryCharging,
  BrickWall,
  Building2,
  CalendarCheck,
  CarFront,
  CheckCircle2,
  CircuitBoard,
  ClipboardCheck,
  CookingPot,
  Cpu,
  Factory,
  Fan,
  Flame,
  Fuel,
  Gauge,
  Handshake,
  HardHat,
  Headset,
  Home,
  Layers,
  Leaf,
  Lightbulb,
  LineChart,
  PanelsTopLeft,
  Percent,
  PiggyBank,
  Plug,
  PlugZap,
  Power,
  Receipt,
  Ruler,
  ScanLine,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Sun,
  Tags,
  Thermometer,
  Timer,
  TrendingDown,
  Truck,
  Users,
  Waves,
  Wind,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Content files store icon *names* (plain strings) rather than components so
 * that data can cross the server/client boundary as serialisable props.
 * Only the icons listed here are bundled.
 */
export const iconRegistry = {
  activity: Activity,
  aircon: AirVent,
  award: Award,
  badge: BadgeCheck,
  battery: BatteryCharging,
  brickwall: BrickWall,
  building: Building2,
  calendar: CalendarCheck,
  check: CheckCircle2,
  circuit: CircuitBoard,
  clipboard: ClipboardCheck,
  cooktop: CookingPot,
  cpu: Cpu,
  ev: CarFront,
  factory: Factory,
  fan: Fan,
  flame: Flame,
  fuel: Fuel,
  gauge: Gauge,
  handshake: Handshake,
  hardhat: HardHat,
  headset: Headset,
  home: Home,
  layers: Layers,
  leaf: Leaf,
  lightbulb: Lightbulb,
  linechart: LineChart,
  panels: PanelsTopLeft,
  percent: Percent,
  piggybank: PiggyBank,
  plug: Plug,
  plugzap: PlugZap,
  power: Power,
  receipt: Receipt,
  ruler: Ruler,
  scan: ScanLine,
  shield: ShieldCheck,
  snowflake: Snowflake,
  sparkles: Sparkles,
  sun: Sun,
  tags: Tags,
  thermometer: Thermometer,
  timer: Timer,
  trendingdown: TrendingDown,
  truck: Truck,
  users: Users,
  waves: Waves,
  wind: Wind,
  wrench: Wrench,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;

export function getIcon(name: string): LucideIcon {
  return iconRegistry[name as IconName] ?? Zap;
}

/**
 * Renders a registry icon by name. Resolving through `createElement` keeps the
 * component out of the render scope, so icons can be driven by serialisable
 * data without React re-mounting them on every render.
 */
export function Icon({
  name,
  ...props
}: { name: string } & ComponentProps<LucideIcon>) {
  return createElement(getIcon(name), props);
}
