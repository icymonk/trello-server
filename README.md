# Trello Server

## Run server

### Install Dependencies

```sh
npm install
```

### Run Development Server

```sh
npm run dev
```

### Run Production Server

```sh
npm run start
```

---

## Request

- 회원가입, 로그인을 제외한 모든 요청에 Access Token 포함 필수
  - Headers
    | key | value | isRequired |
    |:---:|:---:|:---:|
    | Authorization | token | O |
    |||||

## Auth

- POST `/auth/register`

  - Params
    | name | type | isRequired |
    |:---:|:---:|:---:|
    | name | VARCHAR(255) | |
    | email | VARCHAR(255) | O |
    | password | VARCHAR(255) | O |
    | image | VARCHAR(255) | |
    |||||

  - Response

    ```js
    {
      "ok": true,
      "data": {
        "user": {
          "id": 1,
          "email": "a@b.c",
          "password": "d",
          "name": "test",
          "image": "",
          "createdAt": "2019-05-10T00:00:00.000Z",
          "updatedAt": "2019-05-10T00:00:00.000Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhQGIuYyIsInBhc3N3b3JkIjoiZCIsIm5hbWUiOiJ0ZXN0IiwiaW1hZ2UiOiIiLCJjcmVhdGVkQXQiOiIyMDE5LTA1LTEwVDAwOjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE5LTA1LTEwVDAwOjAwOjAwLjAwMFoiLCJpYXQiOjE1NTc4MTI2ODAsImV4cCI6MTU1NzgxNDQ4MH0.2zkzgfklOx-yGz4NC_Z9iQIWLdUqgq81rMa7sBTN-GY"
      }
    }
    ```

- POST `/auth/login`

  - Params
    | name | type | isRequired |
    |:---:|:---:|:---:|
    | email | VARCHAR(255) | O |
    | password | VARCHAR(255) | O |
    |||||

  - Response

    ```js
    {
      "ok": true,
      "data": {
        "id": 1,
        "email": "a@b.c",
        "name": "test",
        "image": "",
        "createdAt": "2019-05-10T00:00:00.000Z",
        "updatedAt": "2019-05-10T00:00:00.000Z"
      }
    }
    ```

- GET `/auth/logout`

  - Response

    ```js
    {
      ok: true
    }
    ```

---

## User

- GET `/user`

  - Response
    ```js
    {
      "ok": true,
      "data": [
        {
          "id": 1,
          "email": "a@b.c",
          "name": "test",
          "image": "",
          "createdAt": "2019-02-02T12:00:00.000Z",
          "updatedAt": "2019-02-02T12:00:00.000Z"
        },
        {
          "id": 2,
          "email": "test@test.com",
          "name": "test2",
          "image": null,
          "createdAt": "2019-02-02T12:00:00.000Z",
          "updatedAt": "2019-02-02T12:00:00.000Z"
        }
      ]
    }
    ```

- GET `/user/me`

  - Response
    ```js
    {
      "ok": true,
      "data": {
        "id": 1,
        "email": "a@b.c",
        "name": "test",
        "image": "",
        "createdAt": "2019-02-02T12:00:00.000Z",
        "updatedAt": "2019-02-02T12:00:00.000Z"
      }
    }
    ```

---

## Board

- GET `/board`

  - Response
    ```js
    {
      "ok": true,
      "data": [
        {
          "id": 1,
          "title": "ceppro",
          "isArchived": false,
          "createdAt": "2019-02-02T12:00:00.000Z",
          "updatedAt": "2019-02-02T12:00:00.000Z"
        },
        {
          "id": 2,
          "title": "deepstack",
          "isArchived": false,
          "createdAt": "2019-02-02T12:00:00.000Z",
          "updatedAt": "2019-02-02T12:00:00.000Z"
        },
        {
          "id": 3,
          "title": "trello",
          "isArchived": false,
          "createdAt": "2019-02-02T12:00:00.000Z",
          "updatedAt": "2019-02-02T12:00:00.000Z"
        }
      ]
    }
    ```

- GET `/board/:boardId`
  - Response
    ```js
    {
      "ok": true,
      "data": {
        "id": 1,
        "title": "ceppro",
        "isArchived": false,
        "createdAt": "2019-02-02T12:00:00.000Z",
        "updatedAt": "2019-02-02T12:00:00.000Z",
        "lists": [
          {
            "id": 3,
            "title": "List1",
            "order": 0,
            "createdAt": "2010-12-12T12:12:12.000Z",
            "updatedAt": "2010-12-12T12:12:12.000Z",
            "boardId": 1,
            "cards": [
              {
                "id": 1,
                "title": "card1",
                "content": "cardtestsetsetes",
                "order": 0,
                "isArchived": false,
                "createdAt": "2010-12-12T12:12:12.000Z",
                "updatedAt": "2010-12-12T12:12:12.000Z",
                "listId": 3,
                "replies": [
                  {
                    "id": 2,
                    "content": "댓글1",
                    "createdAt": "2019-02-02T12:00:00.000Z",
                    "updatedAt": "2019-02-02T12:00:00.000Z",
                    "cardId": 1,
                    "userId": 1
                  },
                  {
                    "id": 3,
                    "content": "fejwioqfjqweio",
                    "createdAt": "2019-02-02T12:00:00.000Z",
                    "updatedAt": "2019-02-02T12:00:00.000Z",
                    "cardId": 1,
                    "userId": 1
                  }
                ]
              },
              {
                "id": 2,
                "title": "card2",
                "content": "fjweiofjq",
                "order": 1,
                "isArchived": false,
                "createdAt": "2010-12-12T12:12:12.000Z",
                "updatedAt": "2010-12-12T12:12:12.000Z",
                "listId": 3,
                "replies": []
              }
            ]
          },
          {
            "id": 4,
            "title": "List2",
            "order": 1,
            "createdAt": "2010-12-12T12:12:12.000Z",
            "updatedAt": "2010-12-12T12:12:12.000Z",
            "boardId": 1,
            "cards": []
          }
        ],
        "members": [
          {
            "id": 1,
            "position": "USER",
            "boardId": 1,
            "userId": 1,
            "user": {
              "id": 1,
              "email": "a@b.c",
              "password": "d",
              "name": "test",
              "image": "",
              "createdAt": "2019-02-02T12:00:00.000Z",
              "updatedAt": "2019-02-02T12:00:00.000Z"
            }
          }
        ]
      }
    }
    ```

---

## List

---

## Card

---

## Member
