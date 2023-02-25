const JSParser = require('./parser.js');
const JSInterpreter = require('./interpreter.js');
const JSCompiler = require('./compiler.js');

class JSEngine {
    constructor() {
        this.parser = new JSParser();
        this.interpreter = new JSInterpreter();
        this.compiler = new JSCompiler();
    }

    runCode(jsCode) {
        const astBinaryTreeRoot = this.parser.parse(jsCode);

        const byteCode = this.interpreter.getByteCode(astBinaryTreeRoot);
        this.runByteCode(byteCode);

        const machineCode = this.compiler.getMachineCode(byteCode);
        this.runMachineCode(machineCode);
    }

    runByteCode(byteCode) {
        console.log(byteCode, ' is running');
    }

    runMachineCode(machineCode) {
        console.log(machineCode, ' is running');
    }
}

module.exports = JSEngine;