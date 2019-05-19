const router = require("express").Router()
const { List } = require("../models")

router.post("/", async (req, res, next) => {
  try {
    await List.create(req.body)
    res.json({ ok: true })
  } catch (error) {
    next(error)
  }
})

router.patch("/:listId", async (req, res, next) => {
  try {
    await List.update(req.body, { where: { id: req.params.listId } })
    res.json({ ok: true })
  } catch (error) {
    next(error)
  }
})

router.delete("/:listId", async (req, res, next) => {
  try {
    await List.destroy(req.body, { where: { id: req.params.listId } })
    res.json({ ok: true })
  } catch (error) {
    next(error)
  }
})

module.exports = router
