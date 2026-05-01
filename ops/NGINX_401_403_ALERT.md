# Nginx 401/403 Spike Alert (VPS)

Date: 2026-05-01
Server: 194.62.19.203

## Script
- `/usr/local/bin/dynamo-nginx-401-403-watch.sh`

## What it does
- Reads last `TAIL_LINES` lines from `/var/log/nginx/access.log` (default 2000).
- Counts HTTP `401` + `403` statuses.
- Compares with threshold `THRESHOLD_401_403` (default 60).
- Sends alert via `/usr/local/bin/dynamo-alert.sh` on state transitions:
  - `OK -> ALERT` (CRIT)
  - `ALERT -> OK` (INFO)
- In CRIT message includes top source IPs from the sample.
- Persists state in `/var/run/dynamo-nginx-401-403.state`.

## Cron
- `*/5 * * * * /usr/local/bin/dynamo-nginx-401-403-watch.sh >> /var/log/dynamo-nginx-401-403-cron.log 2>&1`

## Logs
- `/var/log/dynamo-nginx-401-403.log`
- `/var/log/dynamo-nginx-401-403-cron.log`

## Tunables
You can override in cron line:
- `TAIL_LINES`
- `THRESHOLD_401_403`

Example:
`*/5 * * * * THRESHOLD_401_403=30 TAIL_LINES=1000 /usr/local/bin/dynamo-nginx-401-403-watch.sh >> /var/log/dynamo-nginx-401-403-cron.log 2>&1`