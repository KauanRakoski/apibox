"use strict";

var crypto = require('crypto');

var algorithm = 'aes-256-ctr';
var secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
var iv = crypto.randomBytes(16);

var encrypt = function encrypt(text) {
  var cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  var encrypted = Buffer.concat([cipher.update(text), cipher["final"]()]);
  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
};

var decrypt = function decrypt(hash) {
  var decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
  var decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher["final"]()]);
  return decrpyted.toString();
};

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
};