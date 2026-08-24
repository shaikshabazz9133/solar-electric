import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — licensed electricians and solar installers`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #32589f 0%, #1d396d 45%, #0d1b36 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "rgba(255,255,255,0.10)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -100,
            width: 460,
            height: 460,
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 22,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              color: "#32589f",
              fontWeight: 800,
            }}
          >
            ⚡
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#ffffff", fontSize: 34, fontWeight: 800 }}>
              Eagle
            </span>
            <span
              style={{
                color: "#c8d6ef",
                fontSize: 17,
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              Electric &amp; Solar
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span
            style={{
              color: "#ffffff",
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Canberra’s Local Solar & Electrical Experts
          </span>
          <span style={{ color: "#c8d6ef", fontSize: 28, maxWidth: 820 }}>
            Licensed master electricians &amp; NABCEP-certified solar installers
            — Austin, Texas
          </span>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[
            "25-year workmanship warranty",
            "Fixed-price quotes",
            "24/7 emergency service",
          ].map((label) => (
            <span
              key={label}
              style={{
                display: "flex",
                padding: "14px 26px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#ffffff",
                fontSize: 22,
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
