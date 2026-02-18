# Portfolio images

Upload images here to use in your portfolio. They are served from the site root, so paths in code use a leading slash.

## Folder structure

- **`/images/projects/`** — Project hero images, screenshots, and case study assets  
  - Example: `public/images/projects/my-project/hero.jpg` → use path `/images/projects/my-project/hero.jpg`
- **`/images/about/`** — About page or profile photos
- **`/images/`** — General portfolio or shared images

## Using images in the app

1. **Project hero & screenshots**  
   In `src/content/projects.ts`, set `heroImage` and `screenshots` to paths under `/images/projects/...` (or keep using `/projects/<slug>/...` if you prefer that structure).

2. **Any component**  
   Reference by path (no `public` in the path):
   ```tsx
   <img src="/images/projects/my-project/hero.jpg" alt="..." />
   ```

3. **Next.js Image** (recommended for performance):
   ```tsx
   import Image from "next/image";
   <Image src="/images/projects/my-project/hero.jpg" width={800} height={450} alt="..." />
   ```

## Existing project images

Project images are currently under **`/projects/<slug>/`** (e.g. `public/projects/outfittr/hero.jpg`). You can keep that structure or move/copy assets into `public/images/projects/<slug>/` and update paths in `src/content/projects.ts`.
