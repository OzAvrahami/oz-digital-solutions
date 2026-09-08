# Social-sharing previews

Issue: [#5](https://github.com/OzAvrahami/oz-digital-solutions/issues/5). Awaiting owner visual acceptance and owner-controlled Git operations/deployment.

## Assets and design source

- `public/social/oz-he-753679b4def8.png`
- `public/social/oz-en-420c43255573.png`
- `src/content/social-images.json`: generated filenames, 1200×630 dimensions, PNG MIME type and localized alt text.
- `scripts/social-images/template.html` and `style.css`: fixed HTML/CSS capture layout, using the approved flow palette, existing favicon brand mark and local Heebo font.
- `scripts/generate-social-images.mjs`: reads the current `name`, `headline` and `eyebrow` from `src/content/flow.ts`, embeds local resources, waits for `document.fonts.ready` and image decoding, and captures PNGs with Chromium. The optional homepage headline break is collapsed for the wider sharing canvas. Hebrew stays in natural Unicode order; `dir="rtl"` and isolated Latin `AI`/domain text use browser bidi shaping. No string reversal or image mirroring.

Only static PNGs and the manifest are consumed by production. There is no production Chromium process, image-generation request or remote font fetch. No package/lockfile changes or new application dependencies are required.

## Regenerate

Use an existing Playwright installation and local Chrome, as with the repository's optional browser QA scripts. Run from the repository root after installing the existing application dependencies. Point `PLAYWRIGHT_MODULE` to that installation's `index.mjs`; do not add Playwright to application dependencies.

```sh
export PLAYWRIGHT_MODULE="file:///absolute/path/to/playwright/index.mjs"
node scripts/generate-social-images.mjs
node scripts/generate-social-images.mjs --check
```

`BROWSER_CHANNEL` defaults to `chrome` and can select an existing Playwright browser channel. All render resources are embedded from local files, with external browser requests blocked. The fixed capture is 1200×630 CSS pixels at device scale 1, UTC, reduced motion and the appropriate locale.

The prepared PNGs were rendered with Playwright **1.63.0** and Chrome **151.0.7922.169 on macOS arm64**. Repeated generation with the same renderer produced byte-identical assets. For byte-level reproduction, use the same Chrome version/platform and source/font files: browser upgrades or OS rasterization differences can change pixels. The `--check` mode writes nothing and verifies both PNG bytes and the generated manifest, failing if a fingerprint differs or the corresponding asset is absent.

Changing copy/layout/font inputs generates new SHA-256-derived filenames and updates the manifest. Review both images again and include the new PNGs and manifest together. The generator leaves previous files alone; retain already published assets if old previews may still reference them. Never change canonical page URLs to invalidate preview caches.

## Metadata ownership

The obsolete `src/app/[locale]/opengraph-image.tsx` generator is removed. [Next.js metadata documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) describes file-based metadata priority; the installed Next.js 16.2.1 resolver also merges file images when image fields are absent at that segment. Removing the old file eliminates that competing source and the faulty image endpoint.

`getSocialImage` in `src/lib/metadata.ts` builds absolute production URLs from the generated manifest. Both the locale layout and the shared page metadata helper use it for Open Graph and Twitter. Open Graph advertises PNG MIME and dimensions; both systems advertise the localized image alt text. Twitter uses `summary_large_image` (its image tags do not have the Open Graph width/height/type properties).

The existing home metadata text is unchanged. Services, guides and accessibility continue to supply their own titles/descriptions through the helper. Canonical URLs, hreflang, root redirect, sitemap and robots remain unchanged. The removed localized generator endpoints return 404; sharing metadata points only at the fingerprinted assets.

## Verification

```sh
npm run lint
npm run typecheck
npm run build
npm run start -- --hostname 127.0.0.1 --port 3008
```

In another shell with `PLAYWRIGHT_MODULE` set:

```sh
REVIEW_ORIGIN=http://127.0.0.1:3008 node scripts/check-social-metadata.mjs
```

The focused check uses only localhost and parses returned HTML without executing page scripts. It checks normal, WhatsApp, Facebook and Twitter user-agent requests for:

- Root 307 redirect to `/he` and the resulting Hebrew response.
- Both homepages, `/services/websites`, `/guides`, and `/guides/business-website-cost-2026`: 32 page responses, exact dictionary titles/descriptions, localized images/alt text, canonical/hreflang, locale/direction and website/article types.
- Exactly one Open Graph and Twitter image per page, accurate image dimensions/MIME, absolute production image URLs, and no stale generator references.
- Eight asset responses (both locales for each user agent): fetch the advertised production image path from the local server, assert 200/image/png, verify PNG signature/dimensions, byte equality with local assets, fingerprint and no crawl-blocking headers. No request to the undeployed production asset URLs is implied.
- Robots/sitemap availability and removed generator 404s.

Completed: all above checks, lint, typecheck, production build and repeat-generation byte comparison passed. The existing build-time Impact tag verification passed for 20 prerendered HTML files. The existing Browserslist data-age warning remains.

Both actual PNGs were visually inspected at 1200×630 and reduced 400×210: correct Hebrew name/headline/punctuation/service wording, intact Latin `AI` and domain, correct English, approved light colors and no clipped text. Reduced review captures and the faulty production PNG are local evidence under ignored `.tmp/social-preview/`; the full PNG deliverables are under `public/social/`.

## Owner review and external cache limits

Review the two PNGs directly and at sharing-preview size. Local production previews while the server runs:

- http://127.0.0.1:3008/social/oz-he-753679b4def8.png
- http://127.0.0.1:3008/social/oz-en-420c43255573.png
- http://127.0.0.1:3008/he and http://127.0.0.1:3008/en

After owner acceptance and deployment, verify the production metadata and advertised image URLs again. These changes have not been deployed by this task. External platforms may retain cached page metadata/images and need a fresh fetch. New fingerprints avoid reusing the faulty image URL, but cannot force WhatsApp to refresh cached page metadata or update existing messages. Real WhatsApp messages, contact forms and test posts were not sent; actual platform fetch/crop behavior remains an owner-controlled check. No full cross-platform social-client or accessibility certification is claimed.
