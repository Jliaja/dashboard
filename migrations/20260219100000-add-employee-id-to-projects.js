'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        // 1. Add employee_id column
        await queryInterface.addColumn('projects', 'employee_id', {
            type: Sequelize.INTEGER,
            allowNull: true, // Allow null initially to avoid errors with existing data
            references: {
                model: 'employees',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });

        // 2. Remove pic column
        await queryInterface.removeColumn('projects', 'pic');
    },

    async down(queryInterface, Sequelize) {
        // 1. Add pic column back
        await queryInterface.addColumn('projects', 'pic', {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'TBD'
        });

        // 2. Remove employee_id column
        await queryInterface.removeColumn('projects', 'employee_id');
    }
};
