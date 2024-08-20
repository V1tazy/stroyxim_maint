import React from 'react'
import Captcha from '../Captcha'
import '../CallBack/Callback.scss'
const ContactForm = () => {
  return (
    <form id='contact' action='' method='post'>
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
				</form>
  )
}

export default ContactForm
