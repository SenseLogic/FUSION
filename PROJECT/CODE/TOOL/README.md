# Port scripts

Scripts live in `CODE/TOOL` and port into a SvelteKit target folder (default: `CODE/SITE`).

## Scripts

- `port_server_code.bat` / `port_server_code.js` — copy and adapt server code from `CODE/SERVER` into the target folder.
- `port_client_code.bat` / `port_client_code.js` — copy and adapt UI from `CODE/CLIENT` and `CODE/ADMIN` into the target folder.

Both JS scripts require a target folder argument (relative to `TOOL`, or absolute):

```bat
node port_server_code.js ../SITE
node port_client_code.js ../SITE
```

The `.bat` files pass `../SITE` by default.

## Do not hand-edit (regenerated)

- `src/lib/service`, `src/lib/base`, `src/lib/controller`, `src/lib/kit_http.ts`, `src/types`
- `src/routes/api/**`
- `src/client/**`, `src/admin/**`
- Generated `+page.svelte` / `+page.server.ts` under `src/routes/(app)` and `src/routes/admin`

## Seeded once if missing (not overwritten if present)

- `src/routes/+layout.svelte`
- `src/routes/(app)/+layout.svelte`
- `src/routes/admin/+layout.svelte`

## Run order

1. `yarn install` in the target folder (e.g. `CODE/SITE`)
2. `CODE/TOOL/port_server_code.bat`
3. `CODE/TOOL/port_client_code.bat`
4. Copy `.env.example` to `.env` and fill values (or reuse `SERVER/.env`)
5. `yarn dev` (port 8000)
