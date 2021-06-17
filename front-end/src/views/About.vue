<template>
  <div class="about">
    <div class="headband">
    </div>
    <div class="page">
      <div class="grid">
        <div class="gridRow">
          <div class="gridItem" id="founder">
            <h1>ABOUT THE FOUNDER - Lori Basset</h1>
            <p>I am a wife, mother of 4, and a grandmother of 1. I have helped raise over 30 kids in my home over the past 25 years, and love to help children still today. It brings me peace and joy each day. I am a dyslexic and ADHD teacher of the English language. My passion is to help others, to do art (of almost any kind), and to be around animals. I love to learn constantly. I have a Bachelor of Science in English Literature. I have owned several businesses since I was 13 years old. I don’t wait for my dreams to pass me by. I love to be active with my family and friends, but I also love to snuggle in and watch a good movie with them.</p>
          </div>
        </div>
        <hr>
        <div class="gridRow" id="mission">
          <div class="gridItem">
            <h6>Our Mission</h6>
            <p>Our mission is to provide tutoring for students with dyslexia or other related struggles in reading, writing, spelling, comprehension, and self-image/esteem. To help students gain an understanding of the important person they are now and forever no matter the level of their abilities at the present time in reading, writing, spelling, and educational marks. We use English language foundational rules to teach students with dyslexia and related challenges through multi-sensory, OG, explicit, and scientifically proven methods to read better.</p>
          </div>
          <div class="gridItem">
            <h6>Our Purpose</h6>
            <p>Our purpose is to teach that concepts are learned in many ways for many different learners, that the process is just as important as the outcome, and that relationships are vital in our growth during our education for dyslexic or non-dyslexic readers. We help fuel the acceptance or passion for reading.</p>
          </div>
        </div>
        <hr>
        <div class="gridRow" id="story">
          <div class="gridItem">
            <img src="../../public/about_typewriter.png" alt="typewriter">
          </div>
          <div class="gridItem">
            <h1>OUR STORY</h1>
            <p>I started looking for help with my own children 20 years ago in St. George. I had 1 teacher that tried to help and many others that just did not understand how to help us. I found the International Dyslexia Association and went to a conference in San Diego where my mind was blown. I finally found help and so much information. I learned several different programs and contacts that helped me help several kids. But the kids needed a center where they could play with their words and lessons. The community needed information for free. People needed someone to just talk to. I opened that center. Reading Lab is a great laboratory that is where we pull apart words and learn to decode. We learn to push sounds together and spell. We learn a foundation to the English language that dyslexic students need in an explicit scientifically proven way.</p>
          </div>
          <div class="gridItem">
          </div>
        </div>
        <p>They need to understand that there are many dyslexic people and that they are not alone! They need to gain self-confidence that they have lost in the educational system that has been trying their best to help them. Education teachers are great! But they don’t get this kind of training unless they seek it out. We help all ages 5 years through adults. The Dyslexia Center is always a free reference guide for our community. Ask and we will tell you where to look. Even if you don’t know what to ask we give an overload of information.</p>
        <hr>
        <div class="gridRow" id="team">
          <h1>OUR TEAM MEMBERS</h1>
          <div class="gridItem" v-for="teacher in teachOnly" v-bind:key="teacher._id">
            <img v-if="photos.find(item => item.user === teacher._id)" :src="photos.find(item => item.user === teacher._id).path" :alt="teacher._id">
            <h3>{{teacher.firstName}} {{teacher.lastName}}</h3>
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
  name: "About",
  data() {
    return {
      error: '',
      users: [],
      photos: [],
    }
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
      this.getUsers();
      this.getPhotos();
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
    async getUsers () {
      try {
        let response = await axios.get('/api/users/all');
        this.users = response.data.users;
      } catch (error) {
        this.users = null;
      }
    },
    async getPhotos() {
      try {
        let response = await axios.get('/api/photos/');
        this.photos = response.data.photos;
      } catch (error) {
        this.photos = null;
      }
    },
  },
}
</script>

<style scoped>
.about {
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
  #team {
    width: 50%;
  }
  #founder {
    width: 100%;
  }
}

</style>