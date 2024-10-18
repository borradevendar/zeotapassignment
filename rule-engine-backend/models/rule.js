const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
    nodeType: String,
    left: { type: mongoose.Schema.Types.Mixed, default: null },
    right: { type: mongoose.Schema.Types.Mixed, default: null },
    value: String
});

const ruleSchema = new mongoose.Schema({
    _id: String,  // Declare _id as String
    ast: nodeSchema
});

module.exports = mongoose.model('Rule', ruleSchema);
