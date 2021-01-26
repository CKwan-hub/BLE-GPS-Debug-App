import m from 'mithril';
import { Home } from './resources/home'

(async () => {

	let root = document.querySelector('#app');

	m.route.prefix = '';
	m.route(root, '/', {
		'/': Home

	});
})();
