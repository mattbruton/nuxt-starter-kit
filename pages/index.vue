<template>
  <section class="container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      PassportJS JWT Example
    </h1>
  </section>
</template>

<script>
export default {
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
