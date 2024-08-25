import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/pagination'

import { Swiper, SwiperSlide } from 'swiper/react'

function Products() {

    return (
        <section id='products' name='products' className='products__wrapper'>
            <div className='products__wrapper--label'>Наши товары</div>
            <Swiper
                pagination={{ clickable: true }}
                navigation={true}
                spaceBetween={20}
                slidesPerView={'auto'}
                breakpoints={{
                    640: {

                        spaceBetween: 20,
                    },
                    768: {

                        spaceBetween: 30,
                    },
                    1024: {

                        spaceBetween: 40,
                    },
                }}
                className='mySwiper custom__swiper'
            >


                        <SwiperSlide className='custom__slide'>
                            <img
                                src='/cement.png'
                                alt='Противоморозные добавки'
                                className='product__image'
                            />
                            <p className='slide__label'>Противоморозные добавки</p>
                            <Link to='/supplements' className='test'>
                                <button className='primary__button'>Узнать больше</button>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide className='custom__slide'>
                            <img
                                src='/cement.png'
                                alt='Пластификаторы'
                                className='product__image'
                            />
                            <p className='slide__label'>Пластификаторы</p>
                            <Link to='/plasticizer' className='test'>
                                <button className='primary__button'>Узнать больше</button>
                            </Link>
                        </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default Products
