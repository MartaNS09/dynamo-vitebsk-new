# Health Watchdog (VPS)

Дата: 2026-05-01  
Сервер: 194.62.19.203

## Скрипт
- `/usr/local/bin/dynamo-health-watchdog.sh`

## Назначение
Проверяет доступность frontend и backend, выполняет авто-восстановление через `pm2 restart`, отправляет оповещения в Telegram/email через `/usr/local/bin/dynamo-alert.sh`.

Проверяемые endpoint'ы:
- frontend: `http://127.0.0.1:3000/`
- backend: `http://127.0.0.1:4000/sections`

## Логика
- если оба endpoint отвечают `200` -> запись `OK` в лог, без алерта;
- если есть сбой -> перезапуск `dynamo-frontend` и `dynamo-backend` через PM2;
- после перезапуска:
  - если восстановилось -> запись `HEALED` + алерт `INFO`;
  - если не восстановилось -> запись `FAIL` + алерт `CRIT`.

## Cron
- `*/2 * * * * /usr/local/bin/dynamo-health-watchdog.sh >> /var/log/dynamo-health-cron.log 2>&1`

## Тестовый запуск
- `/usr/local/bin/dynamo-health-watchdog.sh`

## Логи
- `/var/log/dynamo-health.log`
- `/var/log/dynamo-health-cron.log`
