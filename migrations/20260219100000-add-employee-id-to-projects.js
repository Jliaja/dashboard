'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        // No-op: employee_id is now added in the initial create-projects migration
        return Promise.resolve();
    },

    async down(queryInterface, Sequelize) {
        // No-op
        return Promise.resolve();
    }
};
