const {body} = require("express-validator")
const validationResult = ()=>{
    return [body('title')
        .notEmpty()
        .withMessage("empty value")
        .isLength({min:2})
        .withMessage("title is required"),
        body("price").notEmpty()
        .withMessage("error price")
    
    
    ]
}
module.exports = {validationResult};