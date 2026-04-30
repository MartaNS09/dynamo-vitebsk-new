# Ops Health Watchdog (VPS)

Date: 2026-05-01
Server: 194.62.19.203

## Installed watchdog
- Script: `/usr/local/bin/dynamo-health-watchdog.sh`
- Checks every run:
  - `http://127.0.0.1:3000/` (frontend)
  - `http://127.0.0.1:4000/sections` (backend)
- Success log: `/var/log/dynamo-health.log`
- Cron log: `/var/log/dynamo-health-cron.log`

## Self-heal behavior
1. If both checks return `200`: writes `OK` and exits.
2. If any check fails:
   - runs `pm2 restart dynamo-frontend`
   - runs `pm2 restart dynamo-backend`
   - waits 5s and rechecks
3. If recovered: writes `HEALED`.
4. If still failing: writes `FAIL` and exits with non-zero code.

## Cron schedule
Added to root crontab:
- `*/2 * * * * /usr/local/bin/dynamo-health-watchdog.sh >> /var/log/dynamo-health-cron.log 2>&1`

## Existing backup cron (unchanged)
- `15 3 * * * /usr/local/bin/dynamo-backup-postgres.sh >> /var/log/dynamo-backup.log 2>&1`

## Quick checks
- `tail -n 50 /var/log/dynamo-health.log`
- `tail -n 50 /var/log/dynamo-health-cron.log`
- `pm2 ls`
- `curl -I http://127.0.0.1:3000/`
- `curl -I http://127.0.0.1:4000/sections`