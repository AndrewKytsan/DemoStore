import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import intersect from '@alpinejs/intersect';

// Import components
import body from './components/body';
import product from './components/pdp/product-main';
import productAddon from './components/pdp/product-addons';
import slider from './components/swiper';
import lazyLoad from './components/lazy-load';

Alpine.plugin(collapse);
Alpine.plugin(intersect);

// Declare components
Alpine.data('body', body);
Alpine.data('product', product);
Alpine.data('productAddon', productAddon);
Alpine.data('lazyLoad', lazyLoad);
Alpine.data('slider', slider);

window.Alpine = Alpine;
Alpine.start();
