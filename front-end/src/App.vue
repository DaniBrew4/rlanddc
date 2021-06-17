<template>
  <div id="app">
    <header id="header">
        <div id="logo">
          <router-link to="/"><img src="../public/rlanddc_logo.png" alt="rlanddc company logo"/></router-link>
        </div>
        <div class = header-item>
          <router-link to="/">
            <p>Home</p>
          </router-link>
        </div>
        <div class = header-item>
          <router-link to="/about-us">
            <p>About Us</p>
          </router-link>
        </div>
        <div class = header-item>
          <router-link to="/services">
            <p>Services</p>
          </router-link>
        </div>
        <div class = header-item>
          <router-link to="/dyslexia">
            <p>Dyslexia</p>
          </router-link>
        </div>
        <div class = header-item>
          <router-link to="/contact">
            <p>Contact Us</p>
          </router-link>
        </div>
      <div v-if="user" class = header-item>
        <router-link to="/user">
          <p>Account</p>
        </router-link>
      </div>
        <div class = header-item>
          <router-link to="/user">
            <p v-if="user" @click="logout">Logout<br>{{user.username}}</p>
            <p v-else>Sign Up / Login</p>
          </router-link>
        </div>


      <div class="dropdown">
        <button @click="myFunction()" class="dropbtn">MENU</button>
        <div id="myDropdown" class="dropdown-content">
          <router-link to="/"><p>Home</p></router-link>
          <router-link to="/about-us"><p>About Us</p></router-link>
          <router-link to="/services"><p>Services</p></router-link>
          <router-link to="/dyslexia"><p>Dyslexia</p></router-link>
          <router-link to="/contact"><p>Contact Us</p></router-link>
          <router-link v-if="user" to="/user">
            <p>Account</p>
          </router-link>
          <router-link to="/user">
            <p v-if="user" @click="logout">Logout<br>{{user.username}}</p>
            <p v-else>Sign Up / Login</p>
          </router-link>
        </div>
      </div>

    </header>
    <router-view />

    <div class = "footer">
      <p v-if="user && user.accountType === 'admin'"><router-link to="/admin">Admin</router-link></p>
      <p><a href="https://github.com/DaniBrew4/rlanddc">Github!</a></p>
      <p>Hours Spent: 25</p>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    myFunction() {
      document.getElementById("myDropdown").classList.toggle("show");
    },
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  },
}
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
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
  align-items: center;
}
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 13pt;
  background-color: #fff;

}
#header{
  display: flex;
  background-color: #f1f1f1;
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
  background-color: #f1f1f1;
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
#header .dropdown {
  display: none;
}


@media (max-width: 960px) {
  .header-item {
    display: none;
  }
  #header .dropdown {
    display: inline-block;
  }
  #header{
    align-items: center;
  }
  /* Dropdown Button */
  .dropbtn {
    background-color: orange;
    border-radius: 10px;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    box-shadow: 1px 2px burlywood;
  }

  /* Dropdown button on hover & focus */
  .dropbtn:hover, .dropbtn:focus {
    background-color: darkorange;
  }

  /* The container <div> - needed to position the dropdown content */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    right: 0;
  }

  /* Links inside the dropdown */
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    border-bottom: solid #212121 1px;
  }
  .dropdown-content a:last-child {
    border-bottom: none;
  }

  /* Change color of dropdown links on hover */
  .dropdown-content a:hover {background-color: #ddd}

  /* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
  .show {display:block;}

}

</style>
