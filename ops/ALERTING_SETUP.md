# Alerting Setup (Email + Telegram)

Date: 2026-05-01
Server: 194.62.19.203

## Installed scripts
- `/usr/local/bin/dynamo-health-watchdog.sh`
- `/usr/local/bin/dynamo-alert.sh`

## Config file
- `/etc/dynamo-alert.env` (permissions: `600`)

Current defaults:
- `ALERT_EMAIL_TO="karelinseo@gmail.com"`
- `TG_CHAT_ID="8637192115"`
- `PROJECT_NAME="DYNAMO"`
- `ENV_NAME="PROD"`

## Required secrets to enable delivery
### Telegram
- `TG_BOT_TOKEN` from BotFather
- `TG_CHAT_ID` must be chat id supported by bot
  - for user chats, usually numeric id (not phone)
  - `@username` works for channels/supergroups when bot has access

### Email (Gmail SMTP)
- `SMTP_USER` (gmail account)
- `SMTP_PASS` (Google App Password, not regular password)
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=465`

## How to set secrets
Edit `/etc/dynamo-alert.env` and fill fields:
- `TG_BOT_TOKEN=...`
- `SMTP_USER=...`
- `SMTP_PASS=...`

Then test:
- `/usr/local/bin/dynamo-alert.sh "manual test" "INFO"`

## Alert format
Each alert is prefixed by project and environment:
- `[PROJECT_NAME][ENV_NAME][SEVERITY] message`
- Example: `[DYNAMO][PROD][CRIT] backend health failed`

## Trigger conditions
Watchdog runs every 2 minutes and:
- checks frontend and backend localhost health
- tries self-heal via `pm2 restart`
- sends alert on:
  - `HEALED` (INFO)
  - `FAIL` (CRIT)

## Logs
- `/var/log/dynamo-health.log`
- `/var/log/dynamo-health-cron.log`
- `/var/log/dynamo-alert.log`