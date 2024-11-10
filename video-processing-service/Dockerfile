# base image: node 18 runtime built on top of linux docker image
# stage 1: build
FROM node:18 AS builder

# build own image on top of node 18
# set working directory in container to app
WORKDIR /app

# copy package.json and package-lock.json into working directory
COPY package*.json ./

# install packages spec in package.json
RUN npm install

# copy app source inside docker image
COPY . .

# build app
RUN npm run build

# stage 2: production
FROM node:18

# install ffmpeg in container
RUN apt-get update && apt-get install -y ffmpeg

# set working directory
WORKDIR /app

# copy package.json and package-lock.json into working directory
COPY package*.json ./

# install only prod dep (express and fluent ffmpeg)
RUN npm install --only=production

# copy built app (COMPILED FILES ONLY, not actual src files) from builder stage
# this stage is used to run the app - making it smaller makes the app faster
COPY --from=builder /app/dist ./dist

# make port 3000 available outside container
EXPOSE 3000

# define command to run app using CMD
CMD [ "npm", "run", "serve" ]


