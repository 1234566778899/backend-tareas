const { Schema, model } = require('mongoose');

const SegmentoSchema = Schema({
    inicio: {
        type: Date,
        required: true
    },
    fin: {
        type: Date
    }
}, { _id: false });

const TimeEntrySchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'task',
        required: true
    },
    tarea: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: '#607D8B'
    },
    fecha: {
        type: String, // formato YYYY-MM-DD
        required: true
    },
    segmentos: [SegmentoSchema],
    duracionTotal: {
        type: Number, // en segundos
        default: 0
    },
    estado: {
        type: String,
        enum: ['activo', 'pausado', 'completado'],
        default: 'pausado'
    }
}, {
    timestamps: true
});

TimeEntrySchema.index({ userId: 1, fecha: 1 });
TimeEntrySchema.index({ userId: 1, taskId: 1, fecha: 1, estado: 1 });

module.exports = model('timeentry', TimeEntrySchema);