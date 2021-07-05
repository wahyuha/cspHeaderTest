import CryptoAES from "crypto-js/aes";
import CryptoEncHex from "crypto-js/enc-hex";
import CryptoEncUtf8 from "crypto-js/enc-utf8";

export const encrypt = (data, aeskey, aesDel, rsaDel) => {
  // eslint-disable-next-line
  var aesEncrypted = CryptoAES.encrypt(data, aeskey);
  var aesKey = aesEncrypted.key + aesDel + aesEncrypted.iv;
  var encryptedMessage = aesEncrypted.toString();

  // eslint-disable-next-line
  var rsa = new JSEncrypt();
  rsa.setPublicKey(process.env.SAPPER_APP_PUBLIC_KEY);
  var encryptedKey = rsa.encrypt(aesKey);
  var payload = encryptedKey + rsaDel + encryptedMessage;

  return payload;
};

export const decrypt = (cipherText, aesDel) => {
  var ct = cipherText.split(aesDel);

  const aesKey = CryptoEncHex.parse(ct[1]);
  const aesIv = CryptoEncHex.parse(ct[2]);
  var aesDecrypted = CryptoAES.decrypt(ct[0], aesKey, { iv: aesIv });
  var payload = JSON.parse(aesDecrypted.toString(CryptoEncUtf8));

  return payload;
};
