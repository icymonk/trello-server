const router = require("express").Router()
const { Card } = require("../models")

router.post("/", async (req, res, next) => {
  try {
    await Card.create(req.body)
    res.json({ ok: true })
  } catch (error) {
    next(error)
  }
})

router.patch("/:cardId", async (req, res, next) => {
  try {
    await Card.update(req.body, { where: { id: req.params.cardId } })
    res.json({ ok: true })
  } catch (error) {
    next(error)
  }
})

router.delete("/:cardId", async (req, res, next) => {
  try {
    await Card.destroy(req.body, { where: { id: req.params.cardId } })
    res.json({ ok: true })
  } catch (error) {
    next(error)
  }
})

module.exports = router
