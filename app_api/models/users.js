const crypto = require('crypto');
const path = require('path');

let mongoose;
try {
  mongoose = require('mongoose');
} catch (_err) {
  mongoose = null;
}

const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { salt, hash };
};

if (mongoose) {
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

  if (!mongoose.models.users) {
    mongoose.model('users', userSchema);
  }

  module.exports = mongoose.model('users');
} else {
  const users = require(path.join(__dirname, '..', '..', 'data', 'users.json'));

  class User {
    constructor({ username, name, hash, salt }) {
      this.username = username;
      this.name = name;
      this.hash = hash;
      this.salt = salt;
    }

    setPassword(password) {
      const { salt, hash } = hashPassword(password);
      this.salt = salt;
      this.hash = hash;
    }

    validPassword(password) {
      const { hash } = hashPassword(password, this.salt);
      return this.hash === hash;
    }

    async save() {
      const existingIndex = users.findIndex((user) => user.username === this.username);
      const plainUser = {
        username: this.username,
        name: this.name,
        hash: this.hash,
        salt: this.salt,
      };

      if (existingIndex >= 0) {
        users[existingIndex] = plainUser;
      } else {
        users.push(plainUser);
      }

      return this;
    }

    toJSON() {
      return {
        username: this.username,
        name: this.name,
        hash: this.hash,
        salt: this.salt,
      };
    }

    static async findOne(query) {
      const found = users.find((user) => user.username === query.username);
      return found ? new User(found) : null;
    }
  }

  module.exports = User;
}
