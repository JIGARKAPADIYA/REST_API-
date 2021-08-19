"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var allowedOrigins = ['http://localhost:4000', '*'];
var options = {
    origin: allowedOrigins
};
app.use(cors_1.default(options));
app.use(express_1.default.json());
app.use('/', routes_1.default);
app.use('*', function (req, res) {
    res.status(404).send("You have eneterd incorrect URL");
});
app.listen(4000, function () { console.log("You are listening on port 4000"); });
