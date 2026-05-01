# Security Baseline (VPS)

Дата: 2026-05-01  
Сервер: 194.62.19.203

## Что уже внедрено
- **Сетевой контур**
  - frontend и backend слушают `127.0.0.1`;
  - внешний доступ идет через Nginx reverse proxy.
- **Хостовая защита**
  - включен UFW (разрешены только необходимые порты);
  - настроен Fail2ban (как минимум jail для SSH).
- **Приложение (backend)**
  - включен `helmet`;
  - CORS ограничен конфигурацией `CORS_ORIGINS`;
  - выполнена ротация `JWT_SECRET`.
- **Надежность и мониторинг**
  - health watchdog с авто-восстановлением PM2;
  - алерты в Telegram и email;
  - детекторы всплесков Nginx: `5xx` и `401/403`;
  - ежедневный digest по инцидентам и состоянию.
- **Резервное копирование БД**
  - автоматические PostgreSQL backup'ы;
  - ротация по возрасту/количеству/размеру.

## Ключевые скрипты
- `/usr/local/bin/dynamo-alert.sh`
- `/usr/local/bin/dynamo-health-watchdog.sh`
- `/usr/local/bin/dynamo-nginx-5xx-watch.sh`
- `/usr/local/bin/dynamo-nginx-401-403-watch.sh`
- `/usr/local/bin/dynamo-daily-digest.sh`
- `/usr/local/bin/dynamo-backup-postgres.sh`

## Ключевые env-файлы
- `/etc/dynamo-alert.env` — каналы и SMTP для оповещений;
- backend `.env` — `JWT_SECRET`, `CORS_ORIGINS`, параметры БД.

## Проверки после изменений
- `pm2 status`
- `curl -I http://127.0.0.1:3000/`
- `curl -I http://127.0.0.1:4000/sections`
- `tail -n 50 /var/log/dynamo-health.log`
- `tail -n 50 /var/log/dynamo-nginx-5xx.log`
- `tail -n 50 /var/log/dynamo-nginx-401-403.log`
- `tail -n 50 /var/log/dynamo-digest.log`

## Что осталось (следующий этап)
- Настроить HTTPS (Let's Encrypt) и включить HSTS после финальной проверки DNS/домена.
