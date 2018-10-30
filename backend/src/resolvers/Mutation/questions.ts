import { Context } from '../../utils';
import { Question, QuestionCreateInput, QuestionUpdateInput } from '../../generated/prisma';

export interface QuestionPayload {
  question: Question;
}

export const questions = {
  async createQuestion(
    parent,
    { input }: { input: QuestionCreateInput },
    ctx: Context,
    info,
  ): Promise<QuestionPayload> {
    const newQuestion = await ctx.db.createQuestion({
      ...input,
    });
    return {
      question: newQuestion,
    };
  },

  async deleteQuestion(parent, { id }, ctx: Context, info): Promise<QuestionPayload> {
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

  async updateQuestion(
    parent,
    { input: { id, patch } },
    ctx: Context,
    info,
  ): Promise<QuestionPayload> {
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
