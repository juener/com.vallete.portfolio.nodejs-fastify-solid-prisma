FROM node:18-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npx prisma generate
RUN npx prisma migrate
EXPOSE 3601
CMD ["./usr/wait-for-it.sh", "postgresql:5432", "--", "npm", "run", "start"]