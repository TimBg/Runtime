const JSEngine = require('./jsEngine.js'); 

const jsEngine = new JSEngine();
const jsCode = "1 + 2 * 3";

jsEngine.runCode(jsCode);