const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors

const Rule = require('./models/rule');
const { createRule, evaluateRule } = require('./ruleEngine');

const app = express();

// Apply CORS middleware
app.use(cors());

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/rulesdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// API to create a rule
app.post('/api/rules', async (req, res) => {
    const ruleString = req.body.rule;
    const ast = createRule(ruleString);
    const rule = new Rule({ ast });
    await rule.save();
    res.status(201).json(rule);
});

// API to evaluate a rule
app.post('/api/rules/evaluate', async (req, res) => {
    const { ruleId, userData } = req.body;
    const rule = await Rule.findById(ruleId);
    const result = evaluateRule(rule.ast, userData);
    res.json({ result });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
