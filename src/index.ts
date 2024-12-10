import { Elysia } from "elysia";
import { getBooks,createBook } from "./model";
const app = new Elysia()

app.get('/books', () => {
  return getBooks()})

app.post('/book', ({ body,set }) => {
 
  const response = createBook({
    name: body.name,
    author: body.author,  
    price: body.price
  })
  if(response.status === 'error') 
    {
      set.status = 400
      return {message:'insert incomplete'}
    }

  return {message:'ok'}
})

.listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
