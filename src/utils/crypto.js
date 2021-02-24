import crypto from "crypto";
import CryptoJS from "crypto-js";

const ALGORITHM = "aes-256-cbc";
const BLOCK_SIZE = 16;

export const encrypt = (plain, fingerprint) => {
  const key = CryptoJS.MD5(fingerprint).toString();
  const cipher = aesEncrypt(plain, key);

  return cipher;
};

export const aesEncrypt = (plainText, aesKey) => {
  const iv = crypto.randomBytes(BLOCK_SIZE);
  const cipher = crypto.createCipheriv(ALGORITHM, aesKey, iv);
  let cipherText;

  try {
    cipherText = cipher.update(plainText, "utf8", "hex");
    cipherText += cipher.final("hex");
    cipherText = iv.toString("hex") + cipherText;
  } catch (e) {
    cipherText = null;
  }
  return cipherText;
};
