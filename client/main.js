import './styles/main.scss';

// polyfill needed for regenartor runtime. Makes async/await work for my uses.
// TODO: this is deprecated maybe replace
import '@babel/polyfill';

// global component files. Basically "lower-level" components
import './src/components/threadInfo/component';
import './src/components/shilledLanguageBarItem/component';
import './src/components/threadPosts/component';
import './src/components/threadPost/component';

// global component files upperlevel.
import './src/components/shilledLanguageBarGraph/component';

// import vue pages. The "page-level" component.
import Home from './src/pages/home/page';

new Vue({
  el: '#app',
  render: h => h(Home)
});
