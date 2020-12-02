<template>
  <div>
    <loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link :to="{name: 'history'}" class="breadcrumb">История</router-link>
        <a class="breadcrumb">
          {{ record.text }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.color">
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ new Date(record.date) | date }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="center">Такой записи не существует.</p>
  </div>
</template>

<script>
export default {
  name: "DetailRecord",
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('loadRecordById', id)
    const category = await this.$store.dispatch('loadCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title,
      color: record.type === 'income' ? 'green' : 'red',
      text: record.type === 'income' ? 'Доход' : 'Расход'
    }

    this.loading = false
  }
}
</script>

<style scoped>

</style>
