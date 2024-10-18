import React, { useState } from 'react';
import axios from 'axios';

const RuleForm = () => {
    const [rule, setRule] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/rules', { rule });
            alert('Rule created successfully');
            setRule(''); // Clear input field after successful submission
            setError(null); // Clear any previous error
        } catch (err) {
            console.error('Error creating rule:', err);
            setError('Failed to create rule. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={rule} 
                    onChange={(e) => setRule(e.target.value)} 
                    placeholder="Enter rule string" 
                    required 
                />
                <button type="submit">Create Rule</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default RuleForm;
