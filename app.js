const path = require("path")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const db = require("./models")
const passport = require("passport")
const jwt = require("jsonwebtoken")

const express = require("express")
const app = express()

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

app.post("/auth/register", async (req, res, next) => {
  try {
    if (!req.body.password || !req.body.email) return next("No Permission")

    await db.User.create(req.body)

    res.json({ ok: true })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

app.post("/auth/login", function(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log(err)
    if (err || !user) {
      return next(err)
    }

    req.login(user, { session: false }, err => {
      if (err) {
        return next(err)
      }
      try {
        const token = jwt.sign(
          { ...user.dataValues, now: Date.now() },
          process.env.JWT_SECRET,
          {
            expiresIn: "12h",
          },
        )
        res.json({ ok: true, data: { user, token } })
      } catch (error) {
        next(error)
      }
    })
  })(req, res)
})

app.get(
  "/auth/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.logout()
    res.json({ ok: true })
  },
)

app.use(passport.authenticate("jwt", { session: false }))
app.use("/user", require("./routes/user"))
app.use("/board", require("./routes/board"))
app.use("/list", require("./routes/list"))
app.use("/card", require("./routes/card"))
app.use("/member", require("./routes/member"))

app.use(function(error, req, res, next) {
  console.error(error)
  res.json({ ok: false, error })
})

app.listen(process.env.PORT || 8080, () => {
  console.log("http://localhost:8080\n")
})
