import React, { useState, useEffect } from 'react';
import Captcha from '../Captcha';
import '../CallBack/Callback.scss';

const ContactForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        tel: '',
        name: '',
        message: ''
    });

    useEffect(() => {
        const hasSubmitted = document.cookie.split('; ').find(row => row.startsWith('formSubmitted='));
        if (hasSubmitted) {
            setIsSubmitted(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitted) {
            return;
        }

        if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(formData.tel)) {
            alert('Пожалуйста, введите корректный номер телефона.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSubmitted(true);

                const now = new Date();
                now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
                document.cookie = `formSubmitted=true; expires=${now.toUTCString()}; path=/`;

            } else {
                console.error('Ошибка при отправке формы');
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const inputTel = document.querySelector('#tel');

        const setCursorPosition = (pos, elem) => {
            if (elem === document.activeElement) {
                elem.focus();
                if (elem.setSelectionRange) {
                    elem.setSelectionRange(pos, pos);
                } else if (elem.createTextRange) {
                    const range = elem.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            }
        }

        const mask = (event) => {
            let matrix = '+7 (___) ___-__-__',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = inputTel.value.replace(/\D/g, '');

            if (def.length >= val.length) val = def;
            inputTel.value = matrix.replace(/./g, function (a) {
                return /[_\d]/.test(a) && i < val.length
                    ? val.charAt(i++)
                    : i >= val.length
                        ? ''
                        : a;
            });

            if (event.type === 'blur' && inputTel.value.length < 18) {
                inputTel.value = '';
            } else {
                setCursorPosition(inputTel.value.length, inputTel);
            }

            setFormData(prevState => ({
                ...prevState,
                tel: inputTel.value
            }));
        }

        inputTel.addEventListener('input', mask);
        inputTel.addEventListener('focus', mask);
        inputTel.addEventListener('blur', mask);

        return () => {
            inputTel.removeEventListener('input', mask);
            inputTel.removeEventListener('focus', mask);
            inputTel.removeEventListener('blur', mask);
        };
    }, []);

    return (
        <form id='contact' action='' method='post' onSubmit={handleSubmit}>
            <p className='main__callback--wrapper--label'>
                Обратная <br />
                связь
            </p>

            <fieldset>
                <input
                    id='tel'
                    name='tel'
                    value={formData.tel}
                    onChange={handleChange}
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
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Введите ваше имя'
                    type='text'
                    tabIndex='1'
                    required
                    className='callback__input'
                />
            </fieldset>

            <fieldset>
                <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
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

            <button type='submit' className='callback__submit' disabled={isSubmitted}>
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
