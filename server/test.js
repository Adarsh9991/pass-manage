// utils/encryption.js
const crypto = require('crypto');
const algorithm = 'AES-256-CBC';
const secrete_key = "asgjdh-hfgsjd"
const secrete_iv = "smslt"
const key = crypto.createHash('sha512').update(secrete_key,'utf-8').digest('hex').substr(0,32)
const iv = crypto.createHash('sha512').update(secrete_iv,'utf-8').digest('hex').substr(0,16)

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

console.log("DATA___",encrypt("Adarsh_MALI"))
console.log("DATA___",decrypt("RlcyWVYzWjk1STVyYjkvSm9EaGtGZz09"))

module.exports = { encrypt, decrypt };