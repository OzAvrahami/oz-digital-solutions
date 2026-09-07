# Approved redesign — implementation and verification

Issue: [#3](https://github.com/OzAvrahami/oz-digital-solutions/issues/3). Target: **v1.1.0**, prepared locally, not released. Owner acceptance remains pending.

## Scope and preservation

The authoritative package is `design/oz-digital-flow-design/`, dated 7 September 2026. It remains untouched and untracked. `site/` is the actual runnable reference; the original `dist/` references in its supporting notes are historical.

`src/content/flow.ts` preserves the approved bilingual homepage copy. `src/components/flow/` ports the reference into server-rendered React content with focused client interactions. The reference styles are reused with a namespaced container and a separate integration stylesheet. `public/oz-digital/` includes the supplied font, brand SVGs, favicon and licenses.

The old rendered portfolio homepage and its preview component are removed; historical design packages and public preview assets are preserved without visible showcase navigation. Services and guides retain their original content/rendering components and receive shared styles. Guide content, provider configuration, server contact action, analytics code, WhatsApp URL/event helpers, metadata helpers, structured data, robots and Railway configuration have no changes. The sitemap adds only the two accessibility routes. Existing Open Graph image rendering is unchanged.

## Completed checks

- `npm run lint`, `npm run typecheck`, `npm run build` and whitespace/diff inspection.
- Impact ownership tag ordering verified in all 20 prerendered HTML files by the existing production-build script.
- Network-enabled local preview: both existing Open Graph image routes return 200/image/png; sitemap and robots return 200; `/` resolves through the existing default-locale behavior. No production pages were changed.
- `node scripts/check-contact.mjs`: the real server action with an isolated delivery stub; both locales, required fields, limits, unsupported characters, normalization, honeypot, missing configuration, locale fallback, success and transport failures. No environment credentials loaded and no network transport used.
- `node scripts/check-whatsapp.mjs`: missing/invalid configuration, exact configured number `972506795903`, exact encoded bilingual messages, click-only payload/placement, query exclusion, absent/throwing analytics and localhost suppression.
- Isolated Chrome production-browser matrix: 50 combinations of Hebrew/English, 360/390/768/1440/1920px widths, and homepage/websites service/guides index/business-website-cost article/accessibility statement. Checks cover direction, overflow, canonical URLs, Impact tag, duplicate IDs, removed showcase links, tool/service counts, menu touch/Escape/focus, native WhatsApp destinations and floating suppression.
- Browser preferences/contact checks: paused content remains visible; synchronized controls and stored motion/contrast survive reloads; dialog Escape/focus return and scroll unlock; FAQ keyboard operation; back-to-top heading focus; transitions into/out of the statement; pending/disabled, field-error and success form states using intercepted local RSC responses. No contact POST reached the server in browser QA.
- Additional isolated checks in both locales: normal workflow progression and keyboard activation, pause during playback, changing OS reduced-motion preference, reset respecting that preference, inline WhatsApp with recorded/absent/throwing analytics, exact Shopify affiliate event/configured URL, one page-view event during a tested client route transition, equivalent article language navigation, and automation service/guide routes.
- Same-page header section navigation and the resulting language-switch hash are verified. Same-page section links are native anchors; cross-page section links retain Next navigation.
- Server-rendered homepage content remains visible with JavaScript disabled and reduced motion enabled. This is a content check, not a claim that interactive controls or the contact form work without JavaScript.
- Visual comparison with the supplied reference in both locales at 360, 768 and 1440px, using settled/reduced-motion screenshots. Representative service, guide index and article screenshots inspected. Local screenshot evidence is under ignored `.tmp/` (`reference-*`, `redesign-*`, `review-*`).

The tests caught and corrected local-font inheritance, decorative mobile overflow, an SVG intercepting the motion button, and dialog focus return while a checkbox was active. Native contact delivery was never replaced with the reference's mailto demonstration.

## Limits and owner review

- The connected Browser integration had no available browser. QA used a clean, isolated Chrome session, not the owner's browser profile. Mobile/tablet checks are emulation, not physical-device testing.
- Browser requests to analytics and external destinations were blocked/intercepted. GA4 and affiliate events were recorded locally, not delivered to production. No real WhatsApp message or contact submission was sent.
- Full screen-reader, cross-browser, physical-device, zoom/forced-colors and comprehensive accessibility assessment remain manual. The statement explicitly does not certify Israeli Standard 5568 AA compliance.
- Owner review of exact visual fidelity, copy, interactions and acceptance is pending. Check mobile controls while scrolling, browser zoom, keyboard navigation, and service/article readability. Real email delivery and production analytics receipt remain an owner-controlled post-review check.
- Existing Browserslist data-age warning remains. Sandboxed build/preview runs logged denied fetches for the unchanged Open Graph image font URLs; this is separate from the locally hosted page font. Both image responses were subsequently verified successfully using a network-enabled local preview.
- The `v1.0.0` tag is the planning baseline, not a published Release. Package/root lockfile metadata is deliberately reconciled from `0.1.0` to `1.1.0`; dependencies are unchanged. Staging, commit, push, tag, release publication and deployment remain entirely with the owner. Keep #3 open in Verify until acceptance.

## Repeat locally

```powershell
npm.cmd run lint
npm.cmd run typecheck
node scripts/check-contact.mjs
node scripts/check-whatsapp.mjs
npm.cmd run build
npm.cmd run start -- --port 3007
```

Review `http://localhost:3007/he` and `/en`, plus the localized `/services/websites`, `/guides`, `/guides/business-website-cost-2026` and `/accessibility` routes. `/` retains the existing Hebrew-default redirect. Alternatively use `npm.cmd run dev -- --port 3005`.

Optional repeatable browser matrix uses an **existing** Playwright installation and Chrome, without adding an app dependency:

```powershell
$env:PLAYWRIGHT_MODULE = 'file:///absolute/path/to/playwright/index.mjs'
$env:REVIEW_ORIGIN = 'http://redesign-review.test:3007'
node scripts/check-redesign-browser.mjs
```

The script maps that test-only hostname to loopback, intercepts contact requests, records WhatsApp navigation locally and blocks other external traffic. Run it against a production build. `.tmp/` must exist for local screenshots. Do not point QA at production.
