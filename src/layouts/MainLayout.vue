<template>
  <div class="app-main-layout">
    <navbar
      @toggleSidebar="isOpen = !isOpen"
    />

    <sidebar
      :isOpen="isOpen"
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
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import {mapGetters, mapActions} from 'vuex';

export default {
name: "MainLayout",
  components: {Sidebar, Navbar},
  data() {
    return {
      isOpen: true
    }
  },
  async mounted() {
    if (!Object.keys(this.info).length) {
      await this.loadInfo()
    }
  },
  computed: {
    ...mapGetters([
        'info'
    ])
  },
  methods: {
      ...mapActions([
          'loadInfo'
      ])
  }
}
</script>

<style scoped>

</style>
