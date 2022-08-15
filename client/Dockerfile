FROM node:14-alpine AS development
ENV NODE_ENV development
# Add a work directory
RUN mkdir /client
WORKDIR /client
# Cache and Install dependencies
COPY ./client/package.json /client
COPY ./client/yarn.lock /client
RUN yarn install
# Copy app files
COPY ./client /client
# Expose port
EXPOSE 3000
# Start the app
CMD ["yarn", "serve"]