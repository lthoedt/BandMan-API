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
    "firstname": String,
    "insertion": String,
    "lastname": String,
    "dateOfBirth": "yyyy-mm-dd",
    "email": String,
    "password": String (hashed)
}
```
`Reponse body`
```json
{
    "success": boolean,
    "musician": {
        "type": "Musician",
        "name": {
            "firstname": String,
            "insertion": String,
            "lastname": String
        },
        "dateOfBirth": "yyyy-mm-dd",
        "email": String,
        "id": String
    }
}

```
---

### Login musician
---
```http
GET /musicians/login
```
`Request body`
```json
{
    "email": String,
    "password": String (hashed)
}
```
`Reponse body`
```json
{
    "success": boolean,
    "musician": {
        "type": "Musician",
        "name": {
            "firstname": String,
            "insertion": String,
            "lastname": String
        },
        "dateOfBirth": "yyyy-mm-dd",
        "email": String,
        "id": String
    }
}
```
---

## SongVoteList
### Create
---
```http
POST /songvotelist
```
`Request body`
```json
{
    "endDate": Date,
    "bandId": string
}
```
`Reponse body`
```json
{
    "success": boolean,
    "songVoteList": {
        "type": "SongVoteList",
        "creationDate": "yyyy-mm-dd",
        "endDate": "yyyy-mm-dd",
        "id": String
    }
}
```
---