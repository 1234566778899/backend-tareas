const express = require('express');
const {
    startEntry,
    resumeEntry,
    pauseEntry,
    completeEntry,
    getActiveEntry,
    getEntriesByDate,
    getEntriesByRange,
    deleteEntry
} = require('../controllers/TimeEntry');
const router = express.Router();

router.post('/start', startEntry);
router.post('/resume/:id', resumeEntry);
router.post('/pause', pauseEntry);
router.post('/complete', completeEntry);
router.get('/active/:userId', getActiveEntry);
router.get('/user/:userId/date/:fecha', getEntriesByDate);
router.get('/user/:userId/range/:fechaInicio/:fechaFin', getEntriesByRange);
router.delete('/:id', deleteEntry);
// ⬅️ ELIMINADA LA LÍNEA: router.put('/:id', updateEntry);

module.exports = router;