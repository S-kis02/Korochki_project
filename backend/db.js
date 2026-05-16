import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3307,
  database: "korochki",
  password: "1234"
});

 db.connect(function(err){
    if (err) {
       console.error("Ошибка: ", err);
       return
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
 });