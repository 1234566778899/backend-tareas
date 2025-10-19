const Task = require("../models/Task");

const createTask = async (req, res) => {
    try {
        const { userId, nombre, color } = req.body;

        const task = new Task({
            userId,
            nombre,
            color: color || '#607D8B'
        });

        await task.save();
        return res.status(201).json({ msg: 'Tarea creada', task });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al crear tarea' });
    }
};

const getTasksByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.find({ userId, activa: true }).sort({ createdAt: -1 });
        return res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener tareas' });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        const task = await Task.findByIdAndUpdate(id, updates, { new: true });
        return res.status(200).json({ msg: 'Tarea actualizada', task });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al actualizar tarea' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndUpdate(id, { activa: false });
        return res.status(200).json({ msg: 'Tarea desactivada' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al desactivar tarea' });
    }
};

module.exports = {
    createTask,
    getTasksByUser,
    updateTask,
    deleteTask
};