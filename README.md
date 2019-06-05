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

    |      key      | value | required |
    | :-----------: | :---: | :------: |
    | Authorization | token |    O     |

## Auth

### Register

- POST `/auth/register`

- Params

  |   name   |     type     | required |
  | :------: | :----------: | :------: |
  |   name   | VARCHAR(255) |          |
  |  email   | VARCHAR(255) |    O     |
  | password | VARCHAR(255) |    O     |
  |  image   | VARCHAR(255) |          |

- Request

  ```js
  axios.post("/auth/register", {
    name: "cjkim",
    email: "icemonk1202@gmail.com",
    password: "1234",
    image: "https://vuejs.org/images/logo.png",
  })

  // or

  axios({
    method: "POST",
    url: "/auth/register",
    data: {
      name: "cjkim",
      email: "icemonk1202@gmail.com",
      password: "1234",
      image: "https://vuejs.org/images/logo.png",
    },
  })
  ```

- Response

  ```js
  {
    ok: true
  }
  ```

### Login

- POST `/auth/login`

- Params

  |   name   |     type     | required |
  | :------: | :----------: | :------: |
  |  email   | VARCHAR(255) |    O     |
  | password | VARCHAR(255) |    O     |

- Request

  ```js
  axios.post("/auth/login", {
    email: "icemonk1202@gmail.com",
    password: "1234",
  })

  // or

  axios({
    method: "POST",
    url: "/auth/login",
    data: {
      email: "icemonk1202@gmail.com",
      password: "1234",
    },
  })
  ```

- Response

  ```js
  {
    ok: true,
    data: {
      user: {
        id: 1,
        email: "a@b.c",
        password: "d",
        name: "test",
        image: "",
        createdAt: "2019-05-10T00:00:00.000Z",
        updatedAt: "2019-05-10T00:00:00.000Z"
      },
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhQGIuYyIsInBhc3N3b3JkIjoiZCIsIm5hbWUiOiJ0ZXN0IiwiaW1hZ2UiOiIiLCJjcmVhdGVkQXQiOiIyMDE5LTA1LTEwVDAwOjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE5LTA1LTEwVDAwOjAwOjAwLjAwMFoiLCJpYXQiOjE1NTc4MTI2ODAsImV4cCI6MTU1NzgxNDQ4MH0.2zkzgfklOx-yGz4NC_Z9iQIWLdUqgq81rMa7sBTN-GY"
    }
  }
  ```

### Logout

- GET `/auth/logout`

- Request

  ```js
  axios.get("/auth/logout", {
    headers: {
      Authorization: "$TOKEN",
    },
  })

  // or

  axios({
    method: "GET",
    url: "/auth/logout",
    headers: {
      Authorization: "$TOKEN",
    },
  })
  ```

- Response

  ```js
  {
    ok: true
  }
  ```

---

## User

### User list

- GET `/user`

- Request

  ```js
  axios.get("/user", {
    headers: {
      Authorization: "$TOKEN",
    },
  })

  // or

  axios({
    method: "GET",
    url: "/user",
    headers: {
      Authorization: "$TOKEN",
    },
  })
  ```

- Response

  ```js
  {
    ok: true,
    data: [
      {
        id: 1,
        email: "a@b.c",
        name: "test",
        image: "",
        createdAt: "2019-02-02T12:00:00.000Z",
        updatedAt: "2019-02-02T12:00:00.000Z"
      },
      {
        id: 2,
        email: "test@test.com",
        name: "test2",
        image: null,
        createdAt: "2019-02-02T12:00:00.000Z",
        updatedAt: "2019-02-02T12:00:00.000Z"
      }
    ]
  }
  ```

## My user info

- GET `/user/me`

- Request

  ```js
  axios.get("/user/me", {
    headers: {
      Authorization: "$TOKEN",
    },
  })

  // or

  axios({
    method: "GET",
    url: "/user/me",
    headers: {
      Authorization: "$TOKEN",
    },
  })
  ```

- Response
  ```js
  {
    ok: true,
    data: {
      id: 1,
      email: "a@b.c",
      name: "test",
      image: "",
      createdAt: "2019-02-02T12:00:00.000Z",
      updatedAt: "2019-02-02T12:00:00.000Z"
    }
  }
  ```

---

## Board

### Board list

- GET `/board`

- Request

  ```js
  axios.get("/board", {
    headers: {
      Authorization: "$TOKEN",
    },
  })

  // or

  axios({
    method: "GET",
    url: "/board",
    headers: {
      Authorization: "$TOKEN",
    },
  })
  ```

- Response

  ```js
  {
    ok: true,
    data: [
      {
        id: 1,
        title: "ceppro",
        isArchived: false,
        createdAt: "2019-02-02T12:00:00.000Z",
        updatedAt: "2019-02-02T12:00:00.000Z"
      },
      {
        id: 2,
        title: "deepstack",
        isArchived: false,
        createdAt: "2019-02-02T12:00:00.000Z",
        updatedAt: "2019-02-02T12:00:00.000Z"
      },
      {
        id: 3,
        title: "trello",
        isArchived: false,
        createdAt: "2019-02-02T12:00:00.000Z",
        updatedAt: "2019-02-02T12:00:00.000Z"
      }
    ]
  }
  ```

### Board info

- GET `/board/:boardId`

- Request

  ```js
  axios.get("/board/1", {
    headers: {
      Authorization: "$TOKEN",
    },
  })

  // or

  axios({
    method: "GET",
    url: "/board/1",
    headers: {
      Authorization: "$TOKEN",
    },
  })
  ```

* Response
  ```js
  {
    ok: true,
    data: {
      id: 1,
      title: "ceppro",
      isArchived: false,
      createdAt: "2019-02-02T12:00:00.000Z",
      updatedAt: "2019-02-02T12:00:00.000Z",
      lists: [
        {
          id: 3,
          title: "List1",
          order: 0,
          createdAt: "2010-12-12T12:12:12.000Z",
          updatedAt: "2010-12-12T12:12:12.000Z",
          boardId: 1,
          cards: [
            {
              id: 1,
              title: "card1",
              content: "cardtestsetsetes",
              order: 0,
              isArchived: false,
              createdAt: "2010-12-12T12:12:12.000Z",
              updatedAt: "2010-12-12T12:12:12.000Z",
              listId: 3,
              replies: [
                {
                  id: 2,
                  content: "댓글1",
                  createdAt: "2019-02-02T12:00:00.000Z",
                  updatedAt: "2019-02-02T12:00:00.000Z",
                  cardId: 1,
                  userId: 1
                },
                {
                  id: 3,
                  content: "fejwioqfjqweio",
                  createdAt: "2019-02-02T12:00:00.000Z",
                  updatedAt: "2019-02-02T12:00:00.000Z",
                  cardId: 1,
                  userId: 1
                }
              ]
            },
            {
              id: 2,
              title: "card2",
              content: "fjweiofjq",
              order: 1,
              isArchived: false,
              createdAt: "2010-12-12T12:12:12.000Z",
              updatedAt: "2010-12-12T12:12:12.000Z",
              listId: 3,
              replies: []
            }
          ]
        },
        {
          id: 4,
          title: "List2",
          order: 1,
          createdAt: "2010-12-12T12:12:12.000Z",
          updatedAt: "2010-12-12T12:12:12.000Z",
          boardId: 1,
          cards: []
        }
      ],
      members: [
        {
          id: 1,
          position: "USER",
          boardId: 1,
          userId: 1,
          user: {
            id: 1,
            email: "a@b.c",
            password: "d",
            name: "test",
            image: "",
            createdAt: "2019-02-02T12:00:00.000Z",
            updatedAt: "2019-02-02T12:00:00.000Z"
          }
        }
      ]
    }
  }
  ```

### Create board

- POST `/board`

- Params

  |    name    |     type     | required |  default   |
  | :--------: | :----------: | :------: | :--------: |
  |   title    | VARCHAR(255) |    O     |            |
  | isArchived |  TINYINT(1)  |          | false or 0 |

- Request

  ```js
  axios.post(
    "/board",
    {
      title: "My Board",
    },
    {
      headers: {
        Authorization: "$TOKEN",
      },
    },
  )

  // or

  axios({
    method: "POST",
    url: "/board",
    data: {
      title: "My Board",
    },
    headers: {
      Authorization: "$TOKEN",
    },
  })
  ```

- Response

  ```js
  {
    ok: true,
  }
  ```

### Update board

- PATCH `/board/:boardId`

- Params

  |    name    |     type     |
  | :--------: | :----------: |
  |   title    | VARCHAR(255) |
  | isArchived |  TINYINT(1)  |

- Request

  ```js
  axios.patch(
    "/board/1",
    {
      title: "My Board",
    },
    {
      headers: {
        Authorization: "$TOKEN",
      },
    },
  )

  // or

  axios({
    method: "patch",
    url: "/board/1",
    data: {
      title: "My Board",
    },
    headers: {
      Authorization: "$TOKEN",
    },
  })
  ```

- Response
  ```js
  {
    ok: true,
  }
  ```

---

## List

---

## Card

---

## Member
