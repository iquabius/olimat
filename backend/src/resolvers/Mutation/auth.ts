import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

// O primeiro argumento dos resolvers, 'parent', sempre será
// vazio porque ele se refere à raíz do grafo.
export const auth = {
  async signup(_, args, ctx, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.prisma.createUser({ ...args, password });

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    };
  },

  async login(_, { email, password }, ctx, info) {
    const user = await ctx.prisma.user({ email });
    if (!user) {
      throw new Error(`No such user found for email: ${email}`);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    };
  },
};
