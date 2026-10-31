# Troubleshooting chat logging

| Symptom | Cause | Fix |
|---|---|---|
| `curl` to `/exec` returns 401 + login HTML | Web app access not "Anyone" | Redeploy with Who has access: Anyone |
| `{"ok":false,"error":"unauthorized"}` on real requests | `LOG_SECRET` mismatch | Align Script property and `wrangler secret put LOG_SECRET` |
| `wrangler tail`: "Apps Script error <status>" | Wrong/old `APPS_SCRIPT_URL` secret | `npx wrangler secret put APPS_SCRIPT_URL` |
| No `/log` request in tail | Site not deployed or `NEXT_PUBLIC_CHAT_API_URL` missing | Push `main`; set `.env.local` for local runs |
| 403 from Worker | Origin not in `ALLOWED_ORIGINS` (`worker/wrangler.toml`) | Add the origin (allowlist includes `https://wleopach.github.io`) |
| Row appears, no email | Mail scope not authorized | Re-run/authorize in Apps Script editor |
| `getActiveSpreadsheet()` null | Script not bound to the Sheet | Create it via Extensions -> Apps Script from the Sheet |
