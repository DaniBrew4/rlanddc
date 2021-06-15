<template>
  <div id="app">
    <header id="header">
        <div id="logo">
          <router-link to="/"><img src="../public/rlanddc_logo.png" alt="rlanddc company logo"/></router-link>
        </div>
        <div class = header-item>
          <router-link to="/home">
            <p>Home</p>
          </router-link>
        </div>
        <div class = header-item>
          <router-link to="/home">
            <p>About Us</p>
          </router-link>
        </div>
        <div class = header-item>
          <router-link to="/home">
            <p>Services</p>
          </router-link>
        </div>
        <div class = header-item>
          <router-link to="/home">
            <p>Dyslexia</p>
          </router-link>
        </div>
        <div class = header-item>
          <router-link to="/home">
            <p>Contact Us</p>
          </router-link>
        </div>
        <div class = header-item>
          <router-link to="/home">
            <p v-if="user">Logout</p>
            <p v-else>Sign Up / Login</p>
          </router-link>
        </div>
        <div class = header-item>
          <router-link to="/home">
            <p>DONATE NOW</p>
          </router-link>
        </div>


      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link to="/home">
                  <p>Home</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/home">
                  <p>About Us</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/home">
                  <p>Services</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/home">
                  <p>Dyslexia</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/home">
                  <p>Contact Us</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/home">
                  <p >DONATE NOW</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/home">
                  <p v-if="user">Logout</p>
                  <p v-else>Sign Up / Login</p>
                </router-link>
              </li>
            </ul>
          </div>
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
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 13pt;
  background-color: #707070;
}
#header{
  display: flex;
  background-color: #fff;
  border: 1px solid red;
  width: 100%;
  height: 120px;
  flex-direction: row;
  justify-content: space-around;
  align-items: baseline;
}
#header img {
  height: 100px;
  margin-top: 10px;
}
.header-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 20px;
}
#logo {
  justify-content: left;
}
.footer  {
  display: flex;
  background-color: #fff;
  border: 1px solid red;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  padding: 20px;
}

.header-item a { /* Unvisited link */
  text-decoration: none;
}
.header-item a:visited { /* Visited link */
  text-decoration: none;
  color: inherit;
}
.header-item a:hover { /* Mouse over link */
  text-decoration: none;
  color: burlywood;
}
.header-item a:active { /* Selected Link */
  text-decoration: none;
}
.nav-item a { /* Unvisited link */
  text-decoration: none;
}
.nav-item a:visited { /* Visited link */
  text-decoration: none;
  color: inherit;
}
.nav-item a:hover { /* Mouse over link */
  text-decoration: none;
  color: burlywood;
}
.nav-item a:active { /* Selected Link */
  text-decoration: none;
}

#header nav {
  display: none;
}

@media (max-width: 960px) {
  .header-item {
    display: none;
  }
  #header{
    align-items: center;
  }
  #header nav {
    display: inline-block;
    margin-left: auto!important;
    margin-right: 0!important;
  }

}

</style>
