<template>
  <div id="app">
    <header id="header">
      <h1>rlanddc</h1>
      <nav>
        <div class = "logo">
          <router-link to="/"><img src="../public/rlanddc_logo.png" alt="rlanddc logo"/></router-link>
        </div>
      </nav>
    </header>
    <router-view />

    <div class = "footer">
      <p><a href="https://github.com/DaniBrew4/rlanddc">Github!</a></p>
    </div>

  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 13pt;
  margin: 0px 200px;
}

</style>
