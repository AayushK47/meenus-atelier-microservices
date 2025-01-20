# Step 1: Use Node.js as the base image
FROM node:20.18-alpine

ARG APP_PACKAGE_NAME
ARG APP_PORT
ARG APP_DB_URL

# Set the working directory inside the container
WORKDIR /app

RUN apk add --no-cache python3 make g++ 

# Step 2: Copy package.json and yarn.lock files
COPY package.json package-lock.json

# Step 3: Install dependencies using Yarn
RUN yarn install --workspace=${PACKAGE_NAME}


# Step 4: Copy the project source code
COPY . .

RUN npx prisma generate

# Step 5: Build the project
RUN npm run --workspace=${APP_PACKAGE_NAME} build

ENV PACKAGE_NAME ${APP_PACKAGE_NAME}
ENV PORT ${APP_PORT}
ENV DB_URL ${APP_DB_URL}
EXPOSE ${PORT}

# Define the command to run your app with variable expansion
CMD npm run start -w ${PACKAGE_NAME}