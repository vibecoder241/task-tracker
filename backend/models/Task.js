const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
            type: String,
            required: true
    },
    status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending'
    },
    createdOn: {
            type: Date,
            default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model("Task", taskSchema)