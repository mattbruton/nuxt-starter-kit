<template>
  <section class="container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      PassportJS JWT Example
    </h1>
    <input type="text" placeholder="username" v-model="username"><br>
	  <input type="password" placeholder="password" v-model="password" @keyup.enter="login"><br>
    <button @click="login">Submit</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
    };
  },
  head() {
    return {
      title: 'Log In',
    };
  },
  fetch({ store, redirect }) {
    if (store.state.authUser) {
      return redirect('/users');
    }
    return false;
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password,
        });
        this.username = '';
        this.password = '';

        window.location.replace('/users');
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('logout');
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .title {
    margin: 30px 0;
  }

  .users {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .user {
    margin: 10px 0;
  }
</style>
