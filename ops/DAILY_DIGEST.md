# Daily Ops Digest (VPS)

Date: 2026-05-01
Server: 194.62.19.203

## Script
- `/usr/local/bin/dynamo-daily-digest.sh`

## Purpose
Sends daily summary to existing alert channels (Telegram + email) using `/usr/local/bin/dynamo-alert.sh`.

Digest includes:
- health watchdog `OK` count
- `HEALED` count
- `FAIL` count
- nginx `5xx` alert transitions (`CRIT` count)
- nginx `401/403` alert transitions (`CRIT` count)

## Data sources
- `/var/log/dynamo-health.log`
- `/var/log/dynamo-nginx-5xx.log`
- `/var/log/dynamo-nginx-401-403.log`

## Cron
- `10 8 * * * /usr/local/bin/dynamo-daily-digest.sh >> /var/log/dynamo-digest-cron.log 2>&1`

## Test run
- `SINCE_HOURS=1 /usr/local/bin/dynamo-daily-digest.sh`

## Logs
- `/var/log/dynamo-digest.log`
- `/var/log/dynamo-digest-cron.log`