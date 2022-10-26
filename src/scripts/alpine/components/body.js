export default () => ({
	windowWidth: window.innerWidth,
	cart: { item_count: 0 },
	scrollPosition: 0,
	showPopup: '',
	closePopup: '',
	ACTIVE_CLASS: 'visible',

	getCart() {
		const url = window.routes.cart_url + '.js';
		fetch(url)
			.then((res) => res.json())
			.then((json) => (this.cart = json));
	},

	bodyLock() {
		this.scrollPosition = window.pageYOffset;
		document.body.style.overflow = 'hidden';
		document.body.style.position = 'fixed';
		document.body.style.top = `-${this.scrollPosition}px`;
		document.body.style.width = '100%';
	},
	bodyUnlock() {
		document.body.style.removeProperty('overflow');
		document.body.style.removeProperty('position');
		document.body.style.removeProperty('top');
		document.body.style.removeProperty('width');
		window.scrollTo(0, this.scrollPosition);
	},

	popupOpen() {
		// if there was opened popup - close previous
		document.querySelector(`.popup.${this.ACTIVE_CLASS}`)?.classList.remove(this.ACTIVE_CLASS);

		const popup = document.querySelector(`#${this.showPopup}`);
		if (popup) {
			popup.classList.add(this.ACTIVE_CLASS);
			popup.dataset.lock == 'true' ? this.bodyLock() : this.bodyUnlock();
		}
	},
	popupClose() {
		this.showPopup = '';
		const popup = document.querySelector(`#${this.closePopup}`);
		if (popup) {
			popup.classList.remove(this.ACTIVE_CLASS);
			popup.dataset.lock == 'true' ? this.bodyUnlock() : '';
		}
	},

	updateCustomProperties() {
		document.documentElement.style.setProperty(
			'--header-top-padding',
			(document.querySelector('#announcement-bar')?.offsetHeight || '0') + 'px',
		);
		document.documentElement.style.setProperty(
			'--header-full-height',
			(document.querySelector('#header')?.offsetHeight || '0') + 'px',
		);
		document.documentElement.style.setProperty(
			'--footer-full-height',
			(document.querySelector('#footer')?.offsetHeight || '0') + 'px',
		);
	},

	resize() {
		this.windowWidth = window.innerWidth;
		this.updateCustomProperties();
	},

	init() {
		this.getCart();
		this.updateCustomProperties();

		this.$watch('cart', () => {
			window.cart = this.cart;
			if (this.cart.items) {
				document.body.classList.remove('loading');
			}
		});
		this.$watch('showPopup', () => {
			this.closePopup = '';
			if (this.showPopup != '') {
				this.popupOpen();
			}
		});
		this.$watch('closePopup', () => {
			if (this.closePopup != '') {
				this.popupClose();
			}
		});
	},
});
