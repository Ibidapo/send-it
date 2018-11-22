import bcrypt from 'bcrypt';

const saltRounds = 10;

class Encryption {
  static encryptPassword(password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

export default Encryption;
