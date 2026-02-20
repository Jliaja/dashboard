'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        // Fetch employees to get their IDs
        const employees = await queryInterface.sequelize.query(
            `SELECT id, name FROM employees;`
        );
        const employeeRows = employees[0];

        const getEmpId = (name) => {
            const emp = employeeRows.find(e => e.name === name);
            return emp ? emp.id : null;
        };

        await queryInterface.bulkInsert('projects', [
            { name: 'Website Redesign', client: 'PT. Maju Bersama', status: 'On Progress', start_date: '2023-01-10', end_date: '2023-04-10', employee_id: getEmpId('John Doe'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'Mobile App Development', client: 'CV. Digital Kreatif', status: 'Planning', start_date: '2023-02-15', end_date: '2023-08-15', employee_id: getEmpId('Jane Smith'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'Marketing Campaign 2023', client: 'Global Indo', status: 'On Progress', start_date: '2023-01-01', end_date: '2023-12-31', employee_id: getEmpId('Emily Davis'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'Financial Audit', client: 'Bank Nasional', status: 'Completed', start_date: '2022-10-01', end_date: '2022-12-31', employee_id: getEmpId('Robert Wilson'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'E-commerce Platform', client: 'Toko Online Jaya', status: 'On Progress', start_date: '2023-03-01', end_date: '2023-09-30', employee_id: getEmpId('David Lee'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'Company Rebranding', client: 'StartUp Baru', status: 'Planning', start_date: '2023-04-01', end_date: '2023-06-30', employee_id: getEmpId('Sarah Miller'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'Cloud Migration', client: 'Tech Corp', status: 'Completed', start_date: '2022-06-01', end_date: '2022-12-01', employee_id: getEmpId('James Anderson'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'Social Media Strategy', client: 'Fashion Brand', status: 'On Progress', start_date: '2023-01-20', end_date: '2023-05-20', employee_id: getEmpId('Jessica Taylor'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'HR System Upgrade', client: 'Internal', status: 'Planning', start_date: '2023-05-01', end_date: '2023-08-01', employee_id: getEmpId('Michael Brown'), createdAt: new Date(), updatedAt: new Date() },
            { name: 'Legacy Code Refactor', client: 'Old System Inc', status: 'On Progress', start_date: '2023-02-01', end_date: '2023-05-01', employee_id: getEmpId('Jane Smith'), createdAt: new Date(), updatedAt: new Date() }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('projects', null, {});
    }
};
