import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

/* {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Price { get; set; }
    public byte[] Image { get; set; }
    public string Type { get; set; }
    public string TypeId { get; set; }
} */
function Products() {
	const SERVER_URL = 'https://localhost:7282/products'
	const [products, setProducts] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(SERVER_URL)
				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`)
				}
				const data = await response.json()

				if (Array.isArray(data)) {
					setProducts(data)
				} else {
					console.error('Неправильный формат данных:', data)
				}
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		}

		fetchData()
	}, [])

	return (
		<section id='products' name='products' className='products__wrapper'>
			<div className='products__wrapper--label'>Наши товары</div>
			<Swiper
				pagination={true}
				spaceBetween={50}
				navigation={true}
				slidesPerView={'auto'}
				breakpoints={{}}
				modules={[Pagination]}
				className='mySwiper custom__swiper'
			>
				{products.length > 0 ? (
					products.map(item => (
						<SwiperSlide className='custom__slide' key={item.Id}>
							<img
								src={item.Image || '/public/optical_fiber.png'}
								alt={item.Name}
							/>
							<p className='slide__label'>{item.Name}</p>
							<Link to='/products' className='test'>
								<button className='primary__button'>Узнать больше</button>
							</Link>
						</SwiperSlide>
					))
				) : (
					<div>Товары не найдены</div>
				)}
			</Swiper>
		</section>
	)
}

export default Products
