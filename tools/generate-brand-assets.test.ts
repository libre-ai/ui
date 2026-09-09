import { describe, expect, test } from "bun:test";

import { BRAND_MARK_PARTS, BRAND_MARK_VIEW_BOX } from "../src/brand-geometry";
import { renderBrandMarkSvg, validateBrandAssetPublication } from "./generate-brand-assets";

describe("constructed swift asset", () => {
  test("uses a compact integer-only geometry from one source", () => {
    expect(BRAND_MARK_VIEW_BOX).toBe("0 0 24 24");
    expect(BRAND_MARK_PARTS).toHaveLength(3);
    expect(BRAND_MARK_PARTS.every((path) => !path.includes("."))).toBe(true);
  });

  test("renders an inert standalone SVG", () => {
    const svg = renderBrandMarkSvg();
    const forbidden = [
      /<script/i,
      /foreignObject/i,
      /href\s*=/i,
      /url\s*\(/i,
      /gradient/i,
      /filter/i,
      /style\s*=/i,
      /(?:href|src)\s*=\s*["']https?:\/\//i,
      /data:image/i,
      /<metadata/i,
      /\son[a-z]+\s*=/i,
    ];

    expect(svg.match(/<path\b/g) ?? []).toHaveLength(3);
    expect(svg).toContain('viewBox="0 0 24 24"');
    expect(svg.match(/https?:\/\//g) ?? []).toEqual(["http://"]);
    expect(forbidden.filter((pattern) => pattern.test(svg))).toEqual([]);
    expect(renderBrandMarkSvg()).toBe(svg);
  });

  test("blocks publication until both owner controls are accepted", () => {
    expect(
      validateBrandAssetPublication({
        approval: "License approval: pending",
        similarityReview: "Status: pending",
      }),
    ).toEqual(["brand.asset_license_not_accepted", "brand.asset_similarity_review_not_accepted"]);

    expect(
      validateBrandAssetPublication({
        approval: "License approval: owner-accepted",
        similarityReview: "Status: accepted\nDisposition: owner-accepted",
      }),
    ).toEqual([]);
  });
});
