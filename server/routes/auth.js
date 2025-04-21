"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var express_1 = __importDefault(require("express"));
var userschema_1 = require("../models/userschema");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jwt = __importStar(require("jsonwebtoken"));
var router = express_1.default.Router();
router.post("/signup", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, existingUser, _b, userr, token, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                if (!username || !email || !password) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "Username, email, and password are required" })];
                }
                return [4 /*yield*/, userschema_1.user.findOne({ email: email })];
            case 1:
                _b = (_c.sent());
                if (_b) return [3 /*break*/, 3];
                return [4 /*yield*/, userschema_1.user.findOne({ username: username })];
            case 2:
                _b = (_c.sent());
                _c.label = 3;
            case 3:
                existingUser = _b;
                if (existingUser) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "Username or email already taken" })];
                }
                userr = new userschema_1.user({ username: username, email: email, password: password });
                return [4 /*yield*/, userr.save()];
            case 4:
                _c.sent(); // Password hashed via pre("save")
                token = jwt.sign({ userId: userr._id }, process.env.JWT_SECRET, {
                    expiresIn: "1d",
                });
                // Send response
                res.status(201).json({ token: token, user: { id: userr._id, username: username, email: email } });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _c.sent();
                console.error("Signup error:", error_1);
                res.status(500).json({ message: "Server error" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.post("/signin", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userr, isMatch, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                // Validate input
                if (!email || !password) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "Email and password are required" })];
                }
                return [4 /*yield*/, userschema_1.user.findOne({ email: email })];
            case 1:
                userr = _b.sent();
                if (!userr) {
                    return [2 /*return*/, res.status(401).json({ message: "Invalid email or password" })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, userr.password)];
            case 2:
                isMatch = _b.sent();
                if (!isMatch) {
                    return [2 /*return*/, res.status(401).json({ message: "Invalid email or password" })];
                }
                token = jwt.sign({ userId: userr._id }, process.env.JWT_SECRET, {
                    expiresIn: "1d",
                });
                // Send response
                res.json({
                    token: token,
                    user: { id: userr._id, username: userr.username, email: email },
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error("Signin error:", error_2);
                res.status(500).json({ message: "Server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
var authMiddleware = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decoded, userr, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
                if (!token) {
                    res.status(401).json({ message: "No token" });
                    return [2 /*return*/];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                decoded = jwt.verify(token, process.env.JWT_SECRET);
                return [4 /*yield*/, userschema_1.user.findById(decoded.userId)];
            case 2:
                userr = _c.sent();
                if (!userr) {
                    res.status(401).json({ message: "User not found" });
                    return [2 /*return*/];
                }
                req.body._userId = userr._id;
                next();
                return [3 /*break*/, 4];
            case 3:
                _a = _c.sent();
                res.status(401).json({ message: "Invalid token" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.authMiddleware = authMiddleware;
exports.default = router;
