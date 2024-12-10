import { Database } from "bun:sqlite";
import { t } from "elysia";

const db = new Database("mydb.sqlite");

const createBook = (book: any) => {
  try {
    if (!book.name || !book.author || !book.price) {
      throw new Error("Validation Fail");
    }
    const query = db.query(`
            INSERT INTO books
    ("name", "author", "price")
    VALUES ($name, $author, $price);`);
    query.run({
      $name: book.name,
      $author: book.author,
      $price: book.price,
    });
    return {
      status: "ok",
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: "error",
    };
  }
};
// console.log(createBook({name:'book1',author:'author1',price:100}))

const updateBook = (id: number, book: any) => {
  try {
    const query = db.query(`
            update books set "name"=$name , "author"=$author , "price"=$price where id = $id;`);
    query.run({
      $id: id,
      $name: book.name,
      $author: book.author,
      $price: book.price,
    });
    return {
      status: "ok",
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: "error",
    };
  }
};
const getBooks = () => {
  try {
    const query = db.query(`SELECT * from 'books'`);
    return query.all();
  } catch (error) {
    console.log(error);
    return [];
  }
};
const getBook = (id: number) => {
  try {
    const query = db.query(`SELECT * from books where id = $id;`);
    return query.get({
      $id: id,
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};

const deleteBook = (id: number) => {
  try {
    const query = db.query(`DELETE from books where id = $id;`);
    return query.run({
      $id: id,
    });
    return {
      status: "ok",
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: "error",
    };
  }
};

const createUser = (user: any) => {
  try {
    const query = db.query(`
            INSERT INTO users
    ("email", "password")
    VALUES ($email, $password);`);
    query.run({
      $email: user.email,
      $password: user.password,
    });
  } catch (error) {}
};
createUser({ email: "a@gmail.com", password: "123456" });

const getUser = (user: any) => {
  try {
    const query = db.query(
      `SELECT * from users where email = $email and password = $password;`
    );
    const checked = query.get({
      $email: user.email,
      $password: user.password,
    });

    if (!checked) {
      throw new Error("user not found");
    } else {
      return {
        logedIn: true,
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      logedIn: false,
    };
  }
};

export {
  createBook,
  updateBook,
  getBooks,
  getBook,
  deleteBook,
  createUser,
  getUser,
};
