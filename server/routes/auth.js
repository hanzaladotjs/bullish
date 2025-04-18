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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const userschema_1 = require("../models/userschema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ message: "Username, email, and password are required" });
        }
        // Check for existing user
        const existingUser = (yield userschema_1.user.findOne({ email })) || (yield userschema_1.user.findOne({ username }));
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Username or email already taken" });
        }
        // Create user
        const userr = new userschema_1.user({ username, email, password });
        yield userr.save(); // Password hashed via pre("save")
        // Generate JWT
        const token = jwt.sign({ userId: userr._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        // Send response
        res.status(201).json({ token, user: { id: userr._id, username, email } });
    }
    catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error" });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        // Find user
        const userr = yield userschema_1.user.findOne({ email });
        if (!userr) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // Verify password
        const isMatch = yield bcrypt_1.default.compare(password, userr.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // Generate JWT
        const token = jwt.sign({ userId: userr._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        // Send response
        res.json({
            token,
            user: { id: userr._id, username: userr.username, email },
        });
    }
    catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({ message: "Server error" });
    }
}));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "No token" });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userr = yield userschema_1.user.findById(decoded.userId);
        if (!userr) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        req.body._userId = userr._id;
        next();
    }
    catch (_b) {
        res.status(401).json({ message: "Invalid token" });
    }
});
exports.authMiddleware = authMiddleware;
exports.default = router;
