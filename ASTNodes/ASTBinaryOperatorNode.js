'use strict'

const ASTNode = require('./ASTNode.js');

class ASTBinaryOperatorNode extends ASTNode {
    constructor(value, left, right) {
        super('BinaryOperator');

        this.operator = value;
        this.leftOperand = left;
        this.rightOperand = right;
    }
}

module.exports = ASTBinaryOperatorNode;