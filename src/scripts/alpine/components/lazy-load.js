export default () => ({
	lazyImage(src) {
		if (!src) return;
		const adaptiveSrc = this.getAdaptiveSrc(src);

		const loader = document.createElement(this.$el.tagName);
		loader.src = adaptiveSrc;

		loader.onload = () => (this.$el.src = adaptiveSrc);
		loader.onerror = () => console.error('Image not loaded: ' + this.$el);
	},
	lazyImageHigh(src) {
		if (!src) return;
		const adaptiveSrc = this.getAdaptiveSrcHigh(src);

		const loader = document.createElement(this.$el.tagName);
		loader.src = adaptiveSrc;

		loader.onload = () => (this.$el.src = adaptiveSrc);
		loader.onerror = () => console.error('Image not loaded: ' + this.$el);
	},

	setPoster(src) {
		const adaptiveSrc = this.getAdaptiveSrc(src);
		this.$el.poster = adaptiveSrc;
	},

	lazyVideo(videoSrc) {
		this.$el.src = videoSrc;
		this.$el.load();
	},

	lazyVideoVimeo(videoSrc) {
		this.$el.src = videoSrc;
	},

	getAdaptiveSrc(src) {
		const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
		const currentExtension = imageExtensions.find((ext) => src.includes(ext));

		if (!currentExtension) return src;

		const imageWidth = this.$el.offsetWidth;

		const srcParts = src.split(currentExtension);
		srcParts[0] = `${srcParts[0]}_${imageWidth}x`;
		const adaptiveSrc = srcParts.join(currentExtension);

		return adaptiveSrc;
	},
	getAdaptiveSrcHigh(src) {
		const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
		const currentExtension = imageExtensions.find((ext) => src.includes(ext));

		if (!currentExtension) return src;

		const imageWidth = this.$el.offsetWidth * 3;

		const srcParts = src.split(currentExtension);
		srcParts[0] = `${srcParts[0]}_${imageWidth}x`;
		const adaptiveSrc = srcParts.join(currentExtension);

		return adaptiveSrc;
	},
});
