<template>
  <section class="container">
    <img src="../../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Users
    </h1>
    <ul class="users">
      <li v-for="(user, index) in users" class="user">
        <nuxt-link :to="{ name: 'users-id', params: { id: index }}">
          {{ user.name }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from '~plugins/axios.js';

export default {
  async asyncData() {
    const { data } = await axios.get('/api/v1/users');
    return {
      users: data,
    };
  },
  fetch({ store, redirect }) {
    if (!store.state.authUser) {
      return redirect('/');
    }

    return false;
  },
  head() {
    return {
      title: 'Users',
    };
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
