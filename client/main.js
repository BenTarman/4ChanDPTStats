import './styles/main.scss';

// global component files. Basically "lower-level" components
import './src/components/threadInfo/component';
import './src/components/shilledLanguageBarItem/component';

// global component files upperlevel.
import './src/components/shilledLanguageBarGraph/component';

// import vue pages. The "page-level" component.
import Home from './src/pages/home';

new Vue({
  el: '#app',
  render: h => h(Home)
});
