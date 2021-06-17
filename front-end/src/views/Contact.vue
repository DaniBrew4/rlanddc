<template>
  <div class="contact">
    <div class="headband">
    </div>
    <div class="page">
      <div class="grid">
        <div class="gridRow">
          <div class="gridItem" id="founder">
            <h1>Get in Touch</h1>
          </div>
        </div>
        <div class="gridRow">
          <div class="gridItem" id="email">
            <a href="mailto:readinglabanddyslexiacenter@gmail.com" target="_blank">readinglabanddyslexiacenter@gmail.com</a>
          </div>
          </div>
        <div class="gridRow">
          <div class="gridItem" id="phone">
            <a target="_blank" href="tel:(435) 229-2853">(435) 229-2853</a>
          </div>
        </div>
        <hr>
        <div class="gridRow">
          <div class="gridItem">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1591.491769269702!2d-113.57504993052497!3d37.081698947835044!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ca4534fc8bb6c9%3A0x767472ec3f866a67!2s352%20E%20Riverside%20Dr%2C%20St.%20George%2C%20UT%2084790!5e0!3m2!1sen!2sus!4v1623966275799!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
          </div>
          <div class="gridItem">
            <input placeholder="Name" v-model="emailName">
            <input placeholder="Email Address" v-model="emailAddress">
            <textarea rows="10" cols="25" placeholder="Your Message" v-model="message"></textarea>
            <button>SEND MESSAGE</button>
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
  name: "Dyslexia",
  data() {
    return {
      error: '',
      emailName: '',
      emailAddress: '',
      message: '',
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
  methods: {
    sendEmail() {
      try {
        if(!this.emailName || !this.emailAddress || !this.message) {
          return;
        }
        //Here I would send an email
        this.emailName = '';
        this.emailAddress = '';
        this.message = '';
        return true;
      } catch {
        console.log("{error}")
      }
      // Reset form field
      this.emailName = '';
      this.emailAddress = '';
      this.message = '';
    },
  },
}
</script>

<style scoped>
.contact {
  min-height:85vh;
  display: flex;
  width: 100%;
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
  text-align: center;
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
input, textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  box-shadow: 1px 2px #888888;
  border-radius: 5px;
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

@media (min-width: 960px) {
  .gridItem {
    width: 50%;
  }
  #founder, #email, #phone{
    width: 100%;
    text-align: center;
  }
}

</style>