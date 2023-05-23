import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const saltRounds = Number(process.env.SALT_ROUNDS) || 10;



async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = bcrypt.hash(password, salt);
  
  return hashedPassword;
}

async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export { hashPassword, comparePassword };
