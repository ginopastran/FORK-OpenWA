const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "..", "data", "openwa.sqlite");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.all("SELECT id, name FROM sessions", (err, rows) => {
    console.log("sessions", err || rows);
  });
  db.all("SELECT id, sessionId, url FROM webhooks", (err, rows) => {
    console.log("webhooks", err || rows);
  });
  db.get("SELECT sql FROM sqlite_master WHERE type='table' AND name='sessions'", (err, row) => {
    console.log("sessions_schema", err || row);
  });
  db.get("PRAGMA foreign_key_list(webhooks)", (err, row) => {
    console.log("fk_list", err || row);
  });
  db.get("PRAGMA foreign_keys", (err, row) => {
    console.log("foreign_keys_on", err || row);
  });
  db.run(
    `INSERT INTO webhooks(id,sessionId,url,events,secret,headers,active,retryCount) VALUES (?,?,?,?,?,?,1,3)`,
    [
      "test-webhook-id-123",
      "16bf221f-b83d-44cd-9d95-cd9190bbe25b",
      "http://127.0.0.1:3000/api/admin/whatsapp/webhook",
      '["message.received"]',
      null,
      "{}",
    ],
    function (err) {
      console.log("insert_test", err || this.lastID);
      db.close();
    }
  );
});
