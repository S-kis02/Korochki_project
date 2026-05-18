import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function Admin() {
    const navigate = useNavigate()
    const [applications, setApplications] = useState([])
    const [message, setMessage] = useState('')

    const fetchResponse = async () => {
        let response = await fetch('http://localhost:3000/api/admin/requests');
        let data = await response.json();

        if (data.result) {
            setApplications(data.requests)
        }
        else {
            setMessage(data.message)
        }
    }

    useEffect(() => {
        fetchResponse()
    }, [])

    const exit = (e) => {
        e.preventDefault()
        navigate('/')
    }

    const updateStatus = async (id_request, newStatus) => {
        const response = await fetch(`http://localhost:3000/api/admin/request/${id_request}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_status: newStatus })
        })
        const data = await response.json()
        if (data.result) {
            fetchResponse()
        } else {
            alert(data.message)
        }
    }

    return (
        <div>
            <button onClick={exit}>Выход</button>
            <h1>{message}</h1>
            {applications.length > 0 && (<table border='1' >
                <thead>
                    <tr><td>ФИО подавшего</td><td>Телефон</td><td>Дата</td><td>Время бронирования</td><td>Выбранный мастер</td><td>Статус</td><td>Отзыв</td></tr>
                </thead>
                <tbody>
                    {applications.map(app => (
                        <tr key={app.id_request}>
                            <td>{app.full_name}</td>
                            <td>{app.phone}</td>
                            <td>{new Date(app.created_at).toLocaleDateString('ru-RU')}</td>
                            <td>{app.start_date ? new Date(app.start_date).toLocaleDateString('ru-RU') : 'Не указан'}</td>
                            <td>{app.name_courses}</td>
                            <select name="id_status" value={app.id_status} onChange={(e) => updateStatus(app.id_request, e.target.value)}>
                                <option value="1">{app.name_statuses}</option>
                                <option value="2">Идёт обучение</option>
                                <option value="3">Обучение завершено</option>
                            </select>
                            <td>{app.review || '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    )
}