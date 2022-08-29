FROM node:14-alpine AS development
ENV NODE_ENV development
RUN mkdir /client
WORKDIR /client
COPY ./client/package.json /client
RUN yarn install
COPY ./client /client
EXPOSE 3000
CMD ["yarn", "serve"]