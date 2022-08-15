FROM node:14-alpine AS development
ENV NODE_ENV development
# Add a work directory
RUN mkdir /server
WORKDIR /server
# Cache and Install dependencies
COPY ./server/package.json /server
COPY ./server/yarn.lock /server
RUN yarn install
# Copy app files
COPY ./server /server
# Expose port
EXPOSE 8080
# Start the app
CMD ["yarn", "start"]