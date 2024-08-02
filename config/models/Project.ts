const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitValue: { type: Number, required: true },
    proposedUnitValue: { type: Number }
});

const ProjectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    images: { type: [String], required: true },
    items: [ItemSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Project', ProjectSchema);
