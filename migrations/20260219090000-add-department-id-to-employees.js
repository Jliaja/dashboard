'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('employees', 'department_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'departments',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true
    });

    await queryInterface.removeColumn('employees', 'division');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('employees', 'division', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.removeColumn('employees', 'department_id');
  }
};
