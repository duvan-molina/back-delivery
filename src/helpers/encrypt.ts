import * as bcrypt from 'bcryptjs';

export const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const decodePassword = async (
  inputPassword: string,
  userPassword: string,
) => {
  return await bcrypt.compare(inputPassword, userPassword);
};

export const SECRET_KEY = 'HELLO_WORLD';
