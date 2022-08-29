FROM node:14-alpine AS development
ENV NODE_ENV development
RUN mkdir /server
WORKDIR /server
COPY ./server/package.json /server
RUN yarn install
COPY ./server /server
EXPOSE 8080
CMD ["yarn", "start"]