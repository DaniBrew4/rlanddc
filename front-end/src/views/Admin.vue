<template>
  <div class="user">
    <ManageUsers v-if="user && user.accountType === 'admin'" />
    <Login v-else />
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
import axios from 'axios';
import ManageUsers from "@/components/ManageUsers";
export default {
  name: 'admin',
  components: {
    ManageUsers,
    Login,
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
  }
}
</script>

<style scoped>

</style>