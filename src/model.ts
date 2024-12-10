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
// console.log(createBook({name:'book1',author:'author1',price:100}))

const updateBook = (id:number,book : any)=>{
    try {
        const query = db.query(`
            update books set "name"=$name , "author"=$author , "price"=$price where id = $id;`)
    query.run({
        $id:id,
        $name:book.name,
        $author:book.author,
        $price:book.price
    })
    } catch (error) {
        console.log(error);
        return [];
    }
}
updateBook(1,{name:'a',author:'b',price:400})
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


