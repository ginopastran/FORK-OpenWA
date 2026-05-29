const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./data/openwa.sqlite");
db.serialize(() => {
  db.run("DELETE FROM webhooks");
  db.all("SELECT id, sessionId, url FROM webhooks", (err, rows) => {
    console.log("webhooks", err || rows);
    db.close();
  });
});
