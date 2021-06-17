<template>
  <div class="services">
    <div class="headband">
    </div>
    <div class="page">
      <div class="grid">
        <div class="gridRow">
          <div class="gridItem" id="founder">
            <h1>Our Services</h1>
          </div>
        </div>
        <hr>
        <div class="gridRow" id="mission">
          <div class="gridItem">
            <img src="../../public/tutoring.png" alt="tutoring">
          </div>
          <div class="gridItem">
            <h1>Tutoring</h1>
            <p>The Reading Lab & Dyslexia Center offers tutoring for all ages. Our lessons are tailored to each individual. During the first assessment, we’ll determine what the student already knows, any missing holes in the foundation, and use that information to map future lessons. We start with phonics and build from there, using an OG (Orton Gillingham) program, especially designed for struggling readers.</p>
            <p>Sessions are $55/hour. Scholarships may be available upon request.</p>
            <p>To schedule a free evaluation call Lori Bassett at <a target="_blank" href="tel:(435) 229-2853">(435) 229-2853</a></p>
          </div>
        </div>
        <hr>
        <div class="gridRow">
          <div class="gridItem">
            <img src="../../public/public_info.png" alt="public information">
          </div>
          <div class="gridItem">
            <h1>Free Public Information</h1>
            <p>Lori Bassett, the owner and director of RL & DC is dedicated to getting information to the community about dyslexia and the help that is available to people of all ages. Check out these resources and links below:</p>
            <p><a href="https://dyslexiaida.org">https://dyslexiaida.org
            </a>
              <a href="https://www.understood.org">https://www.understood.org
              </a>
              <a href="https://www.ldau.org">https://www.ldau.org
              </a>
              <a href="https://www.dyslexia.yale.edu">https://www.dyslexia.yale.edu
              </a>
              <a href="https://www.dyslexiatraininginstitute.org">https://www.dyslexiatraininginstitute.org
              </a>
            </p>
            <p>Good videos about dyslexia:
              <a href="https://youtu.be/zafiGBrFkRM?list=PLRKuctNgAKWKQcUtwBp6z2dKJ-qN3bh1n">https://youtu.be/zafiGBrFkRM?list=PLRKuctNgAKWKQcUtwBp6z2dKJ-qN3bh1n</a>
                <a href="https://youtu.be/kE3DqJP-nkI">https://youtu.be/kE3DqJP-nkI</a></p>
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
  name: "Services",
  data() {
    return {
      error: '',
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
    teachOnly() {
      return this.users.filter(bio => {
        return (bio.accountType === 'teacher' || bio.accountType === 'admin');
      })
    },
  },
}
</script>

<style scoped>
.services {
  min-height:85vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
  background-color: #dddddd;
}
.headband {
  width: 100%;
  background-color: orange;
  height: 3vh;
}
.page {
  width:80%;
  margin: 20px;
  max-width: 1800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
p {
  text-align: left;
}
.grid {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.gridRow {
  width: 100%;
  text-align: left;
  font-size: 16px;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-weight: 400;
  line-height: 1.5;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.gridItem {
  width: 100%;
  padding: 20px;
}
hr {
  border: 5px solid #212121;
}
img {
  width: 100%;
}
@media (min-width: 960px) {
  .gridItem {
    width: 50%;
  }
  #founder {
    width: 100%;
  }
}

</style>