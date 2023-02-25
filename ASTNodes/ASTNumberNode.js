const ASTNode = require('./ASTNode.js');

class ASTNumberNode extends ASTNode {
    constructor(value) {
        super('Literal');

        this.value = value;
    }
}

module.exports = ASTNumberNode;