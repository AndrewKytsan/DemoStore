export default () => ({
	addon: null,

	getAddon() {
		if (this.$event.target.checked) {
			if (!this.addonsID.includes(this.$event.target.value)) {
				this.addonsID.push(this.$event.target.value);
			}
			if (!this.addonsPrice.includes(this.$event.target.dataset.price)) {
				this.addonsPrice.push(Number(this.$event.target.dataset.price));
			}
		} else if (!this.$event.target.checked) {
			let indexID = this.addonsID.indexOf(this.$event.target.value);
			if (indexID !== -1) {
				this.addonsID.splice(indexID, 1);
			}

			let indexHandle = this.addonsPrice.indexOf(Number(this.$event.target.dataset.price));
			if (indexHandle !== -1) {
				this.addonsPrice.splice(indexHandle, 1);
			}
		}
	},
});
