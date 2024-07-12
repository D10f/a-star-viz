import TilePicker from './web-components/tile-picker';
//import './style.css';

customElements.define('tile-picker', TilePicker);

const app = document.getElementById('app') as HTMLDivElement;
const tilePicker = document.createElement('tile-picker');
app.insertAdjacentElement('beforeend', tilePicker);

