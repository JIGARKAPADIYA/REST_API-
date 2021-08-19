"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var mongodb_1 = require("mongodb");
var driver_1 = require("../database/driver");
var router = express_1.default.Router();
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usertasks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, driver_1.open()];
            case 1:
                _a.sent();
                return [4 /*yield*/, driver_1.users.find().toArray()];
            case 2:
                usertasks = _a.sent();
                res.send(usertasks);
                return [4 /*yield*/, driver_1.close()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var alltasks, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, driver_1.open()];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, driver_1.users.find({ _id: new mongodb_1.ObjectId(req.params.id) }).toArray()];
            case 3:
                alltasks = _b.sent();
                console.log(alltasks);
                if (alltasks.length == 0) {
                    res.status(404).send("No such tasks exist");
                }
                else
                    res.status(200).send(alltasks);
                return [3 /*break*/, 5];
            case 4:
                _a = _b.sent();
                res.status(404).send("Invalid ID");
                return [3 /*break*/, 5];
            case 5: return [4 /*yield*/, driver_1.close()];
            case 6:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newtask;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, driver_1.open()];
            case 1:
                _a.sent();
                newtask = {
                    name: req.body.name,
                    task: req.body.task,
                    startdate: req.body.startdate,
                    enddate: req.body.enddate
                };
                return [4 /*yield*/, driver_1.users.insertOne(newtask).then(function () {
                        res.status(200).send("New task Inserted");
                    }).catch(function () { res.status(500).send("Error"); })];
            case 2:
                _a.sent();
                return [4 /*yield*/, driver_1.close()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.put('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, driver_1.open()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, driver_1.users.findOneAndReplace({ _id: new mongodb_1.ObjectId(req.params.id) }, {
                        name: req.body.name,
                        task: req.body.task,
                        startdate: req.body.startdate,
                        enddate: req.body.enddate
                    }).then(function () {
                        res.status(200).send("Usertask updated successfully");
                    }).catch(function (err) { res.status(500).send("Unable to update no catch"); })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                res.send("Unable to update");
                return [3 /*break*/, 5];
            case 5: return [4 /*yield*/, driver_1.close()];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.patch('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, driver_1.open()];
            case 1:
                _a.sent();
                return [4 /*yield*/, driver_1.users.findOneAndUpdate({ _id: new mongodb_1.ObjectId(req.params.id) }, { $set: {
                            name: req.body.name,
                            task: req.body.task,
                            startdate: req.body.startdate,
                            enddate: req.body.enddate
                        } }).then(function () {
                        res.status(200).send("Usertask updated successfully");
                    }).catch(function (err) { res.status(500).send("Unable to update"); })];
            case 2:
                _a.sent();
                return [4 /*yield*/, driver_1.close()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, driver_1.open()];
            case 1:
                _a.sent();
                return [4 /*yield*/, driver_1.users.findOneAndDelete({ _id: new mongodb_1.ObjectId(req.params.id) }).then(function () {
                        res.status(200).send("Usertask deleted successfully");
                    }).catch(function (err) { res.status(500).send("Unable to delete"); })];
            case 2:
                _a.sent();
                return [4 /*yield*/, driver_1.close()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
module.exports = router;
