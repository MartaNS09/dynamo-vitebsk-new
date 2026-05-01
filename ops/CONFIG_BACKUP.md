# Config Backup (VPS)

Дата: 2026-05-01  
Сервер: 194.62.19.203

## Скрипт
- `/usr/local/bin/dynamo-backup-config.sh`

## Назначение
Создает архив критичных конфигураций сервера и приложения для ускоренного восстановления без отката всей VM.

Скрипт дополняет backup базы данных и VM snapshot'ы хостера.

## Что входит в backup
- nginx: `/etc/nginx`
- certbot renewal: `/etc/letsencrypt/renewal` (без приватных ключей)
- cron: `/etc/crontab`, `/etc/cron.d`
- systemd unit'ы: `/etc/systemd/system`
- SSH-конфиг root: `/root/.ssh/config`
- ops-скрипты:
  - `/usr/local/bin/dynamo-alert.sh`
  - `/usr/local/bin/dynamo-health-watchdog.sh`
  - `/usr/local/bin/dynamo-nginx-5xx-watch.sh`
  - `/usr/local/bin/dynamo-nginx-401-403-watch.sh`
  - `/usr/local/bin/dynamo-daily-digest.sh`
  - `/usr/local/bin/dynamo-backup-postgres.sh`
- PM2 snapshot: `/root/.pm2/dump.pm2` (если PM2 установлен)
- sanitized env-снимки:
  - `/etc/dynamo-alert.env.sanitized`
  - `/var/www/dynamo-vitebsk-new/.env.local.sanitized`
  - `/var/www/dynamo-backend/.env.sanitized`

## Защита секретов
Файлы `*.sanitized` создаются с маскированием значений для ключей, содержащих:
- `PASS`
- `PASSWORD`
- `SECRET`
- `TOKEN`
- `KEY`

## Папка хранения
- `/var/backups/dynamo-config`
- формат архива: `dynamo-config-YYYY-MM-DD_HH-MM-SS.tar.gz`

## Ротация
- по возрасту: `RETENTION_DAYS` (по умолчанию `30`)
- по количеству: `RETENTION_COUNT` (по умолчанию `30`)
- по общему размеру папки: `MAX_SIZE_MB` (по умолчанию `512`)

## Cron
- `20 8 * * * /usr/local/bin/dynamo-backup-config.sh >> /var/log/dynamo-config-backup-cron.log 2>&1`

## Тестовый запуск
- `/usr/local/bin/dynamo-backup-config.sh`

## Логи и проверка
- `ls -1t /var/backups/dynamo-config | head`
- `tail -n 100 /var/log/dynamo-config-backup-cron.log`
