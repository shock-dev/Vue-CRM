<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>

      <loader v-if="loading"/>

      <div v-else class="row">

        <category-create/>

        <category-edit/>

      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";

export default {
  name: "Categories",
  components: {CategoryEdit, CategoryCreate},
  data() {
    return {
      categories: [],
      loading: true
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('loadCategories')
    this.loading = false
  }
}
</script>

<style scoped>

</style>
