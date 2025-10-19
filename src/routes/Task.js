const express = require('express');
const {
    createTask,
    getTasksByUser,
    updateTask,
    deleteTask
} = require('../controllers/Task');
const router = express.Router();

router.post('/create', createTask);
router.get('/user/:userId', getTasksByUser);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;