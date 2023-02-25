const JSParser = require('./parser.js');
const JSEngine = require('./jsEngine.js'); 

const jsParser = new JSParser();
const jsEngine = new JSEngine();

const jsCode = "1 + 2 * 3";

const astBinaryTreeRoot = jsParser.parse(jsCode);
const byteCode = jsEngine.getByteCode(astBinaryTreeRoot);

console.log(byteCode);