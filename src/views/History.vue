<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <loader v-if="loading"/>

    <p v-else-if="!records.length" class="center">Записей пока нет.</p>

    <section v-else>
      <history-table
        :records="records"
      />

      <Paginate/>

    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
export default {
name: "History",
  components: {HistoryTable},
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  async mounted() {
    const records = await this.$store.dispatch('loadRecords')
    this.categories = await this.$store.dispatch('loadCategories')

    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Рассход'
      }
    })

    this.loading = false
  }
}
</script>

<style scoped>

</style>
