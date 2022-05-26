# SwipeCardsApp

## Running the project

### Starting the server

`$ npm run server`

### Starting the client

`$ ng serve`

Open the browser access port: http://localhost:4200/

## API documentation

### Get Recommended Persons:

**URI**: http://localhost:5000/recommendations
**HTTP Method:** GET
**Example request:**

```
curl -X GET \
  'http://localhost:5000/recommendations' \
  -H 'cache-control: no-cache'
```

**Example response:**

```
[
  {
    "name": "Carrie",
    "id": 1,
    "age": 21
  },
  {
    "name": "Samantha",
    "id": 2,
    "age": 23
  },
  {
    "name": "Charlotte",
    "id": 3,
    "age": 25
  },
  {
    "name": "Miranda",
    "id": 4,
    "age": 27
  }
]
```

### Get Matches:

**URI**: http://localhost:5000/matches/{slug}
**HTTP Method:** GET
**Request parametres:**
Parameter name | Type | Description
--- | --- | ---
slug | number | Person ID

**Example request:**

```
curl -X GET \
  'http://localhost:5000/matches/1' \
  -H 'cache-control: no-cache'
```

**Example response:**

```
{
  "id": 1,
  "likedBy": [2, 3]
}
```
