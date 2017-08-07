<template>
  <section class="container">
    <img src="../../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      User
    </h1>
    <h2 class="info">
      {{ user.name }}
    </h2>
    <nuxt-link class="button" to="/">
      Users
    </nuxt-link>
  </section>
</template>

<script>
import axios from '~/plugins/axios.js';

export default {
  name: 'id',
  asyncData({ params, error }) {
    let apiUserURL;
    if (process.env.NODE_ENV !== 'production') {
      apiUserURL = `https://localhost:3001/api/v1/users/${params.id}`;
    } else {
      apiUserURL = `/api/v1/users/${params.id}`;
    }

    return axios.get(apiUserURL)
    .then(res => (
      { user: res.data }
    ))
    .catch((e) => {
      error({ statusCode: 404, message: 'User not found', error: e });
      // eslint-disable-next-line
      console.log(e);
    });
  },
  fetch({ store, redirect }) {
    if (!store.state.authUser) {
      return redirect('/');
    }

    return false;
  },
  head() {
    return {
      title: `User: ${this.user.name}`,
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-top: 30px;
}

.info {
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}

.button {
  margin-top: 30px;
}
</style>
