const {body} = require('express-validator');
const validationResult = ()=>{
    return [
        body('firstname')
        .notEmpty()
        .withMessage("empty firstname")
        .isLength({min:3})
        .withMessage("minimum firstname 3 character"),
        body('lastname')
        .notEmpty()
        .withMessage("empty lastname")
        .isLength({min:3})
        .withMessage("minimum lastname 3 character"),
        
        body('email')
        .notEmpty()
        .withMessage("empty email")
        .isLength({min:14,max:30})
        .withMessage("minimum character of email is 14 and max is 30")
        ,
        body('password')
        .notEmpty()
        .withMessage("empty password")
        .isLength({min:6,max:13})
        .withMessage("minimum character of password is 6 and max is 13")
]
}
module.exports = {validationResult};