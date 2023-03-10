import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);




export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#1976D2",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        warnwarn:"#EC407A",
        silver: "#C0C0C0",
        platinum: "#E5E4E2",
        silver2: "#F5F5F5"
      },
    },
  },
});
