import React, { useRef, useEffect, useState } from 'react';
import './supplementsPage.scss';
import ContactForm from '../../components/ContactForm/ContactForm';

const SupplementsPage = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Состояние для выбранного продукта
  const modalRef = useRef(null);
  const contactFormRef = useRef(null);

  const handleToggle = (product) => {
    setSelectedProduct(product); // Устанавливаем выбранный продукт
    setIsButtonClicked(!isButtonClicked);
  };

  const handleOrderNowClick = () => {
    setIsButtonClicked(false); // Закрыть модальное окно
    setIsFormVisible(true); // Открыть контактную форму
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsButtonClicked(false);
    }

    if (contactFormRef.current && !contactFormRef.current.contains(event.target)) {
      setIsFormVisible(false);
    }
  };

  useEffect(() => {
    if (isButtonClicked || isFormVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isButtonClicked, isFormVisible]);

  const SERVER_URL = 'http://localhost:3000/products';
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(SERVER_URL);
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Неправильный формат данных:', data);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='SupplementsPage__wrapper'>
      <p className='SupplementsPage__wrapper--label'>Противоморозные добавки</p>
      <ul className='SupplementsPage__wrapper--menu'>
        {products.length > 0 ? (
          products.flat().map(item => (
            <li className='SupplementsPage__wrapper--item' key={item.id}>
              <img src='/testImg.png' className='product__image' alt={item.name} />
              <p className='item--label'>{item.name}</p>
              <button
                className='SupplementsPage__wrapper--button'
                onClick={() => handleToggle(item)} // Передаем текущий продукт при клике
              >
                Узнать больше
              </button>
            </li>
          ))
        ) : (
          <div>Товары не найдены</div>
        )}
      </ul>

      {isButtonClicked && selectedProduct && (
        <div className='Supplements__page--wrapper'>
          <div className='product__overlay' ref={modalRef}>
            <button
              className='close__button'
              onClick={handleToggle}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                x='0px'
                y='0px'
                width='30'
                height='35'
                viewBox='0 0 30 30'
              >
                <path d='M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z'></path>
              </svg>
            </button>
            <div className='product__content--label'>{selectedProduct.name}</div> {/* Отображение поля container */}
            <div className='product__content--flex'>

              <img className='test_image' src='/armatura.png' alt='' />
              <div className='product__content--description'>
                <ul>
                    <li>  <p className='product__content--text-sub'>
                Тип контейнера: {selectedProduct.container}
                </p></li>
                    <li>         <p className='product__content--text-sub'>
                Масса: {selectedProduct.container}
                </p></li>
                    <li>
                <p className='product__content--text-sub'>
                Описание: {selectedProduct.container}
                </p></li>
                <li>
                <p className='product__content--text-sub'>
                Стоимость: {selectedProduct.price} Руб. /кг
                </p>
                </li>
                </ul>



                <p className='product__content--text--notification'>
                  Стоимость и наличие уточняйте у специалистов
                  <span className='warning-color'> Строй</span>
                  <span>Хим</span>
                  <span className='warning-color'>Торг</span>
                </p>
              </div>
            </div>

            <button
              className='product__content--button'
              onClick={handleOrderNowClick}
            >
              Заказать сейчас
            </button>
          </div>
        </div>
      )}

      {isFormVisible && (
        <div className='ContactForm__wrapper'>
          <div className='ContactForm__content' ref={contactFormRef}>
            <ContactForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplementsPage;
