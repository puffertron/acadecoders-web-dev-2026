# Solutions — 16 flags

1. `FLAG{h7ml_c0mm3nt_1n_1ndex}` — HTML comment in `index.html`
2. `FLAG{m3ta_tag_tr3asur3}` — `<meta name="flag">` in `index.html` `<head>`
3. `FLAG{d1splay_n0n3_but_n0t_g0n3}` — `.hidden-flag` div, `display:none`
4. `FLAG{wh1t3_0n_wh1t3_1snt_1nv1s1bl3}` — white text on white background (`.ghost-text`)
5. `FLAG{data_attr_base64_d3c0ded}` — `data-secret` attribute on `#clue-box`, base64
6. `FLAG{css_before_content_secret}` — `::before { content: ... }` in `styles.css`, itself `display:none`
7. `FLAG{css_custom_property_var}` — `--flag` CSS custom property in `:root`
8. `FLAG{network_tab_saw_me_first}` — fetch() body in `script.js`, visible in Network tab (request fails, domain is fake)
9. `FLAG{localstorage_lurker}` — set via `localStorage.setItem`, check Application tab
10. `FLAG{js_char_code_obfuscation}` — `codes` array of char codes in `script.js`
11. `FLAG{js_atob_base64_string}` — base64 string in `script.js`, decode with `atob()`
12. `FLAG{about_page_rot13_fun}` — rot13'd text (`SYNT{...}`) in `about.html`, hidden with `display:none`
13. `FLAG{svg_title_hidden_desc}` — `<title>` inside a 1x1 `<svg>` in `about.html`
14. `FLAG{sitemap_slug_b64}` — base64-encoded slug in a fake `<loc>` entry in `sitemap.xml`
15. `FLAG{robots_txt_disallow_path}` — plain text in a `Disallow:` path in `robots.txt`
16. `FLAG{html_entity_encoded_flag}` — HTML-entity-encoded string inside an HTML comment in `about.html` (entities aren't decoded inside comments, so it must be decoded manually)

## Tools a solver will want
- Browser DevTools: Elements, Console, Network, Application (Storage) tabs
- "View Page Source" (raw HTML, not rendered DOM)
- A base64 decoder
- A ROT13 decoder
- An HTML entity decoder
