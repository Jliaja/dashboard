'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        // Fetch departments to get their IDs
        const departments = await queryInterface.sequelize.query(
            `SELECT id, name FROM departments;`
        );
        const departmentRows = departments[0];

        const getDeptId = (name) => {
            const dept = departmentRows.find(d => d.name === name);
            return dept ? dept.id : null;
        };

        await queryInterface.bulkInsert('employees', [
            { name: 'John Doe', email: 'john@example.com', position: 'Manager', status: 'aktif', department_id: getDeptId('Engineering'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'Jane Smith', email: 'jane@example.com', position: 'Senior Developer', status: 'aktif', department_id: getDeptId('Engineering'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'Michael Brown', email: 'michael@example.com', position: 'HR Specialist', status: 'aktif', department_id: getDeptId('Human Resources'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'Emily Davis', email: 'emily@example.com', position: 'Marketing Lead', status: 'aktif', department_id: getDeptId('Marketing'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'Robert Wilson', email: 'robert@example.com', position: 'Financial Analyst', status: 'nonaktif', department_id: getDeptId('Finance'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'Sarah Miller', email: 'sarah@example.com', position: 'UI/UX Designer', status: 'aktif', department_id: getDeptId('Design'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'David Lee', email: 'david@example.com', position: 'Frontend Developer', status: 'aktif', department_id: getDeptId('Engineering'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'Jessica Taylor', email: 'jessica@example.com', position: 'Content Writer', status: 'aktif', department_id: getDeptId('Marketing'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'James Anderson', email: 'james@example.com', position: 'DevOps Engineer', status: 'aktif', department_id: getDeptId('Engineering'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'Linda Thomas', email: 'linda@example.com', position: 'Recruiter', status: 'nonaktif', department_id: getDeptId('Human Resources'), createdAt: new Date(), updatedAt: new Date() }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('employees', null, {});
    }
};
