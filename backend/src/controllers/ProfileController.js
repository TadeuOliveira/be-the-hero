const conn = require('../database/connection')
const crypto = require('crypto')


module.exports = {
  async index(req,resp) {
    const ong_id =req.headers.authorization

    const incidents = await conn('incidents')
      .where('ong_id',ong_id)
      .select('*')

    return resp.json(incidents)
  },

  async create(req,resp) {
    const { name, email, whatsapp, city, uf } = req.body

    const id = crypto.randomBytes(4).toString('HEX')

    await conn('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    return resp.json({ id })
  },
}