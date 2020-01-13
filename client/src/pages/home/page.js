const homePage = {
  template: homePageTemplate,

  data() {
    return {
      showNavBar: false
    };
  },

  methods: {
    transitionHome() {
      this.$router.push('/');
    }
  }
};

export default homePage;
