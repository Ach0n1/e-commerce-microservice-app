"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const routerUsers_1 = __importDefault(require("./routers/routerUsers"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://127.0.0.1:27017/usersWebShop');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log("db connected");
});
const router = express_1.default.Router();
router.use('/users', routerUsers_1.default);
app.use('/', router);
app.listen(5000, () => console.log(`Express server running on port 5000`));
//# sourceMappingURL=server.js.map