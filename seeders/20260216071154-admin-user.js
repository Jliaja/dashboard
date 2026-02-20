'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const hash = await bcrypt.hash('admin123', 10);

    const existingUser = await queryInterface.rawSelect('users', {
      where: { email: 'admin@gmail.com' },
    }, ['id']);

    if (!existingUser) {
      await queryInterface.bulkInsert('users', [{
        email: 'admin@gmail.com',
        password: hash,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      email: 'admin@gmail.com'
    });
  }
};
