import { join } from "node:path";

import { BRAND_MARK_PARTS, BRAND_MARK_VIEW_BOX } from "../src/brand-geometry";

export function renderBrandMarkSvg(): string {
  const paths = BRAND_MARK_PARTS.map((path) => `  <path d="${path}"/>`).join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${BRAND_MARK_VIEW_BOX}" fill="currentColor" aria-hidden="true">\n${paths}\n</svg>\n`;
}

export interface BrandAssetReviewDocuments {
  readonly approval: string;
  readonly similarityReview: string;
}

export function validateBrandAssetPublication(
  documents: BrandAssetReviewDocuments,
): readonly string[] {
  const failures: string[] = [];
  if (!/^License approval: owner-accepted$/m.test(documents.approval)) {
    failures.push("brand.asset_license_not_accepted");
  }
  if (
    !/^Status: accepted$/m.test(documents.similarityReview) ||
    !/^Disposition: owner-accepted$/m.test(documents.similarityReview)
  ) {
    failures.push("brand.asset_similarity_review_not_accepted");
  }
  return failures;
}

async function main(): Promise<void> {
  const destination = join(import.meta.dir, "../src/assets/libre-ai-mark.svg");
  const expected = renderBrandMarkSvg();

  if (process.argv.includes("--publication-check")) {
    const approval = await Bun.file(
      join(import.meta.dir, "../evidence/BRAND-ASSET-PUBLICATION-APPROVAL.md"),
    ).text();
    const similarityReview = await Bun.file(
      join(import.meta.dir, "../evidence/BRAND-MARK-SIMILARITY-REVIEW.md"),
    ).text();
    const failures = validateBrandAssetPublication({ approval, similarityReview });
    if (failures.length > 0) throw new Error(failures.join("\n"));
    console.log("Brand asset publication controls are accepted.");
    return;
  }

  if (process.argv.includes("--check")) {
    const current = await Bun.file(destination).text();
    if (current !== expected) throw new Error("brand.asset_drift");
    console.log("Brand assets are current.");
    return;
  }

  await Bun.write(destination, expected);
  console.log("Generated src/assets/libre-ai-mark.svg.");
}

if (import.meta.main) {
  await main();
}
