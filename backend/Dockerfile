FROM node AS builder

WORKDIR /backend

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma

RUN npx prisma generate

COPY tsconfig*.json nest-cli.json ./

COPY src ./src

RUN npm run build

FROM node

WORKDIR /backend

COPY package*.json ./

COPY --from=builder /backend/node_modules ./node_modules
COPY --from=builder /backend/prisma ./prisma
COPY --from=builder /backend/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:container"]

