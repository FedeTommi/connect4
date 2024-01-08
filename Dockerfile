FROM node:21.5.0 as base

RUN echo "base"

# Create app directory
WORKDIR /usr/src/app

FROM base as build

RUN echo "stage1"

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
ADD package*.json ./

RUN npm install

# Copy app source
COPY . .

RUN npm run build

RUN npm run tsc -- --project tsconfig.production.json

FROM base as run

RUN echo "stage2"

ADD package*.json ./

RUN npm install --omit=dev

COPY --from=build /usr/src/app/dist /usr/src/app/dist

COPY --from=build /usr/src/app/index.js /usr/src/app/index.js

EXPOSE 1234
CMD [ "node", "index.js" ]