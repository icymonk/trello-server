const router = require("express").Router()
const { User } = require("../models")

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } })
    res.json({ ok: true, data: users })
  } catch (error) {
    next(error)
  }
})

router.get("/me", async (req, res, next) => {
  res.json({ ok: true, data: req.user })
})

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json({ ok: true, data: user })
  } catch (error) {
    next(error)
  }
})

router.patch("/:userId", async (req, res) => {
  try {
    await User.update(req.body, { where: { id: req.params.userId } })
    res.json({ ok: true })
  } catch (error) {
    next(error)
  }
})

router.delete("/:userId", async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.userId } })
    res.json({ ok: true })
  } catch (error) {
    next(error)
  }
})

module.exports = router
