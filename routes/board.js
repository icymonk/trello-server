const router = require("express").Router()
const {
  Board,
  List,
  Card,
  Member,
  User,
  Reply,
  Sequelize: { Op },
} = require("../models")

router.get("/", async (req, res, next) => {
  try {
    const members = await Member.findAll({ where: { userId: req.user.id } })

    const boards = await Board.findAll({
      where: {
        id: {
          [Op.in]: members.map(member => member.boardId),
        },
      },
    })
    res.json({ ok: true, data: boards })
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const board = await Board.create(req.body)
    await Member.create({ boardId: board.id, userId: req.user.id })
    res.json({ ok: true, data: board })
  } catch (error) {
    next(error)
  }
})

router.get("/:boardId", async (req, res, next) => {
  try {
    const member = await Member.findOne({
      where: { boardId: req.params.boardId, userId: req.user.id },
    })
    if (!member) throw "No Permission"

    const board = await Board.findOne({
      where: { id: req.params.boardId },
      include: [
        { model: List, include: [{ model: Card, include: [Reply] }] },
        { model: Member, include: [User] },
      ],
    })

    res.json({ ok: true, data: board })
  } catch (error) {
    next(error)
  }
})

router.patch("/:boardId", async (req, res, next) => {
  try {
    const member = await Member.findOne({
      where: { boardId: req.params.boardId, userId: req.user.id },
    })
    if (!member) throw "No Permission"

    await Board.update(req.body, {
      where: { id: req.params.boardId },
    })

    res.json({ ok: true })
  } catch (error) {
    next(error)
  }
})

router.delete("/:boardId", async (req, res, next) => {
  try {
    const member = await Member.findOne({
      where: {
        boardId: req.params.boardId,
        userId: req.user.id,
        position: "ADMIN",
      },
    })
    if (!member) throw "No Permission"

    await Board.destroy({
      where: { id: req.params.boardId },
    })

    res.json({ ok: true })
  } catch (error) {
    next(error)
  }
})

module.exports = router
