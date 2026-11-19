# FailMore website

The marketing site for FailMore. Plain HTML, CSS and a little JavaScript, no build step.

## Files
- `index.html` the homepage
- `privacy.html` the privacy policy (the App Store asks for a privacy policy URL, use this one)
- `site.css`, `site.js` styles and behavior, using the same tokens as the app
- `assets/shots/` app screenshots (393 × 852 screens, saved as WebP) and `logger-slide.mp4`, the looping set logger clip
- `assets/flame.json` + `assets/vendor/lottie_light.min.js` the purple flame
- `assets/og.jpg` the preview image when the link is shared

## Things to update
- **Price:** search `data-price` in index.html
- **App Store button:** once the app is live, point the two "Coming soon" links at the App Store URL and swap in Apple's official "Download on the App Store" badge
- **Screenshots:** the originals live in `assets/shots/source/`. The files in `assets/shots/` are the same screens fitted to an iPhone screen, with a status bar and home indicator, so they sit inside the phone frames

## Put it on GitHub Pages with your own domain
1. Create a new repo (for example `failmore-site`) and upload everything in this folder to the root
2. In the repo go to Settings → Pages, set Source to "Deploy from a branch", branch `main`, folder `/ (root)`
3. Buy the domain (Cloudflare, Namecheap, Porkbun, etc.)
4. In Settings → Pages → Custom domain, type your domain (for example `failmore.app`) and save. GitHub adds a `CNAME` file to the repo
5. At your domain registrar, add DNS records:
   - Four `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - A `CNAME` record for `www` pointing to `<your-github-username>.github.io`
6. Wait for DNS to update (minutes to a few hours), then tick "Enforce HTTPS" in Settings → Pages

## Credits
Archivo font (SIL Open Font License), lottie-web (MIT), flame animation by Tom Fabre (Lottie Simple License), some workout icons in the screenshots by Lorc and Delapouite at game-icons.net (CC BY 3.0)
