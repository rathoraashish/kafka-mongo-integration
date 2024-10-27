import express, { Request, Response } from "express";
import { init } from "./start-service";

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(express.json());

init();

// Basic route
app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, from consumer!").status(200);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
