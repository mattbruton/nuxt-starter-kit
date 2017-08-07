// eslint-disable-next-line
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Polyfill for window.fetch()
require('whatwg-fetch');

const store = () => {
  const returnValue = new Vuex.Store({
    state: {
      authUser: null,
    },
    mutations: {
      SET_USER: function SET_USER(state, user) {
        // eslint-disable-next-line
        state.authUser = user;
      },
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        if (req.session && req.session.authUser) {
          commit('SET_USER', req.session.authUser);
        }
      },
      login({ commit }, { username, password }) {
        let apiLoginURL;

        if (process.env.NODE_ENV !== 'production') {
          apiLoginURL = 'https://localhost:3001/api/v1/login';
        } else {
          apiLoginURL = '/api/v1/login';
        }

        return fetch(apiLoginURL, {
          credentials: 'same-origin',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        })
        .then((res) => {
          if (res.status === 401) {
            throw new Error('Bad credentials');
          } else {
            return res.json();
          }
        })
        .then((authUser) => {
          commit('SET_USER', authUser);
        });
      },
      logout({ commit }) {
        let apiLogoutURL;
        if (process.env.NODE_ENV !== 'production') {
          apiLogoutURL = 'https://localhost:3001/api/v1/logout';
        } else {
          apiLogoutURL = '/api/v1/logout';
        }

        return fetch(apiLogoutURL, {
          credentials: 'same-origin',
          method: 'POST',
        })
        .then(() => {
          commit('SET_USER', null);
        });
      },
    },
  });

  return returnValue;
};

export default store;
