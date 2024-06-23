// // utils/encryption.js

// utils/encryption.js
const crypto = require('crypto');
const algorithm = 'AES-256-CBC';
const secerete_key = "asgjdh-hfgsjd"
const secerete_iv = "smslt"
const key = crypto.createHash('sha512').update(secerete_key,'utf-8').digest('hex').substr(0,32)
const iv = crypto.createHash('sha512').update(secerete_iv,'utf-8').digest('hex').substr(0,16)

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text,'utf-8','base64')+cipher.final('base64');
  return Buffer.from(encrypted).toString('base64')
}

function decrypt(text) {
 const buff = Buffer.from(text,'base64');
 let encrypedMsg = buff.toString('utf-8');
 var decryptor = crypto.createDecipheriv(algorithm,key,iv)
 return decryptor.update(encrypedMsg,'base64','utf8') + decryptor.final('utf8')
}


module.exports = { encrypt, decrypt };






























// const crypto = require('crypto');
// const algorithm = 'aes-256-cbc';
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);

// function encrypt(text) {
//   let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
//   let encrypted = cipher.update(text);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);
//   return iv.toString('hex') + ':' + encrypted.toString('hex');
// }

// function decrypt(text) {
//   let textParts = text.split(':');
//   let iv = Buffer.from(textParts.shift(), 'hex');
//   let encryptedText = Buffer.from(textParts.join(':'), 'hex');
//   let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
//   let decrypted = decipher.update(encryptedText);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
// }

// module.exports = { encrypt, decrypt };