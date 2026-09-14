 **KITABKHAZANA — Client Handover Document** 
> **Project**: KitabKhazana Client Enquiry Portal  
> **Author**: Nazhat Afra W

1. Project Overview & Website Structure

KitabKhazana is a responsive, client-side, JavaScript-driven service and catalogue portal created for an emerging book enterprise. It streamlines book discovery and customer enquiries into a professional, accessible web application.

--Key Sections on `index.html`:
1. Header & Navigation: Fixed/sticky navigation with logo identity, semantic internal section anchors, responsive mobile hamburger toggle, theme toggle, and cart counter badge.
2. Hero Section (`#home`): Bold brand headline with CSS `@keyframes` word-reveal, continuous floating quote pills, subheadings, and quick action buttons.
3. Why KitabKhazana (`.why-grid`): Hand-written 3-column CSS Grid showcasing service strengths, live catalogue stats, and social proof.
4. Catalogue Grid (`#catalogue`): Dynamic CSS Grid populated entirely by JavaScript from the `BOOKS` catalog array.
5. About Platform (`#about`): Background story and hand-written 3-column CSS Grid feature cards.
6. Sell CTA Section (`#sell`): High-contrast call-to-action inviting users to submit book sale enquiries.
7. Client Enquiry Form (`#enquiry`): Professional customer enquiry form with real-time validation, book selection, book condition radio options, character counter, and instant WhatsApp click-to-chat integration.
8. Cart Drawer (`#cartSidebar`): Slide-in enquiry basket allowing users to collect multiple titles and submit a combined WhatsApp enquiry.
9. Footer: Navigation links, direct contact details, and dynamic copyright year.

2. Major Features & Assignment Requirements Mapping

#1 Project Planning & Architecture Complete business scenario, target users, user journey, and client/server boundaries documented in `PROJECT-PLAN.md`.
#2 HTML Structure Semantic
 HTML5 document (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) with valid hierarchy and accessibility attributes.  `index.html` |
#3 Navigation & Page Structure
 Responsive navbar with brand identity, desktop links, mobile hamburger drawer, and smooth in-page hyperlinking. `index.html`, `css/styles.css`
#4 Client Enquiry Form
 Form equipped with Name, Email, Phone, Book Select dropdown, Book Condition Radio Group, and Message textarea. `index.html`, `js/app.js` |
#5 CSS Styling System
 Custom CSS variables/tokens (`--bg`, `--dark`, `--accent`, `--border`), modern Inter typography, elevation shadows, and reusable component classes. `css/styles.css`
#6 Responsive Layout
 Mobile-first Flexbox and CSS Grid layout adapting across 1200px, 991px, 768px, and 480px viewports without horizontal overflow. `css/styles.css`
#7 UI Components
 Reusable hero, feature cards, book cards, banner CTA, modal dialogue, and footer. | `index.html`, `css/styles.css` |
#8 CSS Interaction & Motion
 Pure CSS `@keyframes` word reveal, floating bobbing pills, button transitions, and `IntersectionObserver` scroll reveal. | `css/styles.css`, `js/app.js` |
#9 JavaScript Fundamentals
 Variables, data types, template literals, conditional statements, loops, and reusable modular functions. | `js/app.js` |
#10 Dynamic DOM Interaction
 Mobile hamburger toggle, real-time message character counter, dark/light theme switch, modal popups, and toast alerts. | `js/app.js`, `index.html` |
#11 Form Validation
 Client-side validation for required fields, regex email pattern, 10-digit phone verification, condition radio selection, and user feedback toasts. | `js/app.js` |
#12 Client-Side Data Storage
 `localStorage` used for theme preference (`kk_theme`), draft enquiry fields (`kk_enquiry_draft`), and saved book selections (`kk_cart`). | `js/app.js` |
#13 JavaScript Objects & Data
 `BOOKS` array of objects, array methods (`.map()`, `.find()`, `.filter()`, `.reduce()`), `Date` for footer year, and `Math.random()` for unique reference IDs. | `js/app.js` |
#14 Navigation & User Flow
 Seamless flow guiding users from browsing to enquiry submission with auto-filled WhatsApp click-to-chat dispatch. | `index.html`, `js/app.js` |
#15 Bootstrap Enhancement
 Bootstrap 5.3 containers, utility classes, and Bootstrap Icons 1.11 integrated seamlessly with custom design tokens. | `index.html` |
#16 Responsive Presentation
 Verified viewports across Desktop (1200px+), Tablet (768px–991px), and Mobile (375px–480px). | `css/styles.css` |
#17 Quality & Usability Review
 Zero console errors, valid form behaviour, responsive image scaling, accessible labels, and keyboard focus outlines. | `index.html`, `js/app.js` |
#18 Client Handover
 Comprehensive client handover instructions, technology stack breakdown, and run guide. | `HANDOVER.md` |

3. Technologies Used

- HTML5: Semantic tags, accessibility ARIA labels, form input types (`tel`, `email`, `radio`).
- CSS3 (Custom): Custom properties (tokens), CSS Flexbox, hand-written CSS Grid (`.why-grid`, `.feature-grid`, `.book-grid`), `@keyframes` animations, and 4 custom `@media` queries.
- Vanilla JavaScript (ES6+): `IntersectionObserver`, `localStorage`, DOM manipulation, array higher-order methods, and event listeners. Zero external JS animation or backend libraries.
- Bootstrap 5.3 (CSS Grid & Utilities): Container system and grid utilities.
- Bootstrap Icons 1.11: Vector iconography.

4. How to Run the Project Locally
Because the application utilizes modern web standards (`localStorage`, deferred scripts, and relative assets), run it with a local HTTP server:

Option A: VS Code "Live Server" Extension (Recommended)
1. Open the project folder in VS Code (`e:\P1`).
2. Right-click `index.html` in the file explorer.
3. Click "Open with Live Server".
4. The site will launch automatically at `http://127.0.0.1:5500/index.html`.

Option B: Using Python
Open your terminal / PowerShell in the project directory (`e:\P1`) and run:
```bash
python -m http.server 3000
```
Open your browser and visit: `http://localhost:3000`

Key Configuration Points:
- WhatsApp Destination Phone: To update the business WhatsApp recipient number, edit line 12 of `js/app.js`:
  ```javascript
  const WHATSAPP_PHONE = "919876543210";
  ```
- Book Catalogue: To add or edit catalogue items, edit the `BOOKS` array (lines 22–66) in `js/app.js`. The grid renders automatically upon reload.
