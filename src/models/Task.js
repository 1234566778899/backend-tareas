const { Schema, model } = require('mongoose');

const TaskSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: '#607D8B'
    },
    activa: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = model('task', TaskSchema);