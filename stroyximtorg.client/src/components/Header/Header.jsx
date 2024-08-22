import React, { useEffect } from 'react'
import { ScrollRestoration } from 'react-router-dom'
import { NavHashLink } from 'react-router-hash-link'
import BurgerMenu from '../BurgerMenu/BurgerMenu'

function Header() {
	useEffect(() => {
		window.addEventListener('scroll', isSticky)
		return () => {
			window.removeEventListener('scroll', isSticky)
		}
	})
	const isSticky = e => {
		const header = document.querySelector('.header')
		const scrollTop = window.scrollY
		scrollTop >= 10
			? header.classList.add('is-sticky')
			: header.classList.remove('is-sticky')
	}

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<section className='header' id='header'>
			<ScrollRestoration />
			<div className='container header__wrapper' id='mainNav'>
            <NavHashLink
								to={{
									pathname: '/',
									hash: '#main',
								}}
							>
	<div className='header__section' onClick={scrollToTop}>

                <img className='header__logo' src='/logo.svg'/>

				</div>
							</NavHashLink>

				<nav className='header__nav nav-bar'>
					<ul className='nav-list'>
						<li className='nav-list-item'>
							<NavHashLink
								to={{
									pathname: '/',
									hash: '#main',
								}}
							>
								<div className='header__link header__menu-link' href='#main'>
									Главная
								</div>
							</NavHashLink>
						</li>
						<li className='nav-list-item'>
							<NavHashLink
								to={{
									pathname: '/',
									hash: '#about',
								}}
							>
								<a className='header__link header__menu-link' href='#about'>
									О нас
								</a>
							</NavHashLink>
						</li>
						<li className='nav-list-item'>
							<NavHashLink
								to={{
									pathname: '/',
									hash: '#products',
								}}
							>
								<div
									className='header__link header__menu-link'
									href='#products'
								>
									Товары
								</div>
							</NavHashLink>
						</li>
					</ul>
				</nav>
				<div className='overlay'></div>
				<div className='header__menu'>
					<ul className='header__menu--list'>
						<li className='header__menu--item'>
							<NavHashLink
								to={{
									pathname: '/',
									hash: '#main',
								}}
							>
								<span className='header__link' href='#main'>
									Главная
								</span>
							</NavHashLink>
						</li>
						<li className='header__menu--item'>
							<NavHashLink
								to={{
									pathname: '/',
									hash: '#about',
								}}
							>
								<a className='header__link' href='#about'>
									О нас
								</a>
							</NavHashLink>
						</li>
						<li className='header__menu--item'>
							<NavHashLink
								to={{
									pathname: '/',
									hash: '#products',
								}}
							>
								<a className='header__link' href='#products'>
									Товары
								</a>
							</NavHashLink>
						</li>
					</ul>
				</div>
				<BurgerMenu />
			</div>
		</section>
	)
}

export default Header
