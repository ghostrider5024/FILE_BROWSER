const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = 8000;
const BASE_DIR = process.argv[2] ?? "/home/thank/Desktop/Trashes/Dumps";

const TEMPLATE = fs.readFileSync(
  path.join(__dirname, "template.html"),
  "utf-8"
);

const getClientIp = (req) => {
  let clientIP = req.socket.remoteAddress;

  // Normalize IPv6-mapped IPv4
  if (clientIP.startsWith("::ffff:")) {
    clientIP = clientIP.replace("::ffff:", "");
  } else if (clientIP === "::1") {
    clientIP = "127.0.0.1";
  }

  return clientIP;
};

const server = http.createServer((req, res) => {
  const decodedPath = decodeURIComponent(req.url);
  const filePath = path.join(BASE_DIR, decodedPath);

  const clientIP = getClientIp(req);
  console.log(`🛰️ [${clientIP}] ${req.method} ${req.url}`);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.log(`❌ Không tìm thấy: ${filePath}`);
      res.writeHead(404);
      res.end("<h1>404 Not Found</h1>");
      return;
    }

    if (stats.isDirectory()) {
      console.log(`📁 Đang truy cập thư mục: ${filePath}`);
      fs.readdir(filePath, { withFileTypes: true }, (err, files) => {
        if (err) {
          console.log(`🚨 Lỗi đọc thư mục: ${filePath}`);
          res.writeHead(500);
          res.end("<h1>Error reading directory</h1>");
          return;
        }

        const parts = req.url.split("/").filter(Boolean);
        const breadcrumb =
          parts
            .map((part, index) => {
              const link = "/" + parts.slice(0, index + 1).join("/");
              return `<a href="${link}/">${part}</a>`;
            })
            .join(" / ") || '<a href="/">Home</a>';

        const list = files
          .map((file) => {
            const name = file.name + (file.isDirectory() ? "/" : "");
            const url = path.join(req.url, name).replace(/\\/g, "/");
            const icon = file.isDirectory() ? "📁" : "📄";

            return `<tr><td>${icon}</td><td><a href="${url}">${name}</a></td></tr>`;
          })
          .join("");

        const html = TEMPLATE.replace(/{{path}}/g, req.url)
          .replace(/{{breadcrumb}}/g, breadcrumb)
          .replace(/{{list}}/g, list);

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      });
    } else {
      console.log(`📄 Đang lấy file: ${filePath}`);
      const ext = path.extname(filePath).toLowerCase();
      const mime =
        {
          ".html": "text/html",
          ".js": "application/javascript",
          ".css": "text/css",
          ".json": "application/json",
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".gif": "image/gif",
          ".txt": "text/plain",
        }[ext] || "application/octet-stream";

      fs.readFile(filePath, (err, content) => {
        if (err) {
          console.log(`🚨 Lỗi đọc file: ${filePath}`);
          res.writeHead(500);
          res.end("<h1>Error loading file</h1>");
          return;
        }

        res.writeHead(200, { "Content-Type": mime });
        res.end(content);
      });
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  const interfaces = os.networkInterfaces();
  const lanIP = Object.values(interfaces)
    .flat()
    .find((i) => i.family === "IPv4" && !i.internal)?.address;

  console.log(`📂 Server running at:`);
  console.log(`  → Local:   http://localhost:${PORT}/`);
  console.log(`  → Network: http://${lanIP}:${PORT}/`);
});
