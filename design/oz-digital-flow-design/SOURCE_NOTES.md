# Oz Digital — website design

A standalone bilingual design for Oz Avrahami. Hebrew is the default; the language control switches all content and layout direction to English. This design removes all portfolio showcases and puts business services, recognizable tools, an interactive illustrative workflow, the personal introduction, process, FAQ, and contact first.

## Running

The authored website lives in `dist/`. It is a buildless static website with local assets and no dependencies. Serve that directory with any static web server.

## Interactions

- The hero's play button runs an illustrative lead-to-response workflow. No real customer data, automation, or business performance is represented.
- Motion has a pause control and honors reduced-motion preferences.
- A back-to-top control appears after scrolling and returns keyboard focus to the main heading. It respects the visitor's reduced-motion setting.
- A native accessibility dialog offers persistent motion and contrast preferences. The accessibility statement explains implemented features, remaining review limits, and contact options in both languages.
- The tools section presents a curated selection: 16 main tools plus a compact secondary row for Docker, AWS, and Microsoft Dynamics, all with plain-language descriptions. The copy explicitly says this is part of a broader toolkit.
- FAQ answers support keyboard activation and expose their expanded state.
- Mobile navigation supports Escape and closes on navigation.
- The contact form opens a draft in the visitor's email application. It does not claim to send or persist submissions.
- Contact details and external profile links use the existing public website's details.

This is a separate design Site. It does not modify the production Next.js website, contact backend, analytics, localization files, affiliate configuration, or existing repository.

## Assets

Heebo variable font: Google Fonts, SIL Open Font License, included at `dist/assets/Heebo-OFL.txt`.
Brand symbols: Simple Icons, CC0 license, included at `dist/assets/Simple-Icons-LICENSE.md`. Brand marks remain the property of their respective owners. Icons were retrieved from cdn.simpleicons.org; the OpenAI icon is from Simple Icons 13.0.0.
Additional icons are from Simple Icons 15.0.0 via jsDelivr. The monday.com, Docker, and AWS marks are from the Iconify Logos 1.2.4 collection via jsDelivr. The Microsoft Dynamics icon is from Simple Icons 11.0.0. Their inclusion identifies the tools, and does not imply endorsement.
UI line icons and geometric workflow layout are authored in the website source. No portfolio assets or reference-site code are copied.

## Validation

JavaScript syntax, both localized rendered structures, unique IDs, internal anchor targets, and local asset references were checked. The new controls were exercised in a mocked DOM for scroll visibility, focus return, motion behavior, contrast preferences, reset, and persistence. No browser visual testing or full screen-reader accessibility assessment was performed.

## About copy

The about section highlights the user’s confirmed 9+ years of enterprise-systems experience and leadership of a five-developer team at Matrix for Union Motors. It names customer management, pricing, marketing, and ordering work. No completed client-project count is stated because no verified total was available. These are career facts, not claims that the current freelance business employs a team.
