print("Started Adding the Users.");
db = db.getSiblingDB("todo");
db.createUser({
  user: "backendUser",
  pwd: "someoneherelikespotatoes",
  roles: [{ role: "readWrite", db: "todo" }],
});
print("End Adding the User Roles.");
