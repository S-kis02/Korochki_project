import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function NewRequest() {
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')

    const [dataRequest, setdataRequest] = useState({
        id_course: '',
        start_date: '',
        payment: ''
    })

    const handleChange = (e) => {
        setdataRequest({
            ...dataRequest,
            [e.target.name]: e.target.value
        })
    }

    const exit = (e) => {
        e.preventDefault()
        navigate('/home')
    }
    
    const newRequest = async (e) => {
        e.preventDefault()
        const requestData = {
            id_user: userId,
            id_course: dataRequest.id_course,
            start_date: dataRequest.start_date,
            payment: dataRequest.payment
        }
        let response = await fetch('http://localhost:3000/api/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(requestData)
        });
        let data = await response.json();

        if (data.result) {
            alert(data.message)
            navigate('/home')
        }
        else {
            alert(data.message)
        }
    }

    return (
        <div>
            <h1>Создание новой заявки</h1>
            <form onSubmit={newRequest}>
                <p>Курс</p>
                <select name="id_course" onChange={handleChange} value={dataRequest.id_course}>
                    <option value="">Выберите курс</option>
                    <option value="1">Основы алгоритмизации и программирования</option>
                    <option value="2">Основы веб-дизайна</option>
                    <option value="3">Основы проектирования баз данных</option>
                </select>
                <p>Примерная дата начала обучения(не обязательно)</p>
                <input type="date" name="start_date" onChange={handleChange} value={dataRequest.start_date} />
                <p>Способ оплаты</p>
                <select name="payment" onChange={handleChange} value={dataRequest.payment}>
                    <option value="">Выберите способ оплаты</option>
                    <option value="cash">Наличные</option>
                    <option value="transfer">Перевод по номеру телефона</option>
                </select>
                <button type="submit">Отправить</button>
            </form>
            <button onClick={exit}>Отменить заявку</button>
        </div>
    )
}