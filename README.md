# Mohonchura

React + Vite online store (demo front end).

## Run on your computer
```
npm install
npm run dev
```

## Product photos
```
node get-images.mjs YOUR_PEXELS_KEY
```
Free key: https://www.pexels.com/api/ . Photos are saved into `public/products/`.

## Deploy on Vercel
1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New > Project** and import the repository.
3. Vercel detects Vite automatically (build command `npm run build`, output folder `dist`). Click **Deploy**.

## Note
Checkout and login are demo only. Connect a real payment provider and backend before going live.
