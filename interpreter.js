class JSInterpreter {
    static operatorToOpCode = {
        "+": 0,
        "-": 1,
        "*": 2,
        "/": 3,
        "%": 4,
        "**": 5,
    };
    
    getByteCode(ast) {
        return this.generateByteCode(ast).join('');
    }
      
    generateByteCode(ast) {
        if (ast.type === 'BinaryOperator') {
            const leftBytecode = this.generateByteCode(ast.leftOperand);
            const rightBytecode = this.generateByteCode(ast.rightOperand);

            let operatorCode = JSInterpreter.operatorToOpCode[ast.operator];
      
            return [
                ...leftBytecode,
                ...rightBytecode,
                operatorCode,
            ];
        }
        
        if (ast.type === 'Literal') {
            const LOAD_CONST = 6;
            
            return [parseInt(ast.value), LOAD_CONST];
        }

        throw new Error(`Unknown node type: ${ast.type}`);
    }
}

module.exports = JSInterpreter;