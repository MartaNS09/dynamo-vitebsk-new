# Ежедневный операционный дайджест (VPS)

Date: 2026-05-01
Server: 194.62.19.203

## Скрипт
- `/usr/local/bin/dynamo-daily-digest.sh`

## Назначение
Отправляет ежедневную сводку в текущие каналы оповещений (Telegram + email) через `/usr/local/bin/dynamo-alert.sh`.

Дайджест содержит:
- количество `OK` у health watchdog
- количество `HEALED`
- количество `FAIL`
- количество критичных переходов по nginx `5xx` (`CRIT`)
- количество критичных переходов по nginx `401/403` (`CRIT`)

## Источники данных
- `/var/log/dynamo-health.log`
- `/var/log/dynamo-nginx-5xx.log`
- `/var/log/dynamo-nginx-401-403.log`

## Cron
- `10 8 * * * /usr/local/bin/dynamo-daily-digest.sh >> /var/log/dynamo-digest-cron.log 2>&1`

## Тестовый запуск
- `SINCE_HOURS=1 /usr/local/bin/dynamo-daily-digest.sh`

## Логи
- `/var/log/dynamo-digest.log`
- `/var/log/dynamo-digest-cron.log`