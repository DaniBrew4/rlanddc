<template>
  <div>

    <div class="teacher">
      <p>First Name: {{teacher.firstName}}</p>
      <p>Last Name: {{teacher.lastName}}</p>
      <p>Bio: {{teacher.bio}}</p>
      <div class="bioPhoto">
        <p>Profile Picture: </p>
        <img v-if="photo" :src="photo.path" :alt="teacher.firstName">

        <form class="pure-form" @submit.prevent="upload">
          <fieldset>
            <div class="imageInput" @click="chooseImage">
              <img v-if="url" :src="url" />
              <div v-if="!url" class="placeholder">
                Choose an Image
              </div>
              <input class="fileInput" ref="fileInput" type="file" @input="fileChanged">
            </div>
            <p v-if="error" class="error">{{error}}</p>
          </fieldset>
          <fieldset class="buttons">
            <button type="button" @click="close" class="pure-button">Close</button>
            <button type="submit" class="pure-button pure-button-primary right">Upload</button>
          </fieldset>
        </form>

      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "uploader",
  data() {
    return {
      teacher: {},
      error: '',
      url: '',
      file: null,
      photo: {},
    }
  },
  async created() {
    this.$root.$data.user= (await axios.get('/api/users')).data.user;
    await this.getUser();
    await this.getProfilePic();
  },
  methods: {
    async getUser() {
      try {
        let response = await axios.get("/api/users/" + this.$route.params.id);
        this.teacher = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    fileChanged(event) {
      this.file = event.target.files[0];
      this.url = URL.createObjectURL(this.file);
    },
    close() {
      this.$emit('close');
    },
    chooseImage() {
      this.$refs.fileInput.click()
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file);
        formData.append('user', this.teacher);
        await axios.post("/api/photos", formData);
        this.file = null;
        this.url = "";
        this.$emit('uploadFinished');
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    },
    async getProfilePic() {
      try {
        let response = await axios.get("/api/photos/" + this.teacher._id);
        this.photo = response.data;
      } catch (error) {
        this.error = error.response.data.message;
    }

    }
  }
}
</script>

<style scoped>
.photoInfo p {
  margin: 0px;
}


p {
  margin: 0px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

img {
  width: 75%;
}

.image img {
  width: 100%;
}

</style>

