<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ 'Exchange_rate' | localize }}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{ 'Currency' | localize }}</th>
            <th>{{ 'Course' | localize }}</th>
            <th>{{ 'Date' | localize }}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="cur in currencies" :key="cur">
            <td>{{ cur }}</td>
            <td>{{ rates[cur].toFixed(5) }}</td>
            <td>{{ date }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCurrently",
  props: ['rates', 'date'],
  data() {
    return {
      currencies: ['RUB', 'EUR', 'USD']
    }
  }
}
</script>

<style scoped>

</style>
