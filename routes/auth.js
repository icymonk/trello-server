const router = require("express").Router()
const passport = require("passport")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res, next) => {
  try {
    if (!req.body.password || !req.body.email) return next("No Permission")

    await User.create(req.body)

    res.json({ ok: true })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.post("/login", function(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log(err)
    if (err || !user) {
      return next(err)
    }

    req.login(user, { session: false }, err => {
      if (err) {
        return next(err)
      }
      const token = jwt.sign(user.dataValues, process.env.JWT_SECRET, {
        expiresIn: "12h",
      })

      return res.json({ ok: true, data: { user, token } })
    })
  })(req, res)
})

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.logout()
    res.json({ ok: true })
  },
)

module.exports = router
