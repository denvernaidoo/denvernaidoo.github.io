const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;

  // Set default file to serve
  if (filePath === './') {
    filePath = './index.html';
  }

  // Resolve the file path
  filePath = path.resolve(filePath);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.statusCode = 404;
      res.end('File not found!');
    } else {
      // Read the file and serve it
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, {
            'Content-Type': getContentType(filePath),
          });
          res.end(data);
        }
      });
    }
  });
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// Function to get the content type based on file extension
function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.png':
      return 'image/png';
    case '.jpg':
      return 'image/jpeg';
    default:
      return 'application/octet-stream';
  }
}
