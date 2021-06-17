<template>
  <div class="dyslexia">
    <div class="headband">
    </div>
    <div class="page">
      <div class="grid">
        <div class="gridRow">
          <div class="gridItem" id="founder">
            <h1>What is DYSLEXIA?</h1>
          </div>
        </div>
        <hr>
        <div class="gridRow" id="mission">
          <div class="gridItem">
            <img src="../../public/child_reading.png" alt="tutoring">
          </div>
          <div class="gridItem">
            <p>Reading is complex. It requires our brains to connect letters to sounds, put those sounds in the right order, and pull the words together into sentences and paragraphs we can read and comprehend.</p>
            <p>People with dyslexia have trouble matching the letters they see on the page with the sounds those letters and combinations of letters make. And when they have trouble with that step, all the other steps are harder.</p>
            <p>Dyslexic children and adults struggle to read fluently, spell words correctly and learn a second language, among other challenges. But these difficulties have no connection to their overall intelligence. In fact, dyslexia is an unexpected difficulty in reading in an individual who has the intelligence to be a much better reader. While people with dyslexia are slow readers, they often, paradoxically, are very fast and creative thinkers with strong reasoning abilities.</p>
          </div>
        </div>
        <div class="gridRow">
          <p>Dyslexia is also very common, affecting 20 percent of the population and representing 80 – 90 percent of all those with learning disabilities. Scientific research shows differences in brain connectivity between dyslexic and typical reading children, providing a neurological basis for why reading fluently is a struggle for those with dyslexia.</p>
        </div>
        <div class="gridRow">
          <p>Dyslexia can’t be “cured” – it is lifelong. But with the right supports, dyslexic individuals can become highly successful students and adults.</p>
        </div>
        <hr>
        <div class="gridRow">
          <h1>History of DYSLEXIA</h1>
        </div>
        <div class="gridRow">
          <p>“In 1896, a doctor in Sussex, England, published the first description of the learning disorder that would come to be known as developmental dyslexia. ‘Percy F. . . aged 14. . .has always been a bright and intelligent boy,’ wrote W. Pringle Morgan in the British Medical Journal, ‘quick at games, and in no way inferior to others of his age. His great difficulty has been and is now his inability to learn to read.’</p>
        </div>
        <div class="gridRow">
          <p>In that brief introduction, Morgan captured the paradox that has intrigued and frustrated scientists for a century since: the profound and persistent difficulties some very bright people face in learning to read.”</p>
        </div>
        <div class="gridRow">
          <p>© Sally Shaywitz, Overcoming Dyslexia, pp.13- 24.</p>
        </div>
        <div class="gridRow">
          <p>Source: <a href="https://dyslexia.yale.edu/dyslexia/what-is-dyslexia">https://dyslexia.yale.edu/dyslexia/what-is-dyslexia</a></p>
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
.dyslexia {
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