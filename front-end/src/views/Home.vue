<template>
  <div class="home">

    <div class="headband">
    </div>

    <div class="mainImage" :style="image" >
      <div class="grid">

        <div class="rowItem">
          <div class="gridItem">
            <h3>Dyslexia is real and we can help!</h3>
          </div>
        </div>

        <div class="rowItem">
          <div class="gridItem">
            <h1>Is your child struggling in school?
              We put the FUN back in the fundamentals!</h1>
          </div>
        </div>

        <div class="rowItem">
          <div class="gridItem">
            <router-link to="/services"><button>Learn More</button></router-link>
          </div>
          <div class="gridItem">
            <router-link to="/contact-us"><button>Contact Us</button></router-link>
          </div>
        </div>

        <div class="rowItem">
          <div class="gridItem" id="tutoring">
          <h2>Tutoring</h2>
            <p>RL & DC offers tutoring for all ages. These lessons and sessions are tailored to each person individually.</p>
            <router-link to="/services"><p>Learn More</p></router-link>
          </div>
          <div class="gridItem" id="publicInfo">
            <h2>Public Information</h2>
            <p>We have information and connections to give out for FREE. Just call or make an appointment to come in and talk.</p>
            <router-link to="/dyslexia"><p>Learn More</p></router-link>
          </div>
          <div class="gridItem" id="sponsor">
            <h2>Sponsor a Child</h2>
            <p>Tutoring is expensive. Not everyone can afford it. In fact, most cannot. We NEED your HELP!</p>
            <router-link to="/contact-us"><p>Learn More</p></router-link>
          </div>
        </div>

      </div>

    </div>


    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      error: '',
      image: { backgroundImage: "url(../../home_image.png"}
    }
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  }
}
</script>

<style scoped>

.home {
  min-height:85vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  background-color: #dddddd;
}
.headband {
  width: 100%;
  background-color: orange;
  height: 3vh;
}
.mainImage{
  width: 100%;
  min-height: 80vh;
  background-color: grey;
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: flex-end;
  justify-content: flex-end;
}
.grid {
  width: 70%;
  opacity: 1.0;
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: center;
  align-content: flex-end;
  background:rgba(0,0,0,0.6);
}
.rowItem {
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  opacity: 1.0;
}

.gridItem {
  padding: 10px;
  color: white;
  opacity: 1.0;
}

button  {
  padding: 5px 10px 5px 10px;
  border: none;
  background-color: orange;
  color: white;
  border-radius: 5px;
  box-shadow: 1px 2px burlywood;
}
button:hover {
  background-color: burlywood;
  box-shadow: 1px 2px orange;
}

#tutoring, #publicInfo, #sponsor {
  padding: 20px;
  margin: 20px;
  min-height: 20vh;
  width: 30%;
  text-align: center;
}
#tutoring p, #publicInfo p, #sponsor p {
  font-weight: 1;
}
#tutoring a, #publicInfo a, #sponsor a {
  font-weight: 1;
  color: white;
  text-decoration: underline;

}
#tutoring a:hover, #publicInfo a:hover, #sponsor a:hover {
  color: burlywood;
}

#tutoring {
  background-color: darkolivegreen;
}
#publicInfo {
  background-color: steelblue;
}
#sponsor {
  background-color: orange;
}

@media (max-width: 960px) {
  .rowItem, .grid, .gridItem {
    flex-direction: column;
    width: 100%;
  }
  #tutoring, #publicInfo, #sponsor {
    padding: 20px;
    margin: 20px;
    min-height: 20vh;
    width: 90%;
  }
}


</style>