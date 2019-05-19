const router = require("express").Router()
const {
  Member,
  sequelize,
  Sequelize: { Op },
} = require("../models")

router.patch("/:boardId", async (req, res, next) => {
  // const transaction = await sequelize.transaction()
  // try {
  //   const {
  //     user,
  //     params: { boardId },
  //     body: { createList, deleteList },
  //   } = req
  //   if (user.position != "ADMIN" && user.position != "SUPER")
  //     return next("No Permission")
  //   const createData = createList.map(userId => ({ userId, boardId }))
  //   const createMember = Member.bulkCreate(createData, { transaction })
  //   const deleteMember = Member.destroy({
  //     where: { boardId, userId: { [Op.in]: deleteList } },
  //     transaction,
  //   })
  //   await Promise.all([createMember, deleteMember])
  //   await transaction.commit()
  //   res.json({ ok: true })
  // } catch (error) {
  //   await transaction.rollback()
  //   console.error(error)
  //   next(error)
  // }
})

module.exports = router
