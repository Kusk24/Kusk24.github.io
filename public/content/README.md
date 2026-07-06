# Drop your files here

Every file in this folder is shown on the website automatically — just use
these exact names (see docs/CONTENT.md for the full guide):

```
public/content/
├── portrait.jpg                      ← your hero photo (≈800×960 or larger)
├── Win-Yu-Maung-Resume.pdf           ← your resume (nav + hero download button)
├── projects/
│   ├── augo.png                      ← AUGO screenshot / GIF frame
│   ├── motopedia.png                 ← MotoPedia screenshot
│   ├── space-shooter.png             ← Space Shooter gameplay shot
│   └── gamerental.png                ← GameRental API diagram / terminal demo
└── certs/
    ├── aws-cloud-foundations.png     ← certificate photos
    ├── aws-cloud-developing.png
    ├── aws-cloud-operations.png
    └── huawei-cloud-developer.png
```

While a file is missing, the site shows a subtle placeholder in its spot.
PNG and JPG both work — if you prefer a different name or format, update the
matching path in `src/content/site.ts`.
