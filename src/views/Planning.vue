<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Planning' | localize }}</h3>
      <h4>{{ info.bill | currency }}</h4>
    </div>

    <loader v-if="loading"/>

    <p v-else-if="!categories.length" class="center">Категорий еще нет. <router-link :to="{name: 'categories'}">Создать категорию</router-link></p>

    <section v-else>
      <div
        v-for="cat in categories"
        :key="cat.id"
      >
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ cat.spent | currency }} из {{ cat.limit | currency }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
              class="determinate"
              :class="cat.progressColor"
              :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'
import localize from "@/filters/localize.filter";

export default {
  name: "Planning",
  metaInfo() {
    return {
      title: this.$title('Menu__Planning')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters([
        'info'
    ])
  },
  async mounted() {
    const categories = await this.$store.dispatch('loadCategories')
    const records = await this.$store.dispatch('loadRecords')

    this.categories = categories.map(cat => {
      const spent = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount
        }, 0)

      const percent = 100 * spent / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
          ? 'green'
          : percent < 100
              ? 'yellow'
              : 'red'

      const tooltipValue = cat.limit - spent
      const tooltip = `${tooltipValue < 0 ? localize('Excess_by') : localize('remained')} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        spent,
        progressPercent,
        progressColor,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>

<style scoped>

</style>
