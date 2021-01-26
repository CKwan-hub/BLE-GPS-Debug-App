import m from 'mithril';
import './styles/styles.css';
import { Main } from './resources/main'

(async () => {

	let root = document.querySelector('#app');

	m.route.prefix = '';
	m.route(root, '/', {
		'/': Main

	});
})();
