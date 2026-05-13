## Документация по API
### Архитектура HTTP-клиента
Для взаимодействия с бэкендом используется библиотека `axios`. Конфигурация клиента поддерживает **динамическое определение окружения** (Environment Agnostic).

### Сервисы и методы:

#### `videoService`
* `getVideoStreamUrl(id)` — Формирует прямой URL-адрес для потокового плеера Video.js.
* `getVideos()` — `GET /videos/` — Получение списка всех доступных роликов.
* `uploadVideo(formData)` — `POST /videos/upload/` — Асинхронная отправка медиафайла с заголовком `multipart/form-data`.

#### `authService`
* `register(userData)` — `POST /register/` — Регистрация нового пользователя платформы.
* `requestCode(email)` — `POST /request-code/` — Запрос одноразового кода подтверждения на Email.