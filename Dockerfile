FROM node:6-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY dist dist
EXPOSE 8000
CMD npm start