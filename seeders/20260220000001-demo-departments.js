'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('departments', [
            { name: 'Engineering', description: 'Software Development and IT', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Human Resources', description: 'Employee relation and recruitment', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Marketing', description: 'Brand awareness and sales', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Finance', description: 'Financial planning and analysis', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Design', description: 'Product and visual design', createdAt: new Date(), updatedAt: new Date() }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('departments', null, {});
    }
};
