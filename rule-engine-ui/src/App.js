import React from 'react';
import RuleForm from './components/RuleForm';
import RuleEvaluator from './components/RuleEvaluator';
const App = () => {
    return (
        <div>
            <h1>Rule Engine</h1>
            <RuleForm />
            <RuleEvaluator />
        </div>
    );
};

export default App;
