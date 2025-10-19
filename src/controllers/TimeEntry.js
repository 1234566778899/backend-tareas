const TimeEntry = require("../models/TimeEntry");
const Task = require("../models/Task");

// Iniciar o reanudar entrada
const startEntry = async (req, res) => {
    try {
        const { userId, taskId, fecha } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        // Verificar si ya existe una entrada activa para este usuario
        const entradaActiva = await TimeEntry.findOne({ 
            userId, 
            estado: 'activo' 
        });

        if (entradaActiva) {
            return res.status(400).json({ 
                error: 'Ya tienes una tarea activa',
                entradaActiva 
            });
        }

        // Buscar si ya existe una entrada para esta tarea hoy
        let entry = await TimeEntry.findOne({
            userId,
            taskId,
            fecha,
            estado: { $in: ['pausado', 'activo'] }
        });

        const ahora = new Date();

        if (entry) {
            // Reanudar entrada existente
            entry.segmentos.push({ inicio: ahora });
            entry.estado = 'activo';
        } else {
            // Crear nueva entrada
            entry = new TimeEntry({
                userId,
                taskId,
                tarea: task.nombre,
                color: task.color,
                fecha,
                segmentos: [{ inicio: ahora }],
                estado: 'activo'
            });
        }

        await entry.save();
        return res.status(200).json({ msg: 'Timer iniciado', entry });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al iniciar timer' });
    }
};

// Reanudar entrada específica por ID
const resumeEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        // Verificar si ya hay una entrada activa
        const entradaActiva = await TimeEntry.findOne({ 
            userId, 
            estado: 'activo' 
        });

        if (entradaActiva) {
            return res.status(400).json({ 
                error: 'Ya tienes una tarea activa',
                entradaActiva 
            });
        }

        // Encontrar la entrada a reanudar
        const entry = await TimeEntry.findById(id);
        
        if (!entry) {
            return res.status(404).json({ error: 'Entrada no encontrada' });
        }

        if (entry.estado === 'completado') {
            return res.status(400).json({ error: 'No se puede reanudar una tarea completada' });
        }

        const ahora = new Date();
        entry.segmentos.push({ inicio: ahora });
        entry.estado = 'activo';

        await entry.save();
        return res.status(200).json({ msg: 'Timer reanudado', entry });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al reanudar timer' });
    }
};

// Pausar entrada activa
const pauseEntry = async (req, res) => {
    try {
        const { userId } = req.body;

        const entry = await TimeEntry.findOne({ userId, estado: 'activo' });
        
        if (!entry) {
            return res.status(404).json({ error: 'No hay timer activo' });
        }

        const ahora = new Date();
        
        // Cerrar el último segmento
        const ultimoSegmento = entry.segmentos[entry.segmentos.length - 1];
        ultimoSegmento.fin = ahora;

        // Calcular duración total
        let duracionTotal = 0;
        entry.segmentos.forEach(seg => {
            if (seg.fin) {
                duracionTotal += Math.floor((new Date(seg.fin) - new Date(seg.inicio)) / 1000);
            }
        });

        entry.duracionTotal = duracionTotal;
        entry.estado = 'pausado';

        await entry.save();
        return res.status(200).json({ msg: 'Timer pausado', entry });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al pausar timer' });
    }
};

// Completar entrada
const completeEntry = async (req, res) => {
    try {
        const { userId } = req.body;

        const entry = await TimeEntry.findOne({ userId, estado: 'activo' });
        
        if (!entry) {
            return res.status(404).json({ error: 'No hay timer activo' });
        }

        const ahora = new Date();
        
        // Cerrar el último segmento
        const ultimoSegmento = entry.segmentos[entry.segmentos.length - 1];
        ultimoSegmento.fin = ahora;

        // Calcular duración total
        let duracionTotal = 0;
        entry.segmentos.forEach(seg => {
            if (seg.fin) {
                duracionTotal += Math.floor((new Date(seg.fin) - new Date(seg.inicio)) / 1000);
            }
        });

        entry.duracionTotal = duracionTotal;
        entry.estado = 'completado';

        await entry.save();
        return res.status(200).json({ msg: 'Entrada completada', entry });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al completar entrada' });
    }
};

const getActiveEntry = async (req, res) => {
    try {
        const { userId } = req.params;
        const entry = await TimeEntry.findOne({ userId, estado: 'activo' });
        return res.status(200).json(entry);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener entrada activa' });
    }
};

const getEntriesByDate = async (req, res) => {
    try {
        const { userId, fecha } = req.params;
        const entries = await TimeEntry.find({ 
            userId, 
            fecha 
        }).sort({ updatedAt: -1 });
        
        return res.status(200).json(entries);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener entradas' });
    }
};

const getEntriesByRange = async (req, res) => {
    try {
        const { userId, fechaInicio, fechaFin } = req.params;
        const entries = await TimeEntry.find({
            userId,
            fecha: { $gte: fechaInicio, $lte: fechaFin }
        }).sort({ fecha: -1, updatedAt: -1 });
        
        return res.status(200).json(entries);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener entradas' });
    }
};

const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        await TimeEntry.findByIdAndDelete(id);
        return res.status(200).json({ msg: 'Entrada eliminada' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al eliminar entrada' });
    }
};

module.exports = {
    startEntry,
    resumeEntry,
    pauseEntry,
    completeEntry,
    getActiveEntry,
    getEntriesByDate,
    getEntriesByRange,
    deleteEntry
};