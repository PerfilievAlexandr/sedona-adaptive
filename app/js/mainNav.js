'use strict'

const mainNavClose = document.querySelector('.main-nav__close')
const mainNavToggle = document.querySelector('.main-nav__toggle')
const mainNavItems = document.querySelector('.main-nav__list')

mainNavToggle.addEventListener('click', () => {
	if (mainNavItems.classList.contains('main-nav__list--closed')) {
		mainNavItems.classList.remove('main-nav__list--closed')
		mainNavClose.classList.remove('main-nav__close--closed')
	} else {
		mainNavItems.classList.add('main-nav__list--closed')
		mainNavClose.classList.add('main-nav__close--closed')
	}

})

mainNavClose.addEventListener('click', () => {
	mainNavItems.classList.add('main-nav__list--closed')
	mainNavClose.classList.add('main-nav__close--closed')
})


