const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dashboardDir = path.join(root, "dashboard");

if (fs.existsSync(dashboardDir) && fs.statSync(dashboardDir).isDirectory()) {
  execSync("npm run dashboard:install", {
    cwd: root,
    stdio: "inherit",
    shell: true,
  });
}
