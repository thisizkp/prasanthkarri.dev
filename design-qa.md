# Focused blog refresh — validation

25 September 2026. **final result: passed** for the scoped local UI checks. Production analytics receipt is not verified.

## Visual comparison

The three supplied light-theme references are preserved as [homepage](docs/qa/before-home.png), [article](docs/qa/before-article.png), and [article ending](docs/qa/before-article-end.png). Each reference and corresponding implementation screenshot was opened together for comparison, at 1280×720 CSS pixels and 1× pixel density. No full-page stitching or image rescaling was used.

Implementation: [homepage, light](docs/qa/home-desktop-light.png), [homepage, dark](docs/qa/home-desktop-dark.png), [article](docs/qa/article-desktop-light.png), [article ending with keyboard focus](docs/qa/article-end-desktop-light.png). The end captures show the same article-ending region; the new return link, visible email label, revised promise and focused button intentionally change its height and state.

- **Typography:** original Bricolage Grotesque, weights and hierarchy retained. Desktop prose remains 624px wide, 18px text with 31.5px line height; title remains 48px. Both essay bodies are byte-for-byte unchanged.
- **Spacing/layout:** portrait stays 80×80; original single-column composition and unboxed article list remain. Slightly tighter introduction spacing accommodates the compact subscription section. Header controls are 44×44, adding 12px to desktop header height. Mobile header wraps cleanly to a second row. Form controls align at their bottom edges on desktop and stack on mobile.
- **Colors:** original restrained surfaces retained; light accent/metadata and dark metadata/input boundaries were adjusted for contrast. See measurements below.
- **Images:** original portrait and existing logo/icons retained without substitutions, cropping changes or generated assets.
- **Copy:** two factual descriptions replace truncated opening lines; description fallbacks remain for future posts and are shared with article metadata and RSS. Introduction and subscription copy describe curiosity and learning without invented articles, credentials, readership, categories or cadence.

Focused form details are readable in the desktop article-ending capture and [390×844 dark mobile form](docs/qa/form-mobile-dark-focus.png), including the visible label, boundary, button alignment and focus ring. These supplied sufficiently large detail views; no additional crops were needed.

## Responsive and interaction checks

- Viewed desktop 1280×720 and mobile 390×844 in light/dark themes, plus 320×740 light reflow. No horizontal overflow at the inspected widths. Evidence: [mobile homepage](docs/qa/home-mobile-dark.png), [320px homepage](docs/qa/home-320-light.png), [mobile article light](docs/qa/article-mobile-light.png), [mobile article dark](docs/qa/article-mobile-dark.png), [mobile article ending](docs/qa/article-end-mobile-light-focus.png).
- Theme toggle changes theme and accessible name; choice persists across article navigation.
- Keyboard focus checked on skip link, navigation links, email field and Subscribe button. Skip link activates `#main`. Invisible Back to top is hidden from focus; activating the visible button returns to scroll position 0 and hides it again.
- Homepage article navigation, both previous/next article links and Back to all writing were exercised. Existing article content links remain unchanged.
- Email field retains native required/email constraints; entering an invalid local string exposed `validity.typeMismatch`. Field was cleared without submission. Existing Buttondown POST action and hidden `embed=1` remain; autocomplete and visible label were added. No signup or delivery test was performed.
- Reduced-motion branch was inspected in source; an OS-level reduced-motion test, screen-reader session and browser text-zoom test were not performed. This is scoped verification, not a full accessibility certification.

## Contrast

Ratios calculated from rendered CSS tokens using WCAG relative luminance:

| Pair | Light | Dark |
| --- | ---: | ---: |
| Main text / background | 16.98 | 14.27 |
| Muted text / background | 7.23 | 10.08 |
| Metadata / background | 5.30 | 7.24 |
| Placeholder / input | 5.54 | 5.07 |
| Input boundary / input | 3.64 | 3.56 |
| Focus / background | 4.95 | 8.26 |
| Focus / input | 5.17 | 5.79 |
| Button text / fill | 10.31 | 7.73 |
| Button text / hover fill | 17.74 | 4.83 |

## Build and analytics

- Clean frozen dependency install using the repository-declared pnpm 10.2.0, with lifecycle scripts disabled, passed. Existing package resolutions retained; lockfile adds only Analytics.
- `npm run lint`: 12 files, zero errors, warnings or hints.
- `PUBLIC_BUTTONDOWN_USERNAME=thisizkp npm run build`: all four HTML pages and RSS generated successfully.
- `git diff --check` passed. Built HTML has exactly one Analytics component on each HTML page and the correct existing subscription action on each content page.
- Local production-build preview at `http://127.0.0.1:4321/` injects `/_vercel/insights/script.js` through `@vercel/analytics/astro`, following [Vercel's integration guidance](https://vercel.com/docs/analytics/quickstart). Local Astro does not serve Vercel's analytics endpoint: the SDK logs its expected script-load failure. No other warning/error-level console entries were captured. This proves component/script injection, not event delivery.
- No production deployment, merge, main push, newsletter send, subscriber-list inspection, paid-plan change or security-setting change was performed. After an authorized deployment, verify the Vercel script loads, a pageview request succeeds and the corresponding event arrives in the production dashboard. Historical missing records cannot establish zero readers.

## Comparison history and remaining findings

Initial pass: homepage introduction was unnecessarily long and the subscription area too tall. Shortened the introduction and tightened section/form spacing; final homepage captures show both article descriptions and the form at desktop height. Initial dark placeholder contrast was 4.07:1 and input boundary 2.86:1; adjusted tokens to the final ratios above. Existing light focus contrast and hidden-but-focusable Back to top were corrected. Final screenshots show the fixes; no actionable P0/P1/P2 visual findings remain. No further P3 styling changes are proposed.

Implementation checklist: copy, descriptions, subscription entry, return navigation, analytics integration, responsive checks, keyboard checks, contrast checks and production build completed. Production event receipt and newsletter delivery remain outside the verified scope.

Follow-up from user review: the all-writing link combined its permanent text decoration with the shared animated pseudo-element, creating two lines on hover. Disabled that pseudo-element for this link and made the existing underline change color on hover/focus. Browser inspection confirmed `:hover` with `::after` content `none`, and keyboard focus retained its 2px outline. Production build and whitespace check passed.
