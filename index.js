const JSParser  = require('./parser.js');

const jsParser = new JSParser();

const jsCode = "1 + 2 * 3";
const astBinaryTreeRoot = jsParser.parse(jsCode);

console.log(astBinaryTreeRoot);