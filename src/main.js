import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import store from "./store";

// import SingUp from "./views/SingUp.vue";
// import Login from "./views/Login.vue";
// import Home from "./views/Home.vue";
// import Add from "./views/Add.vue";

const Login = (resolve) => {
  require.ensure(["./views/Login.vue"], () => {
    resolve(require("./views/Login.vue"));
  });
};
const Home = (resolve) => {
  require.ensure(["./views/Home.vue"], () => {
    resolve(require("./views/Home.vue"));
  });
};
const SingUp = (resolve) => {
  require.ensure(["./views/SingUp.vue"], () => {
    resolve(require("./views/SingUp.vue"));
  });
};
const Add = (resolve) => {
  require.ensure(["./views/Add.vue"], () => {
    resolve(require("./views/Add.vue"));
  });
};

Vue.use(VueRouter);

Vue.config.productionTip = false;
export const routes = [
  {
    path: "*",
    redirect: "/home"
  },
  {
    path: "/",
    component: Login
  },
  {
    path: "/home",
    component: Home,
    beforeEnter: (to, from, next) => {
      if (Object.entries(store.getters.currentUser).length > 0) {
        next();
      } else {
        next("/");
      }
    }
  },
  {
    path: "/singUp",
    component: SingUp
  },
  {
    path: "/add/:id",
    component: Add,
    beforeEnter: (to, from, next) => {
      if (Object.entries(store.getters.currentUser).length > 0) {
        next();
      } else {
        next("/");
      }
    }
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount("#app");
