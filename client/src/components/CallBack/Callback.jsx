import { useEffect } from 'react'
import Captcha from '../Captcha'

import ContactForm from '../ContactForm/ContactForm'
function Callback() {


	return (
		<section className='main__callback' id='main__callback'>
			<div className='container main__callback--wrapper'>
				<ContactForm/>
			</div>
		</section>
	)
}

export default Callback
