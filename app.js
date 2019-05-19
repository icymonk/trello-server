const path = require("path")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const db = require("./models")
const passport = require("passport")

const express = require("express")
const app = express()

const auth = require("./routes/auth")
const user = require("./routes/user")
const board = require("./routes/board")
const list = require("./routes/list")
const card = require("./routes/card")
const member = require("./routes/member")
const JWTAuth = passport.authenticate("jwt", { session: false })
require("dotenv").config()
const env = process.env.NODE_ENV || "development"

db.sequelize.sync()

require("./config/passport")

app.use(morgan(env === "production" ? "default" : "dev"))
app.use(helmet())
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static("public"))

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "document.html")),
)
app.use("/auth", auth)
app.use("/user", JWTAuth, user)
app.use("/board", JWTAuth, board)
app.use("/list", JWTAuth, list)
app.use("/card", JWTAuth, card)
app.use("/member", JWTAuth, member)

app.use(function(error, req, res, next) {
  console.error(error)
  res.json({ ok: false, error })
})

app.listen(process.env.PORT || 8080, () => {
  console.log("http://localhost:8080\n")
})
