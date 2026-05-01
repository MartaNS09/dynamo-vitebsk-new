# Restore Runbook (VPS)

Дата: 2026-05-01  
Сервер: 194.62.19.203

## Цель
Восстановить frontend, backend и базу данных после аварии с минимальной потерей данных.

## Предусловия
- Есть SSH-доступ на VPS под root.
- Репозитории доступны для `git pull`.
- Доступны backup'ы:
  - БД: `/var/backups/dynamo-postgres`
  - конфиги: `/var/backups/dynamo-config`
- Известны актуальные секреты (`.env`, токены, SMTP, JWT).

## 1) Проверка и подготовка
```bash
ssh root@194.62.19.203
df -h
free -m
pm2 status
```

Если сервер полностью новый:
- установить Node.js, npm, PM2, PostgreSQL, Nginx;
- создать рабочие директории:
  - `/var/www/dynamo-vitebsk-new`
  - `/var/www/dynamo-backend`

## 2) Восстановление кода из git
Frontend:
```bash
cd /var/www/dynamo-vitebsk-new
git fetch --all
git checkout main
git pull origin main
```

Backend:
```bash
cd /var/www/dynamo-backend
git fetch --all
git checkout main
git pull origin-vps main
```

## 3) Восстановление конфигов из config backup
Показать доступные архивы:
```bash
ls -1t /var/backups/dynamo-config | head
```

Распаковать последний архив во временную папку:
```bash
mkdir -p /root/restore-config
tar -xzf /var/backups/dynamo-config/dynamo-config-YYYY-MM-DD_HH-MM-SS.tar.gz -C /root/restore-config
```

Восстановить нужные директории/файлы (пример):
```bash
cp -a /root/restore-config/YYYY-MM-DD_HH-MM-SS/etc/nginx /etc/
cp -a /root/restore-config/YYYY-MM-DD_HH-MM-SS/etc/cron.d /etc/ || true
cp -a /root/restore-config/YYYY-MM-DD_HH-MM-SS/usr/local/bin/dynamo-* /usr/local/bin/
chmod +x /usr/local/bin/dynamo-*.sh
```

Важно:
- `*.sanitized` файлы не содержат секретов, это только шаблоны.
- Реальные секреты нужно вручную восстановить в:
  - `/etc/dynamo-alert.env`
  - `/var/www/dynamo-vitebsk-new/.env.local`
  - `/var/www/dynamo-backend/.env`

## 4) Восстановление базы данных PostgreSQL
Показать последние backup'ы:
```bash
ls -1t /var/backups/dynamo-postgres | head
```

Пример восстановления в рабочую БД:
```bash
export DATABASE_URL="postgresql://USER:PASSWORD@127.0.0.1:5432/DBNAME"
gunzip -c /var/backups/dynamo-postgres/postgres_YYYY-MM-DD_HH-MM-SS.sql.gz | psql "$DATABASE_URL"
```

Проверка:
```bash
psql "$DATABASE_URL" -c "SELECT now();"
```

## 5) Сборка и запуск приложений
Frontend:
```bash
cd /var/www/dynamo-vitebsk-new
npm ci --no-audit --no-fund
npm run build
pm2 restart dynamo-frontend || pm2 start npm --name dynamo-frontend -- start -- -H 127.0.0.1 -p 3000
```

Backend:
```bash
cd /var/www/dynamo-backend
npm ci --no-audit --no-fund
npm run build
pm2 restart dynamo-backend || pm2 start dist/main.js --name dynamo-backend
```

Сохранить PM2:
```bash
pm2 save
pm2 status
```

## 6) Проверки после восстановления
Локальные health-check:
```bash
curl -I http://127.0.0.1:3000/
curl -I http://127.0.0.1:4000/sections
```

Проверки логов:
```bash
tail -n 100 /var/log/dynamo-health.log
tail -n 100 /var/log/dynamo-backup-cron.log
tail -n 100 /var/log/dynamo-config-backup-cron.log
tail -n 100 /var/log/dynamo-digest-cron.log
```

Проверки вручную:
- открывается публичный сайт;
- работает вход в админку;
- отображаются SEO страницы и страницы отделений;
- доступны ключевые API backend.

## 7) Включение/проверка cron задач
```bash
crontab -l
```

Ожидаемые задачи:
- watchdog (`*/2 * * * *`)
- nginx 5xx watcher (`*/5 * * * *`)
- nginx 401/403 watcher (`*/5 * * * *`)
- backup БД (`10 */6 * * *`)
- backup конфигов (`20 8 * * *`)
- daily digest (`10 8 * * *`)

## 8) Финальный чек-лист
- `git status` чистый в `/var/www/dynamo-vitebsk-new` и `/var/www/dynamo-backend`;
- оба сервиса в `pm2 status` имеют `online`;
- frontend/backend отвечают `200`;
- алерт-каналы (Telegram/email) получают тестовое сообщение;
- создана новая точка backup БД после восстановления.

## 9) Журнал restore-тестов
- **2026-05-01** (тестовый restore в отдельную БД, без влияния на прод):
  - backup: `postgres_2026-05-01_12-10-01.sql.gz`
  - результат: `restore:ok`
  - таблиц в `public`: `9`
  - ключевые таблицы: `4/4` (`AdminUser`, `Application`, `SeoData`, `SportSection`)
  - оценка строк: `AdminUser=3`, `Application=0`, `SeoData=40`, `SportSection=11`
  - cleanup: временная БД удалена после проверки
