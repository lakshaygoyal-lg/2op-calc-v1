const express = require("express");
const serverlessHTTP = require("serverless-http");

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware
function calculator(req, res, next) {
    if (req.path === '/calculate' && req.method === 'POST') {
        let { num1, num2, operator } = req.body;
        num1 = parseInt(num1);
        num2 = parseInt(num2);
        let result;
        switch (operator) {
            case "+": result = num1 + num2;
                break;
            case "-": result = num1 - num2;
                break;
            case "*": result = num1 * num2;
                break;
            case "**": result = num1 ** num2;
                break;
            case "/": result = num1 / num2;
                break;
            case "//": result = Math.floor(num1 / num2);
                break;
            case "%": result = num1 % num2;
                break;
            case "&": result = num1 & num2;
                break;
            case "|": result = num1 | num2;
                break;
            case "^": result = num1 ^ num2;
                break;
            default: return res.status(400).json({ error: "Operator not supported" });
        }
        // attach to request (request-scoped)
        req.calcResult=result;
    }
    next();
}

router.get("/test",(req,res)=>{
    res.status(200).json({"Output":"Success"});
});

router.post("/calculate",calculator,(req,res)=>{
    res.status(200).json({result:req.calcResult});
});

app.use("/api", router);
module.exports.handler = serverlessHTTP(app);