import { Context } from '../../utils';
// import { Question, QuestionCreateInput, QuestionUpdateInput } from '../../generated/prisma-client';

export const questions = {
  async createQuestion(parent, { input }, ctx: Context, info) {
    console.log('INPUT');
    console.log(input);
    const newQuestion = await ctx.db.createQuestion({
      ...input,
    });
    const newQuestionWithChoices = {
      ...newQuestion,
      choices: await ctx.db.question({ id: newQuestion.id }).choices(),
    };
    return {
      question: newQuestionWithChoices,
    };
  },

  async deleteQuestion(parent, { id }, ctx: Context, info) {
    const questionExists = await ctx.db.$exists.question({
      id,
    });
    if (!questionExists) {
      throw new Error(`Question not found or you're not authorized`);
    }

    return {
      question: await ctx.db.deleteQuestion({ id }),
    };
  },

  async updateQuestion(parent, { input: { id, patch } }, ctx: Context, info) {
    return {
      question: await ctx.db.updateQuestion({
        data: {
          ...patch,
        },
        where: {
          id,
        },
      }),
    };
  },
};
