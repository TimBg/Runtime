const JSParser = require('./parser.js');
const JSInterpreter = require('./interpreter.js');
const JSBaseCompiler = require('./baseCompiler.js');
const JSOptimizingCompiler = require('./optimizingCompiler.js');

class JSEngine {
    constructor() {
        this.parser = new JSParser();
        this.baseCompiler = new JSBaseCompiler();
        this.optimizingCompiler = new JSOptimizingCompiler();
        this.interpreter = new JSInterpreter(this.optimizingCompiler);
    }

    runCode(jsCode) {
        const astBinaryTreeRoot = this.parser.parse(jsCode);
        const byteCode = this.baseCompiler.getByteCode(astBinaryTreeRoot);

        const machineCode = this.interpreter.getMachineCode(byteCode);
        this.runMachineCode(machineCode);

        this.optimizingCompiler.generateOptimizingCode(byteCode);
    }

    runByteCode(byteCode) {
        console.log(byteCode, ' is running');
    }

    runMachineCode(machineCode) {
        console.log(machineCode, ' is running');
    }
}

module.exports = JSEngine;