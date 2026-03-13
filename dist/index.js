"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./routes/router"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/", router_1.default);
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log(`Server is running on port ${port}`);
    }
});
//# sourceMappingURL=index.js.map