import express from "express";
import { db } from "./db.js";
import cors from "cors";
import e from "express";

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

// Регистрация
app.post('/api/regis', (req, res) => {
  const { login, password, full_name, phone, email } = req.body;

  if (!login || !password || !full_name || !phone || !email) {
    return res.json({ result: false, message: 'Все поля обязательны для заполнения' })
  }

  db.query('SELECT * FROM users WHERE login = ?', [login], (err, results) => {
    if (results.length > 0) {
      return res.json({ result: false, message: 'Такой логин уже используется' })
    }

    db.query('INSERT INTO users(login, password, full_name, phone, email, role) VALUES(?, ?, ?, ?, ?, ?)', [login, password, full_name, phone, email, "user"], (err, results) => {
      if (err) {
        return res.json({ result: false, message: 'Ошбика при регистрации' })
      }
      res.json({ result: true, message: 'Регистрация успешна' })
    })

  })
})

// Авторизация
app.get('/api/login', (req, res) => {
  const { login, password } = req.query;

  db.query('SELECT * FROM users WHERE login = ? and password = ?', [login, password], (err, results) => {
    if (err) {
      return res.json({ result: false, message: 'Ошбика БД' })
    }
    if (results.length > 0) {
      const user = results[0]
      res.json({ result: true, message: 'Вы авторизовались', userID: user.id_user, role: user.role })
    }
      else{
        res.json({ result: false, message: 'Неправельный логин или пароль' })
      }
  })
})

// Просмотр заявок
app.get('/api/requests', (req, res) => {
  const { id_user } = req.query

  db.query('SELECT * FROM requests WHERE id_user = ?', [id_user], (err, results) => {
    if (err) {
      return res.json({ result: false, message: "Ошибка БД" })
    }
    if (results.length === 0) {
      return res.json({ result: false, message: "У вас нет действующих заявок" })
    }
      res.json({ result: true, message: "Ваши заявки", requests: results })
  })
})

// Создание заявки
app.post('/api/requests/', (req, res) => {
  const { id_user, id_course, start_date, payment, } = req.body

  if (!id_course) {
    return res.json({ result: false, message: 'Выберите курс' })
  }

  if (!payment) {
    return res.json({ result: false, message: 'Выберите способ оплаты' })
  }

  const today = new Date()
  const selectedDate = new Date(start_date)
  today.setHours(0, 0, 0, 0)
  if (selectedDate < today) {
    return res.json({ result: false, message: 'Нельзя выбрать прошедшую дату' })
  }
    db.query('INSERT INTO requests(id_user, id_course, start_date, payment, id_status) VALUES (?, ?, ?, ?, 1)', [id_user, id_course, start_date, payment], (err, results) => {
      if (err) {
        return res.json({ result: false, message: 'Ошибка БД' })
      }

      {
        res.json({ result: true, message: 'Ваша заявка принята' })
      }
    })
})

// Получение списка курсов
app.get('/api/courses', (req, res) => {
  db.query('SELECT * FROM courses', (err, results) =>{
    
    if (err) {
      return res.json({ result: false, message: 'Ошибка БД' })
    }
      res.json({ result: true, message: 'Список курсов получен', courses: results})
  })
})

// Админ: все заявки
app.get('/api/admin/requests', (req, res) => {
  db.query('SELECT requests.*, users.full_name, courses.name, statuses.name FROM requests JOIN users ON requests.id_user = users.id_user JOIN courses ON requests.id_course = courses.id_course JOIN statuses ON requests.id_status = statuses.id_status;', (err, results) => {
    if (err) {
      return res.json({ result: false, message: 'Ошибка БД' })
    }
      res.json({ result: true, message: 'Список заявок получен', request: results})
  })
})

// Админ: смена статуса

app.put('/api/admin/request/:id', (req, res) => {
  const {id_status} = req.body
  const {id} = req.params

  db.query('UPDATE requests SET id_status = ? WHERE id_request = ?', [id_status, id], (err, results)=>{
    if (err) {
      return res.json({ result: false, message: 'Ошибка БД' })
    }
    res.json({ result: true, message: 'Статус обнавлён'})
  }
  )
})

// Добавить отзыв

app.put('/api/requests/:id/review', (req, res) => {
  const {review} = req.body
  const {id} = req.params

  if (review.length === 0) {
    return res.json({ result: false, message: 'Обязательно для заполнения'})
  }
  db.query('UPDATE requests SET review = ? WHERE id_request = ?', [review, id], (err, results) =>{
    if (err) {
      return res.json({ result: false, message: 'Ошибка БД' })
    }
    res.json({ result: true, message: 'Отзыв отправлен'})
  })
})

app.listen(port, () => {
  console.log(`Сервер запущен на порту: ${port}`)
})
