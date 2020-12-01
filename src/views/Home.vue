<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <loader v-if="loading" />

    <div v-else class="row">
      <home-bill
        :rates="currently.rates"
      />

      <home-currently/>
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCurrently from "@/components/HomeCurrently";

export default {
  name: "Home",
  components: {HomeCurrently, HomeBill},
  data() {
    return {
      loading: true,
      currently: null
    }
  },
  async mounted() {
    this.currently = await this.$store.dispatch('fetchCurrently')
    this.loading = false
  }
}
</script>

<style scoped>

</style>
