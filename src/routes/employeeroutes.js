const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const employeeController = require('../controllers/employeecontroller');

router.get('/', employeeController.getAll);
router.post('/', auth, employeeController.create);
router.put('/:id', auth, employeeController.update);
router.delete('/:id', auth, employeeController.remove);


module.exports = router;
