import * as bcrypt from 'bcrypt';
export class EncryptService {
  async encrypt(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      throw new Error(error);
    }
  }

  async compare(password: string, hash: string): Promise<boolean> {
    try {
      const match = await bcrypt.compare(password, hash);
      return match;
    } catch (error) {
      return false;
    }
  }
}
