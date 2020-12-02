<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>

      <loader v-if="loading"/>

      <div v-else class="row">

        <category-create
          @created="created"
        />

        <category-edit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updated"
        />

        <p v-else class="center">Категорий пока нет</p>

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
      loading: true,
      updateCount: 0
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('loadCategories')
    this.loading = false
  },
  methods: {
    updated(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)

      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit

      this.updateCount++
    },
    created(newCategory) {
      this.categories.push(newCategory)
    }
  }
}
</script>

<style scoped>

</style>
