// import './assets/img/_sprite.svg';
import './js/'
import './assets/scss/main.scss'

global.$ = global.jQuery = $;

function requireAll(r){r.keys().forEach(r);}
requireAll(require.context('./assets/svg-icon/', true, /\.svg$/));
requireAll(require.context('./assets/svg-color-icon/', true, /\.svg$/));