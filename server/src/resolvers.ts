import * as bcrypt from 'bcryptjs';
import { IResolvers } from 'graphql-tools';

import { User } from './entity/User';

export const resolvers: IResolvers = {
  Query: {
    me: (_, __, { req }) => {
      const userId = req.session.userId;
      if (!userId) {
        return null;
      }
      return User.findOne(userId);
    },
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const hashedPasswd = await bcrypt.hash(password, 10);
      User.create({
        email,
        password: hashedPasswd,
      }).save();

      return true;
    },
    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return null;
      }
      req.session.userId = user.id;
      return user;
    },
  },
};