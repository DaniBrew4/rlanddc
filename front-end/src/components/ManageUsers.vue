<template>
  <div class="UserInfo">
    <div class="headband">
      <h1>{{user.firstName}} {{user.lastName}}</h1>
      <p>Account Type: {{user.accountType}}</p>
    </div>

    <h1 id="userTitle">Users</h1>
    <div class="users">
      <div class="account" v-for="account in users" v-bind:key="account._id">
        <p>First Name: {{account.firstName}}</p>
        <p>Last Name: {{account.lastName}}</p>
        <p>Username: {{account.username}}</p>
        <p>Email: {{account.email}}</p>
        <p>Account Type: {{account.accountType}}</p>
        <p>Account Creation: {{formatDate(account.created)}}</p>
        <p v-if="account.bio">User Bio: {{account.bio}}</p>

        <div class="controls">
          <button type="button" @click="isShow = !isShow">Edit Account Info</button>
          <div class="accountForm" v-if="isShow">
            <b>First Name:</b><input :placeholder="account.firstName" v-model="account.firstName">
            <b>Last Name: </b><input :placeholder="account.lastName" v-model="account.lastName">
            <b>Account Type: </b><input :placeholder="account.accountType" v-model="account.accountType">
            <b>Email: </b><input v-if="account.email" :placeholder="account.email" v-model="account.email">
            <input v-else placeholder="Email" v-model="account.email">
            <b>Bio: </b><input v-if="account.bio" :placeholder="account.bio" v-model="account.bio">
            <input v-else placeholder="Bio" v-model="account.bio">
            <button type="button" @click="adminChanges(account)" id="submit">Submit</button>
            <p v-if="success" class="success">{{success}}</p>
          </div>
          <p v-if="error" class="error">{{error}}</p>
        </div>

      </div>
    </div>

    <h1 id="bioTitle">Teacher Bios</h1>
    <div class="users">
      <div class="bios" v-for="bios in teachOnly" v-bind:key="bios._id">
        <div class="teacher">
          <p>First Name: {{bios.firstName}}</p>
          <p>Last Name: {{bios.lastName}}</p>
          <p>Bio: {{bios.bio}}</p>
          <div class="bioPhoto">
            <p>Profile Picture: </p>
            <img v-if="bios.photo" :src="bios.photo.path" :alt="bios.firstName">
            <router-link :to="{ name: 'uploader', params: { id: bios._id }}"><button type="button">Add Photo</button></router-link>

          </div>
        </div>
      </div>
    </div>

    <h1 id="classTitle">Classes</h1>



  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: "ManageUsers",
  data() {
    return {
      error: '',
      success: '',
      isShow: false,
      users: [],
    }
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
      await this.getUsers();
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
    formatDate(date) {
      return moment(date).format('DD MMMM YYYY');
    },
    async adminChanges(account) {
      this.error = '';
      if (!account.firstName || !account.lastName || !account.email || !account.accountType)
        return;
      try {
        let response = await axios.put('/api/users/admin', {
          username: account.username,
          firstName: account.firstName,
          lastName: account.lastName,
          email: account.email,
          accountType: account.accountType,
          bio: account.bio,
        });
        this.users = response.data.users;
        this.success = "changes saved"
        this.isShow = false;
        await this.getUsers();
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async getUsers () {
      try {
        let response = await axios.get('/api/users/all');
        this.users = response.data.users;
      } catch (error) {
        this.users = null;
      }
    },
  }
}
</script>

<style scoped>
.UserInfo {
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
  height: 10vh;
  margin: 20px;
}
.users {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
}

.account, .bios {
  text-align: left;
  padding: 20px;
  width: 30%;
  margin: 20px;
  border: solid #2c3e50 5px;
}
.controls {
  text-align: center;
  padding: 10px;
  width: 100%;
  margin: 10px;
}
.accountForm {
  display: flex;
  flex-direction: column;
  text-align: left;
}
#userTitle, #bioTitle, #classTitle {
  text-align: center;
  width: 100%;
}
img {
  width: 100%;
}

@media (max-width: 960px) {
  .UserInfo {
    flex-direction: column;
    min-height:60vh;
  }
  .headband, .controls, .users {
    width: 100%;
  }
  .account, .bios {
    width: 100%;
  }
}

</style>