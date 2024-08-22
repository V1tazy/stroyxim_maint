import './Captcha.scss'
import { InvisibleSmartCaptcha } from '@yandex/smart-captcha';
import { useCallback, useState } from 'react';
import axios from 'axios';

const InvisibleCaptcha = () => {
  const [token, setToken] = useState('');
  const [captchaInstance, setCaptchaInstance] = useState(null); // Хранение экземпляра капчи

  // Обработчик, когда капча скрывается
  const handleChallengeHidden = useCallback(() => {
    // Можно добавить логику здесь, если нужно
  }, []);

  // Обработчик успешной проверки капчи
  const handleCaptchaSuccess = useCallback((token) => {
    setToken(token); // Устанавливаем токен
  }, []);

  // Обработчик клика по кнопке
  const handleButtonClick = async (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение кнопки

    // Запускаем капчу
    if (captchaInstance) {
      captchaInstance.execute().then((token) => {
        setToken(token); // Сохраняем токен

        // После получения токена можно отправить форму
        handleSubmit();
      }).catch((error) => {
        console.error('Ошибка проверки капчи:', error);
      });
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async () => {
    if (!token) {
      console.error('Токен капчи отсутствует.');
      return;
    }

    try {
      // Отправляем данные на сервер вместе с токеном капчи
      const response = await axios.post('/verify-captcha', {
        token,
        // Включите сюда другие данные формы, если нужно
      });

      if (response.data.success) {
        // Обработка успешного ответа
        console.log('Данные успешно отправлены!');
      } else {
        // Обработка неудачного ответа
        console.error('Ошибка при отправке данных.');
      }
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return (
    <form>
      {/* Ваши другие поля формы */}
      <InvisibleSmartCaptcha
        className='InvisibleSmartCaptcha'
        sitekey='<ключ_клиента>' // Замените на ваш ключ клиента
        onSuccess={handleCaptchaSuccess}
        onChallengeHidden={handleChallengeHidden}
        ref={(ref) => setCaptchaInstance(ref ? ref.captcha : null)} // Сохраняем экземпляр капчи
      />
    </form>
  );
};

export default InvisibleCaptcha;
