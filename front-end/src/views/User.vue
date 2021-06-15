<template>
  <div class="user">
    <UserInfo v-if="user" />
    <Login v-else />
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue';
import Login from '@/components/Login.vue';
import axios from 'axios';
export default {
  name: 'user',
  components: {
    UserInfo,
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