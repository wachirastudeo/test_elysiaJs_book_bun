import { Elysia } from "elysia";
import { getBooks,createBook,getBook} from "./model";
const app = new Elysia()

app.get('/books', () => {
  return getBooks()})
  
app.get('/book/:id', ({params}) => {
  return getBook(parseInt(params.id))
  })

app.post('/book', ({ body,set }) => {
  const bookBody:any = body
  const response = createBook({
    name: bookBody.name,
    author: bookBody.author,  
    price: bookBody.price
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
