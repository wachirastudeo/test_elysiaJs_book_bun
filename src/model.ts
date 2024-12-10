import { Database } from "bun:sqlite";
import { t } from "elysia";

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

const deleteBook = (id:number  ) =>{
    try {
        const query = db.query(`DELETE from books where id = $id;`)
        return query.run({
            $id:id
        })
    } catch (error) {
        console.log(error);
    }
}

console.log(deleteBook(10));


const createUser = (user : any)=>{
    try {
        const query = db.query(`
            INSERT INTO users
    ("email", "password")
    VALUES ($email, $password);`)
    query.run({
        $email:user.email,
        $password:user.password,
    })
    } catch (error) {
        
    }
}
createUser({email:'a@gmail.com',password:'123456'})


const getUser = (user:any) =>{
    try {
        const query = db.query(
            `SELECT * from users where email = $email and password = $password;`);
        const checked= query.get({
            $email:user.email,
            $password:user.password

        })

        if(!checked){
            throw new Error("user not found");
            
        }else{
            return{
                logedIn:true
            }
        }

    } catch (error) {
        console.log('error',error);
        return{
            logedIn:false
        }
        
    }
}
console.log(getUser({
    email:'a@gmail.com',
    password:'12346'
}));
