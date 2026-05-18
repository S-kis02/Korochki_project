import { useState, useEffect } from 'react'

const images = [
    './img/slide1.jpg',
    './img/slide2.jpg',
    './img/slide3.jpg',
    './img/slide4.jpg'
]

export function Slider() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length)
        }, 3000)
        return () => clearInterval(timer)
    }, [])

    const next = () => setCurrent((prev) => (prev + 1) % images.length)
    const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length)

    return (
        <div className="slider">
            <button onClick={prev}>❮</button>
            <img src={images[current]} alt={`slide ${current + 1}`} />
            <button onClick={next}>❯</button>
        </div>
    )
}