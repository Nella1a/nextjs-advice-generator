# nextjs-advice-generator-app

This project is inspired by a [Frontend Mentor](https://www.frontendmentor.io/home) challenge, which involves creating an advice generator app using the [Advice Slip API](https://api.adviceslip.com/).

I extended the challenge to enhance my skills in working with APIs and dockerizing applications. In addition to fetching general advice, I've implemented features like searching for advice by keyword and saving or deleting advice in a PostgreSQL database. I've also dockerized the app as part of my learning process. Additionally, I built this app with a different tech stack to further expand my practice. You can find the React version of the advice generator app [here](https://github.com/Nella1a/react-advice-generator-app).

## Setup

### Clone the repository

First, clone the repository. Then, you can run the application either using Docker or local (without Docker).

```
git clone https://github.com/Nella1a/nextjs-advice-generator.git
```


#### Run with Docker 

 1. Make sure that you have a reasonably recent version of docker installed & running
 2. Make sure you have docker-compose installed

For development, a docker-compose.override-example.yaml file with helpful settings you might need is provided.
The file also opens a database port so you can connect to it with your local database client. 
After copying the example file to docker-compose.override.yaml, Docker Compose will automatically apply the overrides. 
The docker-compose.yaml file runs a Next.js app along with a PostgreSQL database in a Docker stack.
You can freely modify the docker-compose.override.yaml file, as it's excluded from version control by being listed in .gitignore. 

```
cp docker-compose.override-example.yaml docker-compose.override.yaml
```


Start the entire application stack: 

```
docker compose up
```

#### Run Local (without Docker)

Ensure that you have a PostgreSQL instance running, then create a database and user.

```sql
 CREATE DATABASE mydatabase;
 CREATE USER myuser WITH PASSWORD 'mypassword';
 GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;
```

**Note:** The last command grants the user myuser full access to the database mydatabase.

Install dependencies

```
npm run install
```


Run Prisma migrations

```
npx prisma migrate dev
```


Run application

```
npm run start
```


Open <http://localhost:3000> on your browser.

