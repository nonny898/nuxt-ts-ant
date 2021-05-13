<template>
  <header class="header">
    <ul class="nav-items">
      <li>
        <a-button type="link">
          <nuxt-link to="/">Home</nuxt-link>
        </a-button>
      </li>
      <li>
        <a-button type="link">
          <nuxt-link to="/users">Users</nuxt-link>
        </a-button>
      </li>
    </ul>
  </header>
</template>

<style scoped>
.header {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(105, 105, 105);
}
.nav-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
}

.nav-items a {
  text-decoration: none;
  color: black;
}

.nav-items a:hover,
.nav-items a:active {
  color: white;
}
</style>
