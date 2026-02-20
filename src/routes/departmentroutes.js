const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const controller = require('../controllers/departmentcontroller');

/* ================= ROUTES ================= */

// GET ALL
router.get('/', controller.getAll);

// GET BY ID
router.get('/:id', controller.getById);

// CREATE
router.post('/', auth, controller.create);

// UPDATE
router.put('/:id', auth, controller.update);

// DELETE
router.delete('/:id', auth, controller.remove);

module.exports = router;
