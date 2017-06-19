"use strict"

const crypto = require("crypto");
// const random = require("randomstring");
const ENCRYPTION_KEY = process.env.AUTHKEY;
// random.generate({
//   length:32,
//   charset: "alphabetic"
// }); // some random string
const IV_LENGTH = 16;

function encrypt(pwd) {
 let iv = crypto.randomBytes(IV_LENGTH);
 let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
 let encrypted = cipher.update(pwd);

 encrypted = Buffer.concat([encrypted, cipher.final()]);

 return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(pwd) {
 let textParts = pwd.split(':');
 let iv = new Buffer(textParts.shift(), 'hex');
 let encryptedText = new Buffer(textParts.join(':'), 'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
 let decrypted = decipher.update(encryptedText);

 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}

module.exports = { decrypt, encrypt };
