FROM node:21

# ENV NODE_ENV production
# ENV NODE_PATH /opt/frontend/node_modules
# ENV PATH $NODE_PATH/.bin:$PATH

RUN mkdir -p /opt/frontend
WORKDIR /opt/frontend

# copy folders & files
COPY src ./src/
#COPY .env ./
COPY public ./public/
COPY prisma ./prisma/
COPY .eslintrc.json ./
COPY next.config.mjs ./
COPY package.json ./
COPY package-lock.json ./
COPY postcss.config.mjs ./
COPY prisma.ts ./
COPY tailwind.config.ts ./
COPY tsconfig.json ./
COPY docker/context/run.sh ./
COPY docker/context/wait-for.sh ./

RUN mkdir -p /opt/frontend/static && \
    apt-get update && \
    apt-get --assume-yes install netcat-traditional
    # needed to make wait for work -helps to connect to db

RUN NODE_ENV=development npm install

# wait for db to start

RUN chmod +x /opt/frontend/*.sh


#RUN npm run build

EXPOSE 3000

CMD ./run.sh