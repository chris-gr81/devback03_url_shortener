# URL Shortener (Node.js + Express)

A small demo project implementing a simple URL shortener using
**Node.js**, **Express**, and **TypeScript**.

The application allows users to create short IDs for long URLs and
redirect to the original address.\
All mappings are stored in a local JSON file, acting as a lightweight
file-based database.

---

## Features

- Create short URLs
- Redirect using the short ID
- Update existing mappings
- Delete mappings
- Input validation using TypeScript guards
- Custom error handling with HTTP status codes
- File-based persistence (`urlmap.json`)

---

## API Endpoints

### Create Short URL

**POST /shorten**

Request body:

```json
{
  "longUrl": "https://example.com"
}
```

Response:

```json
{
  "shortId": "abc123"
}
```

---

### Redirect to Original URL

**GET /:shortId**

Redirects the user to the stored long URL.

Example:

    GET /abc123

---

### Update Existing URL

**PUT /:shortId**

Request body:

```json
{
  "longUrl": "https://new-url.com"
}
```

Replaces the stored URL and updates the timestamp.

---

### Delete Short URL

**DELETE /:shortId**

Deletes the mapping for the given short ID.

Response:

    204 No Content

---

## Storage

The application uses a simple JSON file located at:

    /db/urlmap.json

Data is loaded into memory when the server starts and written back to
the file whenever changes occur.

---

## Project Structure

    src
    ├─ controller
    ├─ service
    ├─ db
    ├─ util
    ├─ error

---

## Notes

This project is intended as a **learning exercise** demonstrating:

- Express routing
- TypeScript guards (`asserts`)
- Custom error classes
- Simple persistence without a database
