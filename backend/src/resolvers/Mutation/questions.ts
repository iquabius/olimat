import { Context } from '../../utils';
import * as fs from 'fs';
import * as mv from 'mv';
import * as path from 'path';
// import { Question, QuestionCreateInput, QuestionUpdateInput } from '../../generated/prisma-client';

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
    console.log('Patch imageUrl:');
    console.log(patch.imageUrl);
    // Check if imageUrl is different from the one in the database
    // That would mean a new image was uploaded and needs to replace the old one.
    const question = await ctx.db.question({ id });
    console.log('Database imageUrl:');
    console.log(question.imageUrl);
    if (patch.imageUrl !== '' && patch.imageUrl !== question.imageUrl) {
      const oldFile = path.join(ctx.appConfig.uploads.publicDir, question.imageUrl);
      // Remove old image from the file system if it exists
      fs.unlink(oldFile, err => {
        if (err) {
          throw err;
        }
        console.log('Old image existed, and it was deleted.');
      });
      // Move new image to public directory
      const newFile = path.join(ctx.appConfig.uploads.tempDir, patch.imageUrl);
      const destNewFile = path.join(ctx.appConfig.uploads.publicDir, patch.imageUrl);
      // Maybe we don't need 'mv' package.
      // https://nodejs.org/api/fs.html#fs_fs_rename_oldpath_newpath_callback
      mv(newFile, destNewFile, err => {
        if (err) {
          console.error(
            'There was an error moving the uploaded image from temp to public directory.',
          );
          throw new Error(err);
        }
      });
    }
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
