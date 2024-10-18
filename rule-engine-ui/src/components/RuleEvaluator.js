import React, { useState } from 'react';
import axios from 'axios';

const RuleEvaluator = () => {
    const [ruleId, setRuleId] = useState('');
    const [userData, setUserData] = useState({});
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!ruleId) {
            alert("Rule ID cannot be empty");
            return;
        }
        
        if (isNaN(userData.age) || isNaN(userData.salary)) {
            alert("Please enter valid numeric values for Age and Salary.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/rules/evaluate', { ruleId, userData });
            setResult(response.data.result);
        } catch (error) {
            console.error('Error evaluating rule:', error);
            alert('Error: ' + (error.response ? error.response.data : error.message));
        }
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Rule ID" value={ruleId} onChange={e => setRuleId(e.target.value)} />
                <input type="text" placeholder="Age" onChange={e => setUserData({ ...userData, age: e.target.value })} />
                <input type="text" placeholder="Salary" onChange={e => setUserData({ ...userData, salary: e.target.value })} />
                <button type="submit">Evaluate Rule</button>
            </form>
            {result !== null && <div>Result: {result.toString()}</div>}
        </div>
    );
};

export default RuleEvaluator;
