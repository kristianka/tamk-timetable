const db = db.getSiblingDB("timetables_db");

db.createCollection("users");

db.users.insertOne({
  username: "Henri",
  password: "$2b$10$uOTAlkXF56qLhHOi.ylqcOOd1aW4POASmAHIPfEGLCJG7g8f/uu1S"
});

db.users.insertOne({
  username: "Kristian",
  password: "$2b$10$9zM9KqqRz60wYlbDMXVg/uyC1zof7eKQ.t8AucviO7R1tyE4iBNeG"
});

db.users.insertOne({
  username: "Niko",
  password: "$2b$10$InSDmmmqn1hll.qNsCMvoOh5PCM1ze1zy/17758/vXFpVLuR.LKyO"
});

db.createCollection("timetables");

db.timetables.insertOne({
  userId: "1",
  codes: [1, 2]
});