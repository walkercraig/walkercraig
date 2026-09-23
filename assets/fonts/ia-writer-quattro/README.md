# Optional iA Writer Quattro body font

Quattro is available but turned off. The site's current typography is preserved.

To enable it, open `_sass/_variables.scss` and change:

```scss
$use-quattro-body: false;
```

to:

```scss
$use-quattro-body: true;
```

Commit the change and let GitHub Pages rebuild the site. Change it back to
`false` to return to the current font.

This affects reading text on the homepage, posts, pages, post excerpts, and
newsletter descriptions. Headings, navigation, the site name, forms, and
post metadata retain their existing fonts. Quotation and code styles are
preserved. When disabled, no Quattro font-face rules or overrides are emitted.

The four unmodified WOFF2 files are by Information Architects, based on IBM
Plex, and distributed under the SIL Open Font License 1.1 in LICENSE.md.
Source: https://github.com/iaolo/iA-Fonts/tree/master/iA%20Writer%20Quattro
