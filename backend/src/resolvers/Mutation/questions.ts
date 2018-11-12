import { Context } from '../../utils';
import * as mv from 'mv';
import * as path from 'path';
// import { Question, QuestionCreateInput, QuestionUpdateInput } from '../../generated/prisma-client';

const filesHost = 'http://localhost:4000/files';

export const questions = {
  async createQuestion(parent, { input }, ctx: Context, info) {
    // move image file from tmp to public directory, if there's one
    if (input.imageUrl !== '') {
      const tempFile = path.join(ctx.appConfig.uploads.tempDir, input.imageUrl);
      const destFile = path.join(ctx.appConfig.uploads.publicDir, input.imageUrl);
      mv(tempFile, destFile, err => {
        if (err) {
          throw new Error(err);
        }
      });
    }
    const newQuestion = await ctx.db.createQuestion({
      ...input,
    });
    const newQuestionWithChoices = {
      ...newQuestion,
      imageUrl: newQuestion.imageUrl ? filesHost + '/' + newQuestion.imageUrl : null,
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
    const updatedQuestion = await ctx.db.updateQuestion({
      data: {
        ...patch,
      },
      where: {
        id,
      },
    });
    return {
      question: {
        ...updatedQuestion,
        choices: await ctx.db.question({ id: updatedQuestion.id }).choices(),
      },
    };
  },
};
