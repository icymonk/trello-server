const passport = require("passport")
const passportJWT = require("passport-jwt")

const ExtractJWT = passportJWT.ExtractJwt

const LocalStrategy = require("passport-local").Strategy
const JWTStrategy = passportJWT.Strategy
const { User } = require("../models")

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function(email, password, cb) {
      console.log(email, password)
      return User.findOne({
        where: { email, password },
        attributes: { exclude: ["password"] },
      })
        .then(user => {
          if (!user) {
            return cb(null, false, { message: "Incorrect email or password." })
          }

          return cb(null, user, {
            message: "Logged In Successfully",
          })
        })
        .catch(err => {
          return cb(err)
        })
    },
  ),
)

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function(jwtPayload, cb) {
      return User.findByPk(jwtPayload.id, {
        attributes: { exclude: ["password"] },
      })
        .then(user => {
          return cb(null, user)
        })
        .catch(err => {
          return cb(err)
        })
    },
  ),
)
