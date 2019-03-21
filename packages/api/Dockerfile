FROM node:10.15.3-alpine

WORKDIR /usr/src/olimat

COPY packages/tsconfig.base.json ./packages/tsconfig.base.json
COPY packages/api ./packages/api

RUN npm --prefix packages/api install

# docker-compose run --workdir="/usr/src/olimat/packages/api" -e PRISMA_MANAGEMENT_API_SECRET="my-prisma-management-secret" api npx prisma deploy
# docker-compose run --workdir="/usr/src/olimat/packages/api" -e PRISMA_MANAGEMENT_API_SECRET="my-prisma-management-secret" api npx prisma seed

RUN npm --prefix packages/api run prebuild
RUN npx typescript -p packages/api/tsconfig.json

# Remove devDependencies
# We can uncomment this after we find a better way to deploy and seed the DB with Prisma
# RUN cd packages/api && npm prune --production
