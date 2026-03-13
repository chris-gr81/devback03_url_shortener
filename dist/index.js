"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./routes/router"));
const app = (0, express_1.default)();
const port = process.env.port || 3000;
// Middleware
app.use(express_1.default.json());
app.use("/url", router_1.default);
// root-route
app.get("/", (req, res) => {
    res.send("Welcome my friend");
});
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log(`Server is running on port ${port}`);
    }
});
//# sourceMappingURL=index.js.map