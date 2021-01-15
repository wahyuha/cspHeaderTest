import CryptoJS from "crypto-js";
import NodeRSA from "node-rsa";
import sshKeyDecrypt from "ssh-key-decrypt";

var keyBuf = sshKeyDecrypt(
  process.env.PRIVATE_KEY,
  process.env.KEY_PASS
);

const key = new NodeRSA(null, { encryptionScheme: "pkcs1" });
key.importKey(keyBuf, "pkcs1-der");

const rsaEncryptPub = plainText => {
  return key.encrypt(plainText, "base64");
};

const rsaDecryptPrv = cipherText => {
  return key.decrypt(cipherText, "utf8");
};

const rsaEncryptPrv = plainText => {
  return key.encryptPrivate(plainText, "base64");
};

const rsaDecryptPub = cipherText => {
  return key.decryptPublic(cipherText, "utf8");
};

export const md5 = (plain, salt) => {
  return CryptoJS.MD5(`${salt}${plain}`).toString();
};

export const aesEncrypt = (plainText, aesKey) => {
  var aesCiphertext = CryptoJS.AES.encrypt(plainText, aesKey);
  var aesk = aesCiphertext.key.toString();
  var aesi = aesCiphertext.iv.toString();
  var aesCt = aesCiphertext.toString();

  return [aesCt, aesk, aesi];
};

export const aesDecrypt = (cipherText, aesKey, aesIv) => {
  const aesk = CryptoJS.enc.Hex.parse(aesKey);
  const aesi = CryptoJS.enc.Hex.parse(aesIv);
  return CryptoJS.AES.decrypt(cipherText, aesk, { iv: aesi }).toString(
    CryptoJS.enc.Utf8
  );
};

export const EncryptPrivate = (plainText, aesKey, aesDel, rsaDel) => {
  const aes = aesEncrypt(plainText, aesKey);
  const rsa = rsaEncryptPrv(aes[1] + aesDel + aes[2]);
  const cipherText = rsa + rsaDel + aes[0];
  return cipherText;
};

export const EncryptPublic = (plainText, aesKey, aesDel, rsaDel) => {
  const aes = aesEncrypt(plainText, aesKey);
  const rsa = rsaEncryptPub(aes[1] + aesDel + aes[2]);
  const cipherText = rsa + rsaDel + aes[0];
  return cipherText;
};

export const DecryptPrivate = (cipherText, aesDel, rsaDel) => {
  const ct = cipherText.split(rsaDel);
  const keys = rsaDecryptPrv(ct[0]).split(aesDel);
  const plainText = aesDecrypt(ct[1], keys[0], keys[1]);
  return plainText;
};

export const DecryptPublic = (cipherText, aesDel, rsaDel) => {
  const ct = cipherText.split(rsaDel);
  const keys = rsaDecryptPub(ct[0]).split(aesDel);
  const plainText = aesDecrypt(ct[1], keys[0], keys[1]);
  return plainText;
};

export const encryptResp = (plainText, aesKey, aesDel) => {
  const enc = aesEncrypt(plainText, aesKey);
  const payload = enc[0] + aesDel + enc[1] + aesDel + enc[2];
  return payload;
};

export const decryptResp = (cipherText, aesDel) => {
  var ct = cipherText.split(aesDel);
  const aesDecrypted = aesDecrypt(ct[0], ct[1], ct[2]);
  const payload = JSON.parse(aesDecrypted);
  return payload;
};
