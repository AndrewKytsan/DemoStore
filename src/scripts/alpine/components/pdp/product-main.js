export default () => ({
	handle: '',
	product: null,
	addonsID: [],
	addonsPrice: [],
	price: '',
	productData: {},
	productDataWithAddons: {},
	async getProduct() {
		const response = await fetch(`/products/${this.handle}?view=get-product`);
		if (response.status !== 200) return;
		const json = await response.json();
		this.product = json;
		this.price = `${window.currency}${parseFloat(this.product.price / 100).toFixed(2)}`;
		this.productData = {
			id: this.product.first_available_variant.id,
			quantity: 1,
		};
	},

	async addToCart() {
		let data = {};
		if (this.addonsID.length === 0) {
			data = this.productData;
		} else {
			this.productDataWithAddons.items.unshift(this.productData);
			data = this.productDataWithAddons;
		}
		const response = await fetch(window.routes.cart_add_url + '.js', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'XMLHttpRequest',
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			this.$dispatch('cart-update');
			console.log(this.cart);
		}
	},

	createAddonsData() {
		let addonData = this.addonsID.map((id) => {
			return { id: id, quantity: 1 };
		});

		this.productDataWithAddons = {
			items: addonData,
		};
	},
	init() {
		this.$watch('handle', () => {
			this.getProduct();
		});

		this.$watch('addonsID', () => {
			if (this.addonsID.length === 0) {
				this.price = `${window.currency}${parseFloat(this.product.price / 100).toFixed(2)}`;
			} else {
				let addonsPrice = this.addonsPrice.reduce((a, b) => a + b);
				let newPrice = Number(this.product.price) + addonsPrice;
				this.price = `${window.currency}${parseFloat(newPrice / 100).toFixed(2)}`;
				this.createAddonsData();
			}
		});
	},
});
