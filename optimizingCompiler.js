'use strict'

class JSOptimizingCompiler {
    constructor() {
        this.byteCodeToMachineCodeCache = {};
    }

    static byteCodeToMachineCode = {
        0: '0x410x01',
        1: '0x410x02',
        2: '0x6a',
        3: '0x360x000x00',
        4: '0x280x020x000x000x00',
        5: '0x0b',
    }

    generateOptimizingCode(byteCode) {
        let machineCode = this.byteCodeToMachineCodeCache[byteCode];
        if (!machineCode) {

            const isNeed = this.isMachineCodeNeedToBeDeoptimized(byteCode);
            if (isNeed) this.deoptimizeMachineCode(byteCode);

            machineCode = this.generateMachineCode(byteCode).join('');
        }

        return machineCode;
    }

    deoptimizeMachineCode(newByteCode) {
        for (let byteCode in this.byteCodeToMachineCodeCache) {
            for (let i = 0; i < newByteCode.length; ++i) {
                const subStr = newByteCode.slice(i, i + 4);
                
                if (!byteCode.includes(subStr)) {
                    delete this.byteCodeToMachineCodeCache[byteCode];
                }
            }
        }
    }

    isMachineCodeNeedToBeDeoptimized(byteCode) {
        const allByteCode = Object.keys(this.byteCodeToMachineCodeCache).join('');

        for (let i = 0; i < byteCode.length; ++i) {
            const subStr = byteCode.slice(i, i + 4);

            if (allByteCode.includes(subStr)) {
                return true;
            }
        }

        return false;
    }

    generateMachineCode(bytecode) {
        const machineCode = [];
      
        for (let i = 0; i < bytecode.length; i++) {
            const byte = bytecode[i];
            const machineCodePart = JSOptimizingCompiler.byteCodeToMachineCode[byte];

            machineCode.push(machineCodePart);
        }

        const newMachineCode = new Uint8Array(machineCode);

        this.byteCodeToMachineCodeCache[bytecode] = newMachineCode;
      
        return newMachineCode;
    }
}

module.exports = JSOptimizingCompiler;