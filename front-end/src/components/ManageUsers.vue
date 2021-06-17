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
        <div class="teacher" >
          <p>First Name: {{bios.firstName}}</p>
          <p>Last Name: {{bios.lastName}}</p>
          <p>Bio: {{bios.bio}}</p>
          <div class="bioPhoto">
            <p>Profile Picture: </p>
            <img v-if="photos.find(item => item.user === bios._id)" :src="photos.find(item => item.user=== bios._id).path" :alt="bios.firstName">
            <router-link :to="{ name: 'uploader', params: { id: bios._id }}"><button type="button">Add Photo</button></router-link>
          </div>
        </div>
      </div>
    </div>

    <h1 id="classTitle">Classes</h1>
    <div class="classes">
      <div class="creator">
        <div class="suggestions" v-if="users.length > 0">
          <h3>Add a class</h3>
          <div class ="fillItem">
            <b>Class Name:</b><input placeholder="Class Name" v-model="className">
          </div>
          <div class ="fillItem">
            <b>Teacher:</b>
              <multiselect v-model="teacher" :options="teachOnly" :preserve-search="true" placeholder="Pick Teacher" label="firstName" track-by="username"></multiselect>
          </div>
          <div class ="fillItem">
            <b>Students:</b>
            <multiselect v-model="students" :options="users" :multiple="true" :close-on-select="false" :preserve-search="true" placeholder="Pick Students" label="firstName" track-by="username"></multiselect>
          </div>

        </div>
        <button type="button" @click="createClass" id="submission">Submit</button>
        <p v-if="success" class="success">{{success}}</p>
      </div>
      <p v-if="error" class="error">{{error}}</p>
      <br>
      <h3>All Classes</h3>
      <div class="groups" v-for="group in classes" v-bind:key="group._id">
        <p>Class Name: {{group.className}}</p>
        <p>Teacher: {{teachOnly.find(item => item._id === group.teacher).firstName}} {{teachOnly.find(item => item._id === group.teacher).lastName}}</p>
        <div class="students" v-for="student in group.students" v-bind:key="student._id">
          <p>Student: {{student.firstName}} {{student.lastName}}</p>
        </div>
        <button type="button" @click="deleteClass(group)" id="delete">Delete Class</button>
      </div>
    </div>



  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Multiselect from 'vue-multiselect'

export default {
  name: "ManageUsers",
  components: { Multiselect },
  data() {
    return {
      error: '',
      success: '',
      isShow: false,
      users: [],
      photos: [],
      className: '',
      teacher: {},
      students: [],
      classes: [],
    }
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
      await this.getUsers();
      await this.getPhotos();
      this.getClasses();
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
    async getPhotos() {
      try {
        let response = await axios.get('/api/photos/');
        this.photos = response.data.photos;
      } catch (error) {
        this.photos = null;
      }
    },
    async getClasses() {
      try {
        let response = await axios.get('/api/classes/all');
        this.classes = response.data.classes;
      } catch (error) {
        this.photos = null;
      }
    },
    async createClass() {
      this.error = '';
      if (!this.className || !this.teacher || !this.students)
        return;
      try {
        await axios.post('/api/classes', {
          className: this.className,
          teacher: this.teacher,
          students: this.students,
        });
        this.className= '';
        this.teacher= {};
        this.students= [];
        await this.getClasses();
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async deleteClass(group) {
      try {
        await axios.delete("/api/classes/" + group._id);
        this.getClasses();
        return true;
      } catch (error) {
        console.log(error);
      }

    }
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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
.classes {
  width: 100%;
}
.suggestions {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.fillItem {
  margin: 20px;
}
.groups {
  width: 30%;
  border: solid #2c3e50 5px;
  text-align: left;
  margin: 20px;
  padding: 20px;
}
button {
  background-color: orange;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 10px;
  box-shadow: 1px 2px burlywood;
}
input {
  padding: 10px;
  border: none;
  box-shadow: 1px 2px #888888;
  border-radius: 5px;
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
  .groups {
    width: 100%;
  }
}

</style>