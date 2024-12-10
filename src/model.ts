import { Database } from "bun:sqlite";

const db = new Database('mydb.sqlite');

const createBook = (book : any)=>{
    try {
        const query = db.query(`
            INSERT INTO books
    ("name", "author", "price")
    VALUES ($name, $author, $price);`)
    query.run({
        $name:book.name,
        $author:book.author,
        $price:book.price
    })
    } catch (error) {
        
    }
}
console.log(createBook({name:'book1',author:'author1',price:100}))

const getBooks = () =>{
    try {
        const query = db.query(`SELECT * from 'books'`);
        return query.all()

    } catch (error) {
        console.log(error);
        return [];
    }
}
console.log(getBooks());
const getBook = (id:number  ) =>{
    try {
        const query = db.query(`SELECT * from books where id = $id;`)
        return query.get({
            $id:id
        })


    } catch (error) {
        console.log(error);
        return [];
    }
}
console.log(getBook(1));


