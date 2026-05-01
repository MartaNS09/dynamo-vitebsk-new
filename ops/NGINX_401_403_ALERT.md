# Nginx 401/403 Alert (VPS)

Дата: 2026-05-01  
Сервер: 194.62.19.203

## Скрипт
- `/usr/local/bin/dynamo-nginx-401-403-watch.sh`

## Назначение
Отслеживает всплески `401/403` (сканирование, brute-force, боты) в `nginx access.log` и отправляет критичный алерт при превышении порога.

В критичное сообщение добавляются топ IP-источники.

## Параметры
- `WINDOW_MINUTES` (по умолчанию `5`) — окно анализа в минутах;
- `THRESHOLD` (по умолчанию `60`) — порог суммарных `401/403` за окно;
- `TOP_IPS_LIMIT` (по умолчанию `5`) — сколько IP включать в сообщение.

## Логика
- если `401/403 >= THRESHOLD` -> состояние `ALERT`, отправка `CRIT` при переходе `OK -> ALERT`;
- если `401/403 < THRESHOLD` -> состояние `OK`, отправка `INFO` при переходе `ALERT -> OK`;
- состояние хранится в `/var/lib/dynamo-nginx-401-403.state`.

## Cron
- `*/5 * * * * /usr/local/bin/dynamo-nginx-401-403-watch.sh >> /var/log/dynamo-nginx-401-403.log 2>&1`

## Тестовый запуск
- `WINDOW_MINUTES=5 THRESHOLD=1 TOP_IPS_LIMIT=5 /usr/local/bin/dynamo-nginx-401-403-watch.sh`

## Логи и state
- `/var/log/dynamo-nginx-401-403.log`
- `/var/lib/dynamo-nginx-401-403.state`
