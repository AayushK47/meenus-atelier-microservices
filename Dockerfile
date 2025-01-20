# Step 1: Use Node.js as the base image
FROM node:20.18-alpine

ARG APP_PACKAGE_NAME
ARG APP_PORT
ARG APP_DB_URL

WORKDIR /app

# required for some dependencies
RUN apk add --no-cache python3 make g++ 

COPY package.json package-lock.json

RUN yarn install --workspace=${PACKAGE_NAME}

COPY . .

RUN npx prisma generate


ENV PACKAGE_NAME ${APP_PACKAGE_NAME}
ENV PORT ${APP_PORT}
ENV DB_URL ${APP_DB_URL}
EXPOSE ${PORT}

CMD npm run start -w ${PACKAGE_NAME}