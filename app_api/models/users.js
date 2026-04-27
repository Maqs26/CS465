const crypto = require('crypto');

let mongoose;

try {
  mongoose = require('mongoose');
} catch (_err) {
  throw new Error('Mongoose is required. Run `npm install mongoose` before using User model.');
}

const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { salt, hash };
};

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
});

userSchema.methods.setPassword = function setPassword(password) {
  const { salt, hash } = hashPassword(password);
  this.salt = salt;
  this.hash = hash;
};

userSchema.methods.validPassword = function validPassword(password) {
  const { hash } = hashPassword(password, this.salt);
  return this.hash === hash;
};

module.exports = mongoose.models.users || mongoose.model('users', userSchema);
