import express, { Request, Response } from "express";
import router from "./routes/route";
import { init } from "./start-service";

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

init();

// Basic route
app.get("/hello", (req: Request, res: Response) => {
  console.log("Data is", req.body)
  res.send("Hello, world!").status(200);
});

// Basic route
app.use("/producer", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
