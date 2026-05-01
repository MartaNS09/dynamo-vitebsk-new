# Nginx 5xx Spike Alert (VPS)

Date: 2026-05-01
Server: 194.62.19.203

## Script
- `/usr/local/bin/dynamo-nginx-5xx-watch.sh`

## What it does
- Reads last `TAIL_LINES` lines from `/var/log/nginx/access.log` (default 2000).
- Counts HTTP 5xx statuses.
- Compares with threshold `THRESHOLD_5XX` (default 20).
- Sends alert via `/usr/local/bin/dynamo-alert.sh` on state transitions:
  - `OK -> ALERT` (CRIT)
  - `ALERT -> OK` (INFO)
- Persists state in `/var/run/dynamo-nginx-5xx.state`.

## Cron
- `*/5 * * * * /usr/local/bin/dynamo-nginx-5xx-watch.sh >> /var/log/dynamo-nginx-5xx-cron.log 2>&1`

## Logs
- `/var/log/dynamo-nginx-5xx.log`
- `/var/log/dynamo-nginx-5xx-cron.log`

## Tunables
You can override in cron line:
- `TAIL_LINES` (sample size)
- `THRESHOLD_5XX` (alert threshold)

Example:
`*/5 * * * * THRESHOLD_5XX=10 TAIL_LINES=1000 /usr/local/bin/dynamo-nginx-5xx-watch.sh >> /var/log/dynamo-nginx-5xx-cron.log 2>&1`