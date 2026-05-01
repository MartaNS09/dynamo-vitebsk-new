# Nginx 5xx Alert (VPS)

Дата: 2026-05-01  
Сервер: 194.62.19.203

## Скрипт
- `/usr/local/bin/dynamo-nginx-5xx-watch.sh`

## Назначение
Отслеживает всплеск HTTP-ошибок `5xx` в `nginx access.log` за короткое окно и отправляет критичный алерт при превышении порога.

При возврате к норме отправляется информационный алерт.

## Параметры
- `WINDOW_MINUTES` (по умолчанию `5`) — окно анализа в минутах;
- `THRESHOLD` (по умолчанию `20`) — порог количества `5xx` за окно.

## Логика
- если `5xx >= THRESHOLD` -> состояние `ALERT`, отправка `CRIT` при переходе `OK -> ALERT`;
- если `5xx < THRESHOLD` -> состояние `OK`, отправка `INFO` при переходе `ALERT -> OK`;
- состояние хранится в `/var/lib/dynamo-nginx-5xx.state`, чтобы избежать спама.

## Cron
- `*/5 * * * * /usr/local/bin/dynamo-nginx-5xx-watch.sh >> /var/log/dynamo-nginx-5xx.log 2>&1`

## Тестовый запуск
- `WINDOW_MINUTES=5 THRESHOLD=1 /usr/local/bin/dynamo-nginx-5xx-watch.sh`

## Логи и state
- `/var/log/dynamo-nginx-5xx.log`
- `/var/lib/dynamo-nginx-5xx.state`
