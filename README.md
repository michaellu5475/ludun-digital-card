# LUDUN Digital Business Cards

Four mobile-friendly digital business cards with click-to-call, email, maps,
WeChat copy (when printed on the source card), and standards-friendly vCard
files.

## Public GitHub Pages URLs

- Mike: `https://michaellu5475.github.io/ludun-digital-card/mike/`
- Chloe: `https://michaellu5475.github.io/ludun-digital-card/chloe/`
- Jana: `https://michaellu5475.github.io/ludun-digital-card/jana/`
- Deavy: `https://michaellu5475.github.io/ludun-digital-card/deavy/`

## Update and publish

1. Edit contact details in `app/lib/contact.ts`.
2. Run `npm test`.
3. Commit the updated source and generated `docs/` directory.
4. Push `main`; GitHub Pages publishes from `docs/`.

Generate the GitHub Pages output with:

```sh
npm run build:github-pages
```

The existing Cloudflare/Sites build remains available through `npm run build`.
