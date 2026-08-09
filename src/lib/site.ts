/**
 * Single source of truth for brand, contact and navigation data.
 * Swap these values to re-skin the site for a different business.
 */

import { productCategories } from "@/lib/data/products";
import { services } from "@/lib/data/services";

export const siteConfig = {
  name: "NorthStar Electric & Solar",
  shortName: "NorthStar",
  legalName: "NorthStar Electric & Solar, LLC",
  tagline: "Licensed electricians. Certified solar installers.",
  description:
    "NorthStar Electric & Solar designs, installs and services electrical systems, solar arrays, battery storage and EV charging for homes and businesses. Licensed, bonded, insured — and backed by a 25-year workmanship warranty.",
  url: "https://www.northstarelectric.com",
  locale: "en-US",
  phone: "(888) 555-0142",
  phoneHref: "tel:+18885550142",
  emergencyPhone: "(888) 555-0199",
  emergencyPhoneHref: "tel:+18885550199",
  email: "hello@northstarelectric.com",
  emailHref: "mailto:hello@northstarelectric.com",
  address: {
    street: "1420 Liberty Avenue, Suite 300",
    city: "Austin",
    state: "TX",
    zip: "78701",
    country: "US",
  },
  geo: { latitude: 30.2672, longitude: -97.7431 },
  hours: [
    { days: "Monday – Friday", time: "7:00 AM – 7:00 PM" },
    { days: "Saturday", time: "8:00 AM – 4:00 PM" },
    { days: "Sunday", time: "Emergency service only" },
  ],
  openingHoursSpec: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "19:00" },
    { days: ["Saturday"], opens: "08:00", closes: "16:00" },
  ],
  licenses: [
    "TX Master Electrician #MEL-38241",
    "TECL #31102",
    "NABCEP PV Installation Professional",
  ],
  socials: [
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  ],
  serviceAreas: [
    "Austin",
    "Round Rock",
    "Cedar Park",
    "Georgetown",
    "San Marcos",
    "Pflugerville",
    "Leander",
    "Kyle",
    "Buda",
    "Lakeway",
  ],
} as const;

export const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`;

export type NavChild = {
  label: string;
  href: string;
  description: string;
  icon: string;
};

export type NavItem = {
  label: string;
  href: string;
  /** Mega-menu entries, rendered on desktop and as an accordion on mobile. */
  children?: NavChild[];
  /** Line shown along the foot of the mega-menu, beside the "view all" link. */
  menuNote?: string;
};

/**
 * The two mega-menus are projected from the catalogue data rather than typed
 * out again here, so a new service or product category shows up in the header
 * the moment it is added — labels, artwork and links can never drift apart.
 */
export const mainNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    menuNote: "Not sure what you need? We'll tell you honestly.",
    children: services.map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
      description: service.short,
      icon: service.icon,
    })),
  },
  {
    label: "Products",
    href: "/products",
    menuNote: "Everything we sell, we also install and warrant ourselves.",
    children: productCategories.map((category) => ({
      label: category.label,
      href: `/products?category=${category.slug}`,
      description: category.blurb,
      icon: category.icon,
    })),
  },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = [
  {
    title: "Services",
    links: services.map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
    })),
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our projects", href: "/projects" },
      { label: "Equipment we install", href: "/products" },
      { label: "Frequently asked questions", href: "/faq" },
      { label: "Request a quote", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "24/7 emergency line", href: siteConfig.emergencyPhoneHref },
      { label: "Warranty & service claims", href: "/contact?topic=warranty" },
      { label: "Financing options", href: "/faq#financing" },
      { label: "Service areas", href: "/about#service-areas" },
    ],
  },
];
