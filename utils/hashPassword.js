import bcrypt from 'bcryptjs';

const saltRounds = 10;

const hashUserPassword = async (password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

export default hashUserPassword;
