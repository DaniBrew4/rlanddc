<template>
<div class="UserInfo">
  <div class="headband">
    <h3>Account Info</h3>
    <h1>{{user.firstName}} {{user.lastName}}</h1>
  </div>
  <div class="controls">
    <button type="button" id="formButton" @click="isShow = !isShow">Edit Account Info</button>
    <div class="accountForm" v-if="isShow">
      <b>First Name:</b><input :placeholder="user.firstName" v-model="firstName">
      <b>Last Name: </b><input :placeholder="user.lastName" v-model="lastName">
      <b>Email: </b><input v-if="user.email" :placeholder="user.email" v-model="email">
      <input v-else placeholder="Email" v-model="email">
      <button type="button" @click="saveChanges()" id="submit">Submit</button>
    </div>
    <p v-if="error" class="error">{{error}}</p>
  </div>

  <div class="details">
    <h3>First Name: {{user.firstName}}</h3>
    <h3>Last Name: {{user.lastName}}</h3>
    <h3>Username: {{user.username}}</h3>
    <h3>Email: {{user.email}}</h3>
    <h3>Account Type: {{user.accountType}}</h3>
    <h3>Account Creation: {{formatDate(user.created)}}</h3>
  </div>

</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: "UserInfo",
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      error: '',
      isShow: false,
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
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD MMMM YYYY');
    },
    async saveChanges() {
      this.error = '';
      if (!this.firstName || !this.lastName || !this.email)
        return;
      try {
        let response = await axios.put('/api/users', {
          username: this.$root.$data.user.username,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  }
}
</script>

<style scoped>
.UserInfo {
  border: solid red 1px;
  min-height:85vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  background-color: #dddddd;
}
.headband {
  border: solid blue 1px;
  width: 100%;
  height: 10vh;
  margin: 20px;
}

.details {
  border: solid green 1px;
  text-align: left;
  padding: 20px;
  width: 50%;
  margin: 20px;
}
.controls {
  border: solid purple 1px;
  text-align: center;
  padding: 20px;
  width: 100%;
  margin: 20px;
}
.accountForm {
  display: flex;
  flex-direction: column;
  text-align: left;
}

@media (max-width: 960px) {
  .UserInfo {
    flex-direction: column;
    min-height:60vh;
  }
  .headband, .controls, .details, .profilePicture {
    width: 100%;
  }
}

</style>