#!/bin/bash
# difference between /bin/sh and /bin/bash ??? different syntax
# get some more info about netcat? why needed --> google

set -ex

# Set DATABASE_HOST to 'postgresdb' if not set
DATABASE_HOST="${DATABASE_HOST:-postgresdb}"

# Set the NPM command based on the environment
if [ $NODE_ENV = "production" ]; then
    NPM_CMD="start"
else
    # Install dev dependencies if not in production
    npm install
    NPM_CMD="dev"
fi

echo "Wait for database to be ready.."
# Wait for the database to start using wait-for.sh script
sh -c "./wait-for.sh ${DATABASE_HOST}:5432"

# Check if the wait-for.sh script was successful
if [ $? -ne 0 ]; then
    echo "Timeout waiting for the database. Exiting."
    exit 1
fi

echo "Running database migrations..."
# Run Prisma migrations
npx prisma migrate dev

echo "Disabling Next.js telemetry..."
# Disable Next.js telemetry
npx next telemetry disable

echo "Starting the application..."
# Start the application
exec npm run $NPM_CMD