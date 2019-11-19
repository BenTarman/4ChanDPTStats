const template = `
  <div>
  {{img}}
    <img :src="img" style="max-width: 250px;">
  </div>
`



const ThreadInfo = Vue.component('threadInfo', {
    name: 'threadInfo',
    template,


    props: {
        'img': String,
        'uniquePosters': Number,
        'unixTime': Number,
      },
  
});


export default ThreadInfo;