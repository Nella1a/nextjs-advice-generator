FROM node:21

# ENV NODE_ENV production
# ENV NODE_PATH /opt/frontend/node_modules
# ENV PATH $NODE_PATH/.bin:$PATH

RUN mkdir -p /opt/frontend
WORKDIR /opt/frontend

# copy folders & files
COPY src ./src/
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
    # netcat -  to check if a specific TCP port on a given host is open. This is important for ensuring that your database service is ready before your application attempts to connect to it.

RUN NODE_ENV=development npm install
RUN npx next telemetry disable

# wait for db to start
RUN chmod +x /opt/frontend/*.sh

EXPOSE 3000
CMD ./run.sh