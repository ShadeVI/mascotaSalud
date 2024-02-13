const { db } = require('../db/connection')

const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'cliente'
}

class Role {
  static async findAll () {
    const [rows] = await db.execute('SELECT * FROM rol')
    return rows
  }

  static async findAdmins () {
    const [rows] = await db.execute('SELECT * FROM rol WHERE tipo = ?', [ROLES.ADMIN])
    return rows
  }

  static async findClients () {
    const [rows] = await db.execute('SELECT * FROM rol WHERE tipo = ?', [ROLES.CLIENT])
    return rows
  }

  static async findUserRol (UUID) {
    const [rows] = await db.execute('SELECT r.tipo FROM rol AS r INNER JOIN usuario AS u ON r.ID = u.ID_rol WHERE u.UUID = ?', [UUID])
    return rows[0]
  }

  static async isAdmin (UUID) {
    const rol = await Role.findUserRol(UUID)
    return rol.tipo === ROLES.ADMIN || false
  }
}

module.exports = Role
