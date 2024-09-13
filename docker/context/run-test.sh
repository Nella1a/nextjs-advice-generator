#!/bin/bash

# Set DATABASE_HOST to 'advice_app_db' if not set
DATABASE_HOST="${DATABASE_HOST:-test_advice_app_db}"

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

# Check if the wait-for.sh script was successful by
# checking the exit code "$?"" of the previous command
# value of 0 indicates success
if [ $? -ne 0 ]; then
    echo "Timeout waiting for the database. Exiting."
    exit 1
fi

echo "Running database migrations..."
# Run Prisma migrations
npx prisma migrate dev


echo "Starting the application..."
# Start the application
exec npm run $NPM_CMD