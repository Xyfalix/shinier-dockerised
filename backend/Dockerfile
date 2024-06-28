FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

ENV DATABASE_URL=mongodb+srv://niclim90:wVJYuKCcEs79dnLi@student-cluster.qmesyvj.mongodb.net/shinier?retryWrites=true&w=majority
ENV SECRET=SEIRocks!

CMD ["npm", "run", "dev:express"]