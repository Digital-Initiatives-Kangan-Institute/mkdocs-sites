# Samples

This folder contains sample Anigram diagrams as JSON files. They are the source of truth for `Menu → Samples ▸` submenu in the app.

- Files are duplicated to `public/samples/` so they are served at `/samples/<name>.json` in dev (`vite`) and in `dist/samples/` after `npm run build`.
- Add new samples by creating a new `*.json` file here **and** copying it to `public/samples/` (or run `cp samples/*.json public/samples/`), then add a button inside the `Menu → Samples ▸` **submenu** (`Choose Sample` fly-out to the right, `samplesMenuOpen` state) in `src/App.tsx` that calls `loadSample('your-file.json')`.
- Keep `AGENTS.md` updated when you add a sample (list it in §7 and changelog).

## Available samples

| File | Description | Nodes | Features showcased |
|------|-------------|-------|--------------------|
| `01-onboarding-flow.json` | Simple user onboarding: Start → Create Account → Email Verified? → Send Activation / Dashboard → Done | 6 | `terminal`/`process`/`decision`/`io`, `animated`/`flow`/`dashed`, `labelAlign`/`labelSize`, `step` `1…6`, `subtext` |
| `02-ecommerce-checkout.json` | E-commerce checkout with product image: Browse → Sneakers (image) → Add to Cart → In Stock? → Checkout → Payment OK? → Order Complete / Error | 9 | `image` node with remote `https://picsum.photos`, `subtext`, all edge styles, `right`/`top` alignment |
| `03-ci-pipeline.json` | CI/CD pipeline: Push → Run Tests → Tests Pass? → Notify/Build → Deploy Staging → Manual Approval? → Deploy Prod → Done (+ Rollback loop) | 10 | `diamond` branching, `flow` dots, `loop` dashed edge, `subtext` like `docker`/`k8s` |
| `04-http-static-site.json` | HTTP request flow for static website: Browser GET → DNS → CDN Edge → Cache Hit? → Serve Cached / Fetch Origin S3 → Cache & Store → Browser Renders | 8 | `decision` Cache Hit?, `flow` TLS/origin, `subtext` CloudFront/S3, `labelAlign` HIT/MISS |
| `05-group-demo.json` | Group demo: Frontend Feature group `340×290` at `(40,30)` containing User Action → Validate → Valid? with edge `g1 → API Request` demonstrating connections to group rectangle; group draggable moves members | 7 nodes +1 group | `Group` dashed `8 6`, `groupId` binding, `getEdgeEndpoints` to group |

## Schema

See `AGENTS.md §2` for the full Node/Edge spec. Minimal valid sample:

```json
{
  "version": 1,
  "app": "anigram",
  "viewport": { "zoom": 1, "pan": { "x": 0, "y": 0 } },
  "nodes": [{ "id": "n1", "x": 100, "y": 80, "w": 180, "h": 64, "type": "terminal", "label": "Start", "color": "#ecfdf5", "step": "1" }],
  "edges": [{ "id": "e1", "from": "n1", "to": "n2", "style": "animated", "animated": true, "speed": 1 }]
}
```

Import via `Menu → Import JSON` or drag-drop the file onto the canvas; export via `Menu → Export JSON` or header `EXPORT`.

## Adding a new sample

1. Create `samples/04-my-diagram.json` (and copy to `public/samples/`).
2. Validate it imports: `npm run dev` → `Menu → Samples ▸` → `Choose Sample` → your sample or drop the file.
3. In `src/App.tsx` menu `Samples` **submenu** (`onMouseEnter`/`onMouseLeave` `samplesMenuOpen`, `position:absolute left:calc(100%+8px)` fly-out), add inside the submenu `Choose Sample` div:
   ```tsx
   <button onClick={()=>{ setMenuOpen(false); setSamplesMenuOpen(false); loadSample('04-my-diagram.json') }} style={menuItemStyle}>
     <span style={menuIconStyle}>04</span>
     <span style={{flex:1,...}}>My Diagram</span>
     <span style={{fontSize:10,...}}>X nodes</span>
   </button>
   ```
4. Update `AGENTS.md` §7 table and changelog, and ensure `overflow:visible` on the parent dropdown so the submenu is not clipped.
