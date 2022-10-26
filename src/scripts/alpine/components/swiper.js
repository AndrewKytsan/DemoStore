export default () => ({
	slider: null,
	settings: {},

	createSlider() {
		const { selector, ...config } = this.settings;
		this.slider = new window.Swiper(selector, config);
	},

	reset() {
		this.slider?.destroy(true, true);
		this.createSlider();
	},

	init() {
		this.$watch('settings', () => this.createSlider());
	},
});
