import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

async function hashPassword(password: string) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      return hash;
    });
  });
}

async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export { hashPassword, comparePassword };
