# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /
COPY . .
RUN yarn install --production
CMD ["node", "yarn dev"]
EXPOSE 3000