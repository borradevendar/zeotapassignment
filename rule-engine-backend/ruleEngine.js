// ruleEngine.js

const createRule = (ruleString) => {
    // Basic parsing logic: This should be replaced with a more sophisticated parser for complex rules.
    // For example, it might be necessary to use a parser library or regex.
    
    const parseNode = (str) => {
        // This is a very basic parser example.
        // You would want to make this more robust based on your needs.
        
        str = str.trim();
        if (str.startsWith("(") && str.endsWith(")")) {
            str = str.slice(1, -1); // Remove outer parentheses
        }
        
        const andIndex = str.indexOf(" AND ");
        if (andIndex !== -1) {
            return {
                nodeType: 'AND',
                left: parseNode(str.slice(0, andIndex)),
                right: parseNode(str.slice(andIndex + 5)),
            };
        }

        const orIndex = str.indexOf(" OR ");
        if (orIndex !== -1) {
            return {
                nodeType: 'OR',
                left: parseNode(str.slice(0, orIndex)),
                right: parseNode(str.slice(orIndex + 4)),
            };
        }
        
        // Assuming terminal nodes like "age > 30" or "salary < 50000"
        const [leftValue, operator, rightValue] = str.split(/(<=|>=|<|>|!=|=)/).map(s => s.trim());
        return {
            nodeType: 'COMPARISON',
            left: { value: leftValue },
            operator,
            right: { value: rightValue },
        };
    };

    const ast = parseNode(ruleString);
    return ast; // Return the constructed AST
};

const evaluateRule = (ast, userData) => {
    if (ast.nodeType === 'AND') {
        return evaluateRule(ast.left, userData) && evaluateRule(ast.right, userData);
    } else if (ast.nodeType === 'OR') {
        return evaluateRule(ast.left, userData) || evaluateRule(ast.right, userData);
    } else if (ast.nodeType === 'COMPARISON') {
        const leftValue = userData[ast.left.value]; // Get the value from userData
        const rightValue = parseFloat(ast.right.value); // Convert to number for comparison
        
        switch (ast.operator) {
            case '>': return leftValue > rightValue;
            case '<': return leftValue < rightValue;
            case '>=': return leftValue >= rightValue;
            case '<=': return leftValue <= rightValue;
            case '==': return leftValue == rightValue; // Use `==` for equality
            case '!=': return leftValue != rightValue; // Use `!=` for inequality
            default: return false; // Handle unknown operators
        }
    }
    
    return false; // Default return for unmatched conditions
};

module.exports = { createRule, evaluateRule };
