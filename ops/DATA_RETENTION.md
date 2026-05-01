# Data Retention (VPS)

Дата: 2026-05-01  
Сервер: 194.62.19.203

## Скрипт анонимизации заявок
- `/usr/local/bin/dynamo-anonymize-applications.sh`

## Назначение
Автоматически анонимизирует персональные данные в старых заявках, чтобы снизить риски хранения ПДн дольше необходимого срока.

## Правило по умолчанию
- заявки старше `180` дней анонимизируются.

## Какие поля анонимизируются
В таблице `Application`:
- `name` -> `[ANONYMIZED]`
- `phone` -> `[ANONYMIZED]`
- `email` -> `NULL`
- `childAge` -> `NULL`
- `message` -> `NULL`
- `consentIp` -> `NULL`
- `consentUserAgent` -> `NULL`

Технические поля заявки (статус, секция, источник, даты) сохраняются для отчетности.

## Режимы запуска
- dry-run (только подсчет):  
  - `DRY_RUN=1 ANON_AFTER_DAYS=180 /usr/local/bin/dynamo-anonymize-applications.sh`
- рабочий запуск:  
  - `DRY_RUN=0 ANON_AFTER_DAYS=180 /usr/local/bin/dynamo-anonymize-applications.sh`

## Cron
- `35 2 * * * ANON_AFTER_DAYS=180 DRY_RUN=0 /usr/local/bin/dynamo-anonymize-applications.sh >> /var/log/dynamo-anonymize-cron.log 2>&1`

## Логи и проверка
- `tail -n 100 /var/log/dynamo-anonymize-cron.log`
- Проверка количества строк к анонимизации:
  - `DRY_RUN=1 ANON_AFTER_DAYS=180 /usr/local/bin/dynamo-anonymize-applications.sh`

## Примечание
Перед изменением срока хранения рекомендуется согласовать юридические требования и внутреннюю политику обработки ПДн.
