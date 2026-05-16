# Image & video assets

Drop the real files into this folder, then add the matching `src` line to the
slot in `lib/content.ts`. No component or layout edits are needed — the box
dimensions are identical in placeholder and real mode.

| File | Aspect | Used by | Should depict |
|---|---|---|---|
| `modera-lead.jpg` | 16:10 | `modera.leadImage` | iPhone scan-to-design flow |
| `canopy-lead.jpg` | 16:10 | `canopy.leadImage` | Heatmap with an intervention drawn on it |
| `truckside-lead.jpg` | 16:10 | `truckside.leadImage` | Food truck at night, or the hardware stack |
| `ftc-demo.mp4` | 16:9 | `ftc.video` | FTC scoring tool demo |
| `ftc-demo-poster.jpg` | 16:9 | `ftc.video` (poster) | Optional poster frame for the video |
| `gcloud-startups.svg` | — | `modera.programs[0]` | Google Cloud for Startups lockup |
| `nvidia-inception.svg` | — | `modera.programs[1]` | NVIDIA Inception lockup |

## Activating an asset

In `lib/content.ts`, add `src` (and `poster` for the video) to the slot:

```ts
leadImage: {
  filename: "modera-lead.jpg",
  aspectRatio: "16/10",
  label: "iPhone scan-to-design flow",
  src: "/images/modera-lead.jpg", // <- add this line
},
```

Logos take a `src` on the program entry: `{ name: "...", src: "/images/..." }`.

Lead images are auto-desaturated (`saturate(0.92)`) and logos are rendered
monochrome, so source files can be full-color.
