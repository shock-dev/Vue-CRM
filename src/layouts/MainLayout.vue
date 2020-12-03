<template>
  <div>
    <loader v-if="loading"/>
    <div v-else class="app-main-layout">
      <navbar
          @toggleSidebar="isOpen = !isOpen"
      />

      <sidebar
          :isOpen="isOpen"
          :key="locate"
      />

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" :to="{name: 'record'}">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import {mapGetters, mapActions} from 'vuex';
import messages from "@/utils/messages";

export default {
name: "MainLayout",
  components: {Sidebar, Navbar},
  data() {
    return {
      isOpen: true,
      loading: true
    }
  },
  async mounted() {
    if (!Object.keys(this.info).length) {
      await this.loadInfo()
    }

    this.loading = false
  },
  computed: {
    ...mapGetters([
      'info',
      'error'
    ]),
    locate() {
      return this.$store.getters.info.locale
    }
  },
  methods: {
      ...mapActions([
          'loadInfo'
      ])
  },
  watch: {
    error(fb) {
      this.$error(messages[fb.code] || 'Что-то пошло не так')
    }
  }
}
</script>

<style scoped>

</style>
