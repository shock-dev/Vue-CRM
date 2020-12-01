<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
import messages from "@/utils/messages";
import { mapGetters } from 'vuex'

export default {
  name: "EmptyLayout",
  computed: {
    ...mapGetters(['error'])
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
