<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p
            v-for="item in currencies"
            :key="item"
            class="currency-line"
        >
          <span>{{ getCurrency(item) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeBill",
  props: ['rates'],
  data() {
    return {
      currencies: ['RUB', 'EUR', 'USD']
    }
  },
  computed: {
    base() {
      return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
    }
  },
  methods: {
    getCurrency(c) {
      return Math.floor(this.base * this.rates[c])
    }
  }
}
</script>

<style scoped>

</style>
