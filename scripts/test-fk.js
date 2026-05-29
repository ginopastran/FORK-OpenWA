const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "..", "data", "openwa.sqlite");
const sessionId = "16bf221f-b83d-44cd-9d95-cd9190bbe25b";
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run("PRAGMA foreign_keys=ON");
  db.get("PRAGMA foreign_keys", (e, r) => console.log("foreign_keys", r));
  db.get("SELECT id FROM sessions WHERE id = ?", [sessionId], (e, r) =>
    console.log("session_lookup", e || r)
  );
  db.run("DELETE FROM webhooks WHERE id IN ('test-webhook-id-123','test2','test3')");
  db.run(
    `INSERT INTO webhooks(id,sessionId,url,events,secret,headers,active,retryCount)
     VALUES (?,?,?,?,?,?,1,3)`,
    [
      "test3",
      sessionId,
      "http://127.0.0.1:3000/api/admin/whatsapp/webhook",
      '["message.received"]',
      "dev-admin-key",
      "{}",
    ],
    function (err) {
      console.log("insert_with_fk_on", err ? err.message : "ok");
      db.all("SELECT id, sessionId FROM webhooks", (e, rows) => {
        console.log("webhooks_after", rows);
        db.close();
      });
    }
  );
});
