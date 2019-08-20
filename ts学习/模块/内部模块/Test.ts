import Zip = require('./ZipCodeValidator')
let strings = ['hello', '98899', '1111']
let validator = new Zip()

strings.forEach(s => {
    console.log(`"${ s }" - ${ validator.isAcceptable(s) ? "matches" : "does not match" }`);
})