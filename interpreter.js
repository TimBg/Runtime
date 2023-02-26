'use strict'

class JSInterpreter {
    constructor(jsOptimizingCompiler) {
        this.byteCodeToMachineCodeCache = jsOptimizingCompiler.byteCodeToMachineCodeCache;
    }

    static byteCodeToMachineCode = {
        0: '0x410x01',
        1: '0x410x02',
        2: '0x6a',
        3: '0x360x000x00',
        4: '0x280x020x000x000x00',
        5: '0x0b',
    }

    getMachineCode(byteCode) {
        let machineCode = this.byteCodeToMachineCodeCache[byteCode];
        if (!machineCode) {

            machineCode = this.generateMachineCode(byteCode).join('');
        }

        return machineCode;
    }

    generateMachineCode(bytecode) {
        const machineCode = [];
      
        for (let i = 0; i < bytecode.length; i++) {
            const byte = bytecode[i];
            const machineCodePart = JSInterpreter.byteCodeToMachineCode[byte];

            machineCode.push(machineCodePart);
        }

        const newMachineCode = new Uint8Array(machineCode);
      
        return newMachineCode;
    }
}

module.exports = JSInterpreter;