FROM node:20-slim as development

WORKDIR /usr/src/app

COPY package*.json ./

# COPY prisma .

COPY .env ./

RUN apt-get update -y && apt-get install -y openssl

RUN npm ci --quiet

RUN npm install -g dotenv-cli

COPY . .

RUN npm run build

# RUN npx prisma generate

# RUN dotenv -e .env -- npx prisma migrate deploy

FROM node:20-slim as production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

COPY --from=development /usr/src/app/node_modules ./node_modules

COPY --from=development /usr/src/app/package*.json ./

COPY --from=development /usr/src/app/dist ./dist

# COPY --from=development /usr/src/app/prisma ./prisma

# COPY --from=development /usr/src/app/node_modules/.prisma ./node_modules/.prisma

RUN apt-get update -y && apt-get install -y openssl

RUN npm ci --only=production --quiet

# RUN npx prisma generate

CMD ["npm", "run", "start" ]