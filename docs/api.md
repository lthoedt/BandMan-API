MusicMan API Documentation
==========================

# Requests

## Musician

### Create a musician
---
```http
POST /musicians
```
`Request body`
```json
{
    "name": {
        "firstname": String,
        "insertion": String,
        "lastname": String
    },
    "dateOfBirth": "yyyy-mm-dd"
}
```
---