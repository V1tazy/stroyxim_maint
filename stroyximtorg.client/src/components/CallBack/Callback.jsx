import { useEffect } from 'react'
import Captcha from '../Captcha'

import ContactForm from '../ContactForm/ContactForm'
function Callback() {
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
		<section className='main__callback'>
			<div className='container main__callback--wrapper'>
				<ContactForm/>
			</div>
		</section>
	)
}

export default Callback
