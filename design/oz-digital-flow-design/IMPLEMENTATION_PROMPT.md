Implement the approved Oz Digital design in my existing oz-digital-solutions website. Do the implementation and verification; do not stop at a plan.

## Repository and authoritative design

Work in the existing repository, normally D:\code\oz-digital-solutions.
The approved design package is at design/oz-digital-flow-design/ relative to the repository root. Its complete runnable reference is in site/. Read its index.html, app.js, style.css, accessibility.css, accessibility.html, accessibility.js, and assets before implementing.

Use this package as the authoritative visual and homepage-copy reference. It is the latest design, including the experience section and the broader toolkit. Preserve its white/light-blue canvas, blue accents, Hebrew typography, spacing, rounded surfaces, illustration, animations, and overall visual character. Do not substitute a generic template or redesign it again.

Read applicable AGENTS.md and repository instructions first. Inspect the working tree and preserve unrelated local changes, including any pending GitHub configuration work. Keep the existing framework, package manager, dependencies, locale routing, and application architecture. Inspect the relevant current homepage, shared shell, services, guides, contact flow, SEO, and analytics before editing.

## Implementation

Port the design into the existing Next.js/TypeScript components and localization structure. The static reference is design source, not a replacement application. Do not embed the page in an iframe or copy its imperative whole-page innerHTML renderer into React. Keep indexable content in the existing rendering model and limit client-side logic to interactions.

Match the approved homepage:

- Header, mobile menu, language switcher, hero, animated illustrative business workflow, recognizable tool strip, five service cards, tools section, About section, four-step process, FAQ, contact section, footer, and floating controls.
- Remove all portfolio/project showcases and their visible navigation, hero previews, and showcase CTAs. Do not reintroduce the previous Finance, LifeOS, Panda, TradingLog, or LimitPact previews.
- Preserve all 16 main tools and the separate Docker, AWS, and Microsoft Dynamics row. Retain the wording that this is only a selection from a broader toolkit. Each tool needs its plain-language description and local brand asset.
- Preserve the approved About copy and the two experience facts: 9+ years in business systems and a team of five developers previously led at Matrix for Union Motors. Keep team leadership in the past; do not imply the freelance business currently employs five developers. Do not invent a completed-project count, client count, testimonials, certifications, or performance metrics.
- Preserve the FAQ interactions, motion controls, and user-triggered illustrative workflow. The illustration must remain clearly illustrative and must not imply real customer data or a live integration.

Carry the approved visual language through the shared header/footer, service pages, guides index, and guide articles. Keep guides secondary on the homepage: preserve their navigation access without adding a new homepage guides section. Preserve the readable light article surface and existing guide content.

## Preserve existing production behavior

- Keep localized routes, article slugs, page metadata, canonical URLs, hreflang, sitemap, robots rules, and existing structured data. Keep shared navigation and anchor links working from every route.
- Keep the current language switcher's route-aware behavior, including equivalent service/guide routes where supported. Support Hebrew RTL and English LTR, correct process order, and LTR rendering for email, technical names, and numbers.
- Preserve guide text, affiliate disclosures, provider links, configured affiliate/referral URLs, GA4 page-view and affiliate-click tracking, and the Impact verification tag. Do not duplicate tracking or replace configured affiliate links with generic URLs.
- Preserve the real contact backend/server action, validation, anti-spam behavior, and pending/error/success states. Apply the new form design to this existing flow. Do NOT replace the production form with the reference's mailto-draft demonstration. Adapt the submit text and hint to describe actual message submission truthfully.
- Preserve the site's existing WhatsApp integration and behavior. Retain the verified public contact details: contact@ozavrahami.co.il, WhatsApp +972506795903, and LinkedIn https://www.linkedin.com/in/oz-avrahami-b209584a/ . Preserve any other established public profile links where appropriate.
- Convert reference links that point back to ozavrahami.co.il services/guides into the appropriate internal localized routes.

## Assets and accessibility

Copy the packaged font, SVGs, favicon, and licenses into an appropriate namespaced public asset directory. Update paths consistently and reuse existing identical assets when suitable. Use the supplied assets instead of depending on third-party logo CDNs. Preserve font and brand-license attribution.

Implement the back-to-top button so it appears after scrolling, returns keyboard focus to the main heading, and respects reduced-motion preferences. Implement the accessibility options, persistent device-local preferences, contrast mode, and animation controls in the site's existing component model. Keep their state synchronized and avoid global event-handler or scroll-lock leaks across route changes.

Preserve keyboard navigation, visible focus, skip-to-content links, meaningful labels, FAQ expanded states, native form labels, Escape behavior, dialog focus return, zoom support, and reduced-motion support. Keep every section visible when motion is paused.

Reuse an existing localized accessibility route if one exists; otherwise add a suitable localized route and link it from the footer and accessibility options. Adapt the supplied statement to the implemented site and actual verification status. Do not claim certified or full Israeli Standard 5568 AA compliance without a full assessment. Preserve the public accessibility contact details.

## Verification and handoff

Use the repository's relevant existing build/type-check/test commands. Fix failures introduced by this implementation. Add or adapt focused tests only for meaningful behavior changes; do not add tests that merely duplicate static copy.

If browser testing is available, check Hebrew and English at representative mobile, tablet, and desktop widths, including 360px and a wide desktop. Check overflow, section order, typography, tool labels, menu behavior, language navigation, FAQ, contact states, focus, back-to-top, and motion/contrast settings. Verify service and guide pages as well as the homepage. If browser verification is unavailable, state that clearly rather than claiming it passed.

Do not stage, commit, push, tag, deploy, publish a release, or modify remote repository settings. I perform all Git write operations manually. Do not overwrite unrelated work or discard existing routes/content to simplify the port.

Finish with a concise Hebrew summary of what changed, the important files, what was verified, and any remaining manual checks. Keep the implementation ready for my review and manual commit.
