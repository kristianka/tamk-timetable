const db = db.getSiblingDB('timetables_db');

db.createCollection('users');

db.users.insertOne({
  id: 1,
  username: 'test name',
  password: 'testpassword'
});

db.createCollection('timetables');

db.timetables.insertOne({
  id: 1,
  userId: 1,
  codes: [1, 2]
});