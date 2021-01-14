import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    // password -> non authenticated password, used for logging in
    // user.password -> authenticated password, from the database
    // the compare method, from typeorm, checkes if they match

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
