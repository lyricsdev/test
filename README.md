### Документация

#### Управление
Для выполнения запроса на создание предложения 
- `/api/makesuggestion` передача title и content предложения
```javascript
await ( await fetch("https://АДРЕС/api/makesuggestion", {
  "method": "POST",
  "body": JSON.stringify({
    "content": "Моё тестовое предложение",
    "title": "Тестовый Тайтл"
  }),
  "headers": {
    "Content-Type": "application/json"
  }
}) ).json()
```
Для голосования за опредленное предложение отправляем запрос на
- `/api/addvote` передача id предложения
```javascript
await ( await fetch("https://АДРЕС/api/addvote", {
  "method": "POST",
  "body": JSON.stringify({
    "id": 1
  }),
  "headers": {
    "Content-Type": "application/json"
  }
}) ).json()
```
- `/api/check/votes` - Получение оставшихся кол-во голосований на сегодня.
```javascript
await ( await fetch("https://АДРЕС/api/check/votes", {
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  }
}) ).json()
```
- `/api/check/suggestion` - Получение оставшихся попыток создания предложений на сегодня.
```javascript
await ( await fetch("https://АДРЕС/api/check/suggestion", {
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  }
}) ).json()
```
- `/api/admin/action/delete` Управление предложениями. передача id предложения, password = из конфига .env
```javascript
await ( await fetch("https://АДРЕС//api/admin/action/delete", {
  "method": "POST",
  "body": JSON.stringify({
    "password": "admin",
    "suggestionid": 1
  }),
  "headers": {
    "Content-Type": "application/json"
  }
}) ).json()
```
- `/api/admin/action/approve` Управление предложениями. передача id предложения, password = из конфига .env
```javascript
await ( await fetch("https://АДРЕС/api/admin/action/approve", {
  "method": "POST",
  "body": JSON.stringify({
    "password": "admin",
    "suggestionid": 1
  }),
  "headers": {
    "Content-Type": "application/json"
  }
}) ).json()
```
- `/api/admin/action/disapprove` Управление предложениями. передача id предложения, password = из конфига .env
```javascript
await ( await fetch("https://АДРЕС/api/admin/action/disapprove, {
  "method": "POST",
  "body": JSON.stringify({
    "password": "admin",
    "suggestionid": 1
  }),
  "headers": {
    "Content-Type": "application/json"
  }
}) ).json()

- `/api/getsuggestions` Возращает список всех предложений по кол-ву голосов в убывающем порядке.
```javascript
await ( await fetch("https://АДРЕС/api/getsuggestions, {
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  }
}) ).json()