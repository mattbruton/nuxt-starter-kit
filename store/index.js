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
        return fetch('/api/v1/login', {
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
        return fetch('/api/v1/logout', {
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
