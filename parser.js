'use strict'

const { ASTNumberNode, ASTBinaryOperatorNode } = require('./ASTNodes/astNodes.js');

class JSParser {
    constructor() {
        this.nodesCache = [];
        this.currentIndex = 0;
    }

    parse(jsCode) {
        const tokens = this.getTokens(jsCode);
      
        while (this.currentIndex < tokens.length) {
          this.addNode(tokens);
          this.currentIndex++;
        }
      
        const ASTBinaryTreeRoot = this.nodesCache[0]; 

        this.nodesCache = [];
        this.currentIndex = 0;

        return ASTBinaryTreeRoot;
    }
    
    addNode(tokens) {
        const token = tokens[this.currentIndex];
        let node = null;

        if (token.type === 'number') {
            node = new ASTNumberNode(token.value);
        } 
          
        if (token.type === 'operator') {
            this.currentIndex++;

            const nextToken = tokens[this.currentIndex];
            const numberNode = new ASTNumberNode(nextToken.value);
            
            node = new ASTBinaryOperatorNode(
                token.value, 
                this.nodesCache.pop(),
                numberNode
            );
        }

        this.nodesCache.push(node);
    }

    getTokens(jsCode) {
        const regex = /\s*([0-9]+|\+|\-|\*|\/)\s*/g;
        const tokens = [];
        
        let match;
      
        while (match = regex.exec(jsCode)) {
          tokens.push({
            type: isNaN(match[1]) ? "operator" : "number",
            value: match[1],
          });
        }
      
        return tokens;
    }
}

module.exports = JSParser;