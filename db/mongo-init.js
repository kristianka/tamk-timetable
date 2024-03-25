const db = db.getSiblingDB('timetables_db');

db.createCollection('user');

db.user.insertOne({
  id: 1,
  username: 'test name',
  password: 'testpassword'
});

db.createCollection('timetable');

db.timetable.insertOne({
  id: 1,
  userId: 1,
  codes: [1, 2]
});