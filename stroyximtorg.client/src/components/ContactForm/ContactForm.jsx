import React, { useState, useEffect } from 'react';
import Captcha from '../Captcha';
import '../CallBack/Callback.scss';

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    setIsSubmitted(true); // Устанавливаем состояние в "отправлено"
  };
  useEffect(() => {
    const input_tel = document.querySelector('#tel')
    input_tel.addEventListener('input', mask, false)
    input_tel.addEventListener('focus', mask, false)
    input_tel.addEventListener('blur', mask, false)
    function setCursorPosition(pos, elem) {
        elem.focus()
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos)
        else if (elem.createTextRange) {
            var range = elem.createTextRange()
            range.collapse(true)
            range.moveEnd('character', pos)
            range.moveStart('character', pos)
            range.select()
        }
    }

    function mask(event) {
        let matrix = '+7 (___) ___-__-__',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '')
        if (def.length >= val.length) val = def
        this.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length
                ? val.charAt(i++)
                : i >= val.length
                ? ''
                : a
        })
        if (event.type == 'blur') {
            if (this.value.length == 2) this.value = ''
        } else setCursorPosition(this.value.length, this)
    }
})
  return (
    <form id='contact' action='' method='post' onSubmit={handleSubmit}>
      <p className='main__callback--wrapper--label'>
        Обратная <br />
        связь
      </p>

      <fieldset>
        <input
          id='tel'
          className='callback__input tel'
          placeholder='Введите ваш номер для связи'
          type='tel'
          tabIndex='3'
          required
          title='Введите номер телефона в формате +7 XXX XXX XX XX'
        />
      </fieldset>
      <fieldset>
        <input
          placeholder='Введите ваше имя'
          type='text'
          tabIndex='1'
          required
          className='callback__input'
        />
      </fieldset>

      <fieldset>
        <textarea
          placeholder='Введите ваше сообщение:'
          tabIndex='5'
          required
          maxLength='256'
          className='callback__input'
        ></textarea>
      </fieldset>
      <fieldset className='Captcha__section'>
        <Captcha />
      </fieldset>

      <button type='submit' className='callback__submit'>
        Отправить
      </button>

      {isSubmitted && (
        <p className='success-message'>
        Ваша заявка успешно отправлена!
        <span>Мы свяжемся с вами в ближайшее время.</span>
        </p>
      )}
    </form>
  );
};

export default ContactForm;
