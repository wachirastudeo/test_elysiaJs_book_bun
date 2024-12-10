import { Elysia } from "elysia";
import { getBooks } from "./model";
const app = new Elysia()

app
.get('/', () => 
  getBooks())
.listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
