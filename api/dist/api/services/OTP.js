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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wipeOTP = exports.verifyOTP = exports.storeOTP = exports.sendOTP = exports.generateOTP = void 0;
const crypto_1 = __importDefault(require("crypto"));
const email_transporter_1 = __importDefault(require("../../lib/email-transporter"));
const db_1 = __importDefault(require("../../lib/db"));
const generateOTP = () => crypto_1.default.randomInt(100000, 999999).toString();
exports.generateOTP = generateOTP;
const sendOTP = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}. It expires in 5 minutes.`,
    };
    yield email_transporter_1.default.sendMail(mailOption);
});
exports.sendOTP = sendOTP;
const storeOTP = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    // upsert ensures only one OTP per email
    yield db_1.default.oTP.upsert({
        where: { email },
        update: { code: otp, expires_at: expiresAt },
        create: { email, code: otp, expires_at: expiresAt },
    });
});
exports.storeOTP = storeOTP;
const verifyOTP = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const record = yield db_1.default.oTP.findUnique({ where: { email } });
    if (!record)
        return false;
    const expired = record.expires_at < new Date();
    if (expired || record.code !== otp)
        return false;
    yield db_1.default.oTP.delete({ where: { email } });
    return true;
});
exports.verifyOTP = verifyOTP;
const wipeOTP = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.oTP.deleteMany();
});
exports.wipeOTP = wipeOTP;
