const client = require('./client');
const {
  createEvent, getEventById, updateEvent
} = require('./index.js');

const dropTables = async () => {
  try {
    console.log('Starting to drop all tables...');
    await client.query(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS events;
    `);
    console.log('Finished droppping all tables successfully!');
  } catch (error) {
    console.error('Error dropping tables');
    throw error;
  }
};

const createTables = async () => {
  try {
    console.log('Starting to create all tables...');
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    CREATE TABLE events(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      date DATE DEFAULT NULL,
      time TIME DEFAULT NULL,
      location VARCHAR(255) DEFAULT NULL
    );
    `);
    console.log(
      'Finished creating all tables successfully! Now, to add some data!'
    );
  } catch (error) {
    console.error('Error creating tables');
    throw error;
  }
};

const createInitialUsers = async () => {
  console.log('Adding initial users to "Users" table...');
  console.log('Finished adding users!');
};

const createInitialEvents = async () => {
  console.log('Starting to add initial events');
  const eventsToCreate = [
    {
      name: 'Item 1',
      date: '2024-02-14'
    },
    {
      name: 'Item 2',
      date: '2024-02-13'
    },
    {
      name: 'Item 3',
    },
    {
      name: 'Item 4',
      date: '2024-02-12'
    },
    {
      name: 'Item 5',
      date: '2024-02-12'
    },
    {
      name: 'Item 6',
      date: '2024-02-06'
    },
  ]
  const events = await Promise.all(
    eventsToCreate.map((event) => createEvent(event))
  );
  console.log(events);
  console.log('Finished adding initial events!');
}

const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialEvents();
  } catch (error) {
    console.error('Error during rebuildDB', error);
    throw error;
  } finally {
    await client.end();
    console.log("Database has been rebuilt, and you're good to go!");
  }
};

rebuildDB();
