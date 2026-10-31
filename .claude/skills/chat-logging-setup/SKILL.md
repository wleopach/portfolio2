---
name: chat-logging-setup
description: Set up, redeploy, or debug chatbot transcript logging (Worker -> Apps Script -> Google Sheet + email). Use when no conversation rows appear in the Sheet, the Apps Script URL changes, or after redeploying the Apps Script web app.
---

# Chat logging setup / debug

Pipeline: `ChatWidget` beacon -> Worker `/log` (`worker/src/index.ts` `handleLog`) -> Apps Script `/exec` (`apps-script/Code.gs`) -> Sheet row + email.

## Procedure

1. **Apps Script deployment (user, script.google.com).** Script must be opened from the Sheet (Extensions -> Apps Script). Deploy -> Manage deployments -> Edit -> Version: New version, Execute as: Me, Who has access: **Anyone** -> Deploy. Authorize Sheets and Mail scopes on first deploy. Confirm `LOG_SECRET` under Project Settings -> Script properties.
2. **Probe the URL** (harmless, wrong secret):
   `curl -s -L -w "\nHTTP %{http_code}\n" "<EXEC_URL>" -d '{"secret":"wrong"}'`
   - Expected: HTTP 200 `{"ok":false,"error":"unauthorized"}`.
   - HTTP 401 / Google login HTML: access is not "Anyone"; redo step 1.
3. **Update the URL if it changed.**
   - Local: edit `APPS_SCRIPT_URL` in `worker/.dev.vars`. Never print or copy the file's secrets into chat, commits, or skills; check with `grep -c <url-fragment>`.
   - Deployed: from `worker/`, `npx wrangler secret put APPS_SCRIPT_URL` (needs the user's Cloudflare login; applies immediately, no redeploy).
4. **Make sure the site is live.** `git status -sb` must not show `ahead`. `git push origin main` needs user credentials; then check Pages source is "GitHub Actions" and the Action passed.
5. **End-to-end test.** Open the live site, send a message, close the widget. Expect a "Conversations" row and an email to the notify address. A real test adds a row and sends an email, so ask before sending one yourself.
6. **Still failing?** Run `npx wrangler tail` in `worker/` while chatting. See [references/troubleshooting.md](references/troubleshooting.md).

## Gotchas
- The browser always gets 204 from `/log`; failures only show in the Worker logs.
- `LOG_SECRET` must match in Apps Script properties and the Worker secret.
- Local testing needs `NEXT_PUBLIC_CHAT_API_URL` in `.env.local` (e.g. `http://localhost:8787`).
