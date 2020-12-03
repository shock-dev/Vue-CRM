<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{ 'Sum' | localize }}</th>
      <th>{{ 'Date' | localize }}</th>
      <th>{{ 'Category' | localize }}</th>
      <th>{{ 'Type' | localize }}</th>
      <th>{{ 'Open' | localize }}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, index) in records" :key="record.id">
      <td>{{ index + 1 }}</td>
      <td>{{ record.amount | currency }}</td>
      <td>{{ new Date(record.date) | date('datetime') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span class="white-text badge" :class="record.typeClass">{{ record.typeText }}</span>
      </td>
      <td>
        <button class="btn-small btn" @click="$router.push('/detail/' + record.id)">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "HistoryTable",
  props: {
    records: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
