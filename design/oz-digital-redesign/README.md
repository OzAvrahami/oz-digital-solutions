# Oz Digital — Homepage redesign V4

Based on OzAvrahami/oz-digital-solutions, main at 128a5c84c390ebf044ba16f3fdbb66a8644196d8.

## Design

A consistent cool-white canvas, ink typography and restrained blue accents. A new centered hero presents the actual Finance and LifeOS screens. The portfolio now includes five projects: Finance, Panda, TradingLog, LifeOS and LimitPact, with a separate desktop-app view for LimitPact. Large interface presentations replace the previous illustrative mockups. Product-native colors stay inside the screens. Services use a quieter list, the process uses a connected numbered sequence, and the about and contact sections have new layouts. Hebrew process steps progress from right to left; there is no decorative 01–04 hero label.

## Reference screens

The supplied HTML design templates were resolved into isolated, static product screens. The original interface layout, CSS, copy and example data are retained. Authoring canvases and unrelated design-system screens are excluded. Original handlers are not shipped: these are portfolio exhibits, not working copies of the applications. TradingLog uses the matching Hebrew or English reference. Other projects retain their original reference language.

- Finance v3: dashboard, dark theme.
- Panda 2.0: overview workspace. Explorations and Handoff informed the selection of the final design.
- TradingLog HE / TradingLog: overview, desktop, dark theme.
- LifeOS: first Today screen, teal accent.
- LimitPact Desktop: connected/active state; LimitPact Landing: product website.

The source attachments themselves are unchanged. Missing LimitPact brand images were obtained from the owner's limitpact-website repository. Reference fonts and icons are local; included licenses are in public/project-previews/licenses. ReferenceScreen scales each original-size document with ResizeObserver. Embedded frames are passive, sandboxed and lazy-loaded except in the hero. Links open full-size static designs. The standalone preview embeds fonts and reference documents and does not need the reference attachments beside it.

## Existing behavior

The original accessible mobile menu, language switcher, contact form and server action, footer, SEO metadata, analytics configuration, service pages and guides are reused. The home route loads StudioHome. Styles are scoped to the homepage; other routes keep their existing styles. There are no dependency or configuration changes.

## Review and apply

1. Open oz-digital-redesign.html to review both languages. This standalone design preview does not submit forms. Guide/service links open the current live website.
2. Compare your working tree with the pinned source revision. Copy all files under changes/ into the matching paths of your local project. The patch contains the text changes to application source; copy public/project-previews/ separately from changes/ as well.
3. Run npm run typecheck and npm run build locally. Review /he and /en at desktop and mobile widths, including keyboard navigation, the menu, full-size reference links and the existing contact flow.
4. Stage, commit and push manually after review, using your existing deployment workflow.

No git staging, commit, push or live deployment was performed. Work was prepared from the connected GitHub source, not from the local Windows working tree.

## Validation

TypeScript passed. All seven extracted reference documents rendered without unresolved template bindings. Generated HTML includes five projects, eight preview frames and the correct process direction in each language. CSS syntax, local asset references and preview packaging were checked. Next.js generated the updated bilingual homepage, service/guide HTML and styles. The build tool session ended with a network-approval cancellation before a final exit status was collected, so a completed production build is not claimed. Browser-based visual/interaction QA was not run in this session.
