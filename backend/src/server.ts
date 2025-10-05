// This file starts the server and listens on a port

// src/server.ts
//This imports the Express app instance that we defined in app.ts.
// Even though the source file is app.ts, when using ES Modules (ESM) in Node.js, the runtime compiles/transpiles TypeScript to JavaScript first.
// Node.js ESM expects .js extensions when importing, even if the original file is .ts.
// That’s why we write ./app.js instead of ./app.ts.
// Essentially, Node.js sees the compiled JS file, not the TS file.
import app from './app.js'; // Important: add .js for ESM

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});