import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import './Slider.css'
import { Slider } from './Slider.jsx'

export function Home() {
    const navigate = useNavigate()
    const [requests, setRequests] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        const fetchRequests = async () => {
            let response = await fetch(`http://localhost:3000/api/requests?id_user=${userId}`)
            let data = await response.json();

            if (data.result) {
                setRequests(data.requests)
                setMessage('')
            }
            else {
                setRequests([])
                setMessage(data.message)
            }
        }
        fetchRequests()
    }, [])

    const newRequest = (e) => {
        e.preventDefault()
        navigate('/new_request')
    }

    const exit = (e) => {
        e.preventDefault()
        navigate('/')
    }

    const openReviewForm = (id_request) => {
        const review = prompt('Введите ваш отзыв:')
        if (review) {
            fetch(`http://localhost:3000/api/requests/${id_request}/review`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ review })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.result) {
                        alert('Отзыв отправлен')
                        window.location.reload()
                    } else {
                        alert(data.message)
                    }
                })
        }
    }
    return (
        <div>
            <button onClick={exit}>Выйти</button>
            <Slider />
            <h1>Ваши заявки</h1>
            <p>{message}</p>
            {requests.length > 0 && (<table border='1'>
                <thead>
                    <tr><th>Курс</th><th>Дата</th><th>Статус</th><th>Отзыв</th></tr>
                </thead>
                <tbody>
                    {requests.map(req => (
                        <tr key={req.id_request}>
                            <td>{req.name_courses}</td>
                            <td>{req.start_date ? new Date(req.start_date).toLocaleDateString('ru-RU') : 'Не указана'}</td>
                            <td>{req.name_statuses}</td>
                            <td>
                                {req.name_statuses === 'Обучение завершено' && !req.review ? (
                                    <button onClick={() => openReviewForm(req.id_request)}>Оставить отзыв</button>
                                ) : req.review ? (
                                    <span>Отзыв оставлен</span>
                                ) : (
                                    <span>—</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>)}
            <button onClick={newRequest}>Добавить заявку</button>
        </div>
    )
}