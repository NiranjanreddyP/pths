# PTHS — Play To High School

A website for **PTHS (Play To High School)**, a company that acts as a mediator connecting schools and colleges with quality uniform manufacturers. Schools can browse the catalog and book bulk orders online.

## Features

- Responsive landing page (works on desktop and mobile)
- Product catalog (shirts, trousers/skirts, blazers, sports kits, accessories, footwear)
- Online order-booking form with client-side validation
- "How it works", partners, about, testimonials, and contact sections

## Tech

Plain **HTML, CSS, and JavaScript** — no build step, no backend. Fully static.

## Run locally

Open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Hosting

Deployed as a static site on GitHub Pages.

## Notes

- Contact details and prices are placeholders — update them with real values.
- The order form is client-side only; connect a form service (e.g. Formspree) or backend to receive submissions.
