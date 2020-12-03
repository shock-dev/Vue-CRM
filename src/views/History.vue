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
        :records="items"
      />

      <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChange"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
      />

    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from '@/mixins/pagination.mixin'

export default {
  name: "History",
  components: {HistoryTable},
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('loadRecords')
    const categories = await this.$store.dispatch('loadCategories')

    this.setupPagination(this.records.map(record => {
      return {
        ...record,
        categoryName: categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Рассход'
      }
    }))

    this.loading = false
  }
}
</script>

<style scoped>

</style>
