import express from 'express';
import { Prisma, User, Question, PageInfo, OlympiadEdge } from './__generated__/prisma-client';

export interface Context {
  prisma: Prisma;
  req: express.Request;
  config: any;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface OlympiadFeed {
  pageInfo: PageInfo;
  edges: OlympiadEdge[];
}

export interface QuestionPayload {
  question?: Question;
}
