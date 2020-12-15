import express from "express";
import routes from "./routes";

const app = express();

app.get("/", (request, response) => response.json({ message: "Hey!" }));

app.listen(3330, () => {
  // eslint-disable-next-line no-console
  console.log("🚀 Server started on port 3330");
});
