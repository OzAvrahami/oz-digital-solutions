# Changelog

Meaningful releases follow `vMAJOR.MINOR.PATCH`. Published GitHub Releases are authoritative; local version metadata and tags alone do not indicate publication.

## v1.1.0 — prepared, unreleased

Implementation: [#3 — Implement the approved Oz Digital redesign](https://github.com/OzAvrahami/oz-digital-solutions/issues/3). Owner acceptance and all Git/release operations remain pending.

### Enhancement

- Integrate the approved bilingual white/light-blue design into Next.js: business workflow illustration, five services, curated tools, verified About copy, four-step process, FAQ and real contact presentation.
- Remove the previous homepage portfolio showcases, hero previews and visible showcase navigation; remove the unused former homepage/preview renderer.
- Present 16 primary tools plus Docker, AWS and Microsoft Dynamics, with descriptions, local brand assets, and broader-toolkit wording.
- Apply shared header/footer, route-aware language navigation, typography and light surfaces to services and guides. Keep guides secondary on the homepage.
- Add synchronized motion controls, persistent local contrast/motion preferences, device reduced-motion support, back-to-top focus return and localized accessibility statements.
- Coordinate floating utilities and WhatsApp with the mobile menu, contact editing, dialogs and important controls. Keep the confirmed WhatsApp destination, localized prefilled messages and click-only tracking.
- Use the supplied local Heebo font, SVGs, favicon and included licenses. Preserve the existing contact delivery/validation/honeypot, guide content, affiliate URLs/disclosures, analytics, SEO and Railway settings.

### Verification and maintenance

- Add isolated contact-action checks and an optional browser regression script without adding application dependencies.
- Exclude design-source archives and temporary QA artifacts from application typechecking; exclude ignored temporary helpers from lint.
- Verification evidence and remaining owner QA: [redesign verification](docs/redesign-verification.md). No full accessibility certification is claimed.

### Version reconciliation

The latest remote tag remains `v1.0.0` at `6ef8f76ebc1b0799dbbc8f92db9fef23047b60c4`; there is no published GitHub Release. The application and root lockfile entries previously said `0.1.0`. After implementation, lint/typecheck/build and isolated browser gates, those three local metadata entries were deliberately aligned to the planned next minor version `1.1.0`, using the owner's verified tag baseline. Dependency versions were not changed. This does not manufacture a historical Release or publish `v1.1.0`.
