# KITABKHAZANA — Project Plan & Web Architecture Document

> **Project**: KitabKhazana Client Enquiry Portal  
> **Author**: Nazhat Afra W 

## 1. Client & Business Scenario

### Client Background
**KitabKhazana** ("Treasure of Books") is a growing service-oriented book business specializing in the curation, distribution, and exchange of pre-loved and new books across academic history, personal development, and fiction.

### Problem Statement 
The client currently relies on informal, fragmented communication channels (direct WhatsApp chats, phone calls, and word-of-mouth) to field customer requests and source books. This results in:
- Inconsistent enquiry details from customers.
- Repetitive back-and-forth communication to determine desired book titles, condition preferences, and delivery expectations.
- Lack of a centralized online presence showcasing currently available collections and company trust metrics.

### Proposed Solution
A modern, responsive, client-side web application where visitors can:
1. Explore the business's identity, trust badges, and values.
2. Browse curated catalogue items with transparent pricing.
3. Submit structured enquiries specifying book condition preferences and contact details.
4. Receive immediate client-side validation and structured WhatsApp message preparation.

## 2. Target Users & User Personas

 **College Student / Academic** : Looking for high-cost textbooks and reference works at student-friendly prices.Wants quick filtering,clear prices,and an easy way to enquire about academic titles. 
 **Avid Reader / Collector** :Seeking affordable pre-loved novels, fiction,and rare editions.Needs to specify book condition (e.g.,"Used — Like New")and add custom notes to their order. 
 **Book Seller / Contributor** : Wants to sell or donate gently used personal book collections.Seeks a direct selling enquiry route without complex merchant onboarding. 

## 3. Website Goals & Key Objectives

1. **Brand Visibility**: Present KitabKhazana as a trustworthy,curated book enterprise using high-contrast design tokens,warm earthy aesthetics,and clean typography.
2. **Structured Lead Capture**: Convert informal queries into structured enquiries containing name,validated email,10-digit phone,book selection, condition preference,and notes.
3. **Frictionless Mobile-First Experience**: Deliver rapid load times, zero horizontal scroll, and clear touch targets across smartphones, tablets, and desktops.
4. **Immediate Client Feedback**: Provide real-time form validation errors, toast confirmations, and modal dialogues to keep users informed at every step.

## 4. Main Sections & User Journey

### Website Structure (`index.html`)
- **Navigation**:
Persistent branding, section jumps (`Home`, `Browse Books`, `Sell Books`, `About`, `Enquire`), theme toggle, and live cart counter.
- **Hero Banner**:
 Engaging headline with CSS word reveal, floating quote pills, value proposition, and primary CTAs.
- **Why KitabKhazana (`.why-grid`)**:
 3-column CSS Grid highlighting curation, featured titles, reader counters, and trust badges.
- **Catalogue Grid (`#catalogue`)**:
 Dynamic CSS Grid populated by JavaScript from the `BOOKS` array.
- **About Platform (`.feature-grid`)**: 
Company mission with 3-column CSS Grid feature cards.
- **Sell Call-to-Action (`#sell`)**:
 Bold banner directing users to the enquiry form for selling books.
- **Client Enquiry Form (`#enquiry`)**: 
Validated form with radio condition selectors, message character counter, and instant dispatch.
- **Cart Selection Drawer (`#cartSidebar`)**: 
Slide-in basket allowing visitors to select multiple books and enquire in bulk.
- **Footer**:
 Brand summary, internal navigation, contact details, and dynamic copyright year.

### User Journey Flowchart

flowchart TD
    A[Visitor Lands on index.html] --> B[Hero Section: Read Value Proposition]
    B --> C{User Intent?}
    
    C -->|Browse Books| D[Catalogue Grid]
    D --> E[Click 'Add' to Selection Basket]
    E --> F[Open Cart Drawer]
    F --> G[Click 'Enquire via WhatsApp']
    G --> H[WhatsApp Opens with Complete Multi-Item Breakdown]

    C -->|Direct Single Enquiry| I[Scroll to Enquiry Form]
    I --> J[Fill Name, Email, Phone, Select Title]
    J --> K[Choose Condition: New / Like-New / Good]
    K --> L[Click 'Submit Enquiry']
    L --> M{Client Validation Passes?}
    M -->|No| N[Display Visual Error Toast & Focus Invalid Field]
    M -->|Yes| O[Show Success Modal & Open WhatsApp with Structured Enquiry]
    
    C -->|Sell Personal Books| P[Click 'Sell Books' CTA]
    P --> I


## 5. Web Architecture: Client-Side vs. Server-Side Responsibilities

### How the Browser (Client) Communicates with the Website
1. **HTTP/HTTPS Request**: When a visitor enters the website URL or opens `index.html`, the browser issues a `GET` request to the web server (or local HTTP host).
2. **Resource Parsing**: The server responds with HTML, CSS (`styles.css`), JavaScript (`app.js`), and media assets (`assets/images/`).
3. **DOM & CSSOM Construction**: The browser engine builds the Document Object Model (DOM) and CSS Object Model (CSSOM), combining them into the render tree.
4. **Script Execution**: The browser executes client-side JavaScript (`app.js`), rendering dynamic book cards, binding event listeners, reading `localStorage`, and registering the `IntersectionObserver`.

```
+-------------------------------------------------------------+
|                      USER'S BROWSER                         |
|                                                             |
|  [HTML5 DOM]  <--->  [CSS3 Styling & Grid]                  |
|         ^                                                   |
|         | Events & Dynamic Updates                          |
|         v                                                   |
|  [Vanilla JavaScript Engine (ES6+)]                         |
|   - Real-time Form Validation                               |
|   - Dynamic Catalog Rendering (BOOKS array)                 |
|   - DOM Manipulation (Hamburger, Modals, Counters)          |
|   - Client-Side Storage (localStorage: theme, cart, draft)  |
|   - IntersectionObserver (Scroll Motion)                    |
+-------------------------------------------------------------+
                              |
                              | Direct wa.me URL Scheme
                              v
             +----------------------------------+
             | WhatsApp Client / Web Messenger  |
             | (Dispatches Structured Message)  |
             +----------------------------------+
```
