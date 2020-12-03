<template>
  <div>
    <div class="page-title">
      <h3>{{ 'New_record' | localize }}</h3>
    </div>

    <loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">Категорий пока нет. <router-link :to="{name: 'categories'}">Добавить категорию</router-link></p>

    <form v-else class="form" @submit.prevent="formHandler">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
          >{{ cat.title }}</option>
        </select>
        <label>{{ 'Choose_category' | localize }}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>{{ 'Income' | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>{{ 'Expenses' | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">{{ 'amount' | localize }}</label>
        <span
            v-if="$v.amount.$dirty && !$v.amount.minValue"
            class="helper-text invalid"
        >
            {{ 'Min_value' | localize }} 1
          </span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">{{ 'Description' | localize }}</label>
        <span
            v-if="$v.description.$dirty && !$v.description.required"
            class="helper-text invalid"
        >
            {{ 'Enter_description_record' | localize }}
          </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Create' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {minValue, required} from "vuelidate/lib/validators";
import {mapGetters} from 'vuex';

export default {
  name: "Record",
  data: () => ({
    select: null,
    loading: true,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''

  }),
  methods: {
    async formHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })

          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill})

          this.$message('Запись успешно создана')

          this.$v.$reset()

          this.amount = 1
          this.description = ''

        } catch (e) {
          console.log(e)
        }
      } else {
        this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`)
      }
    }
  },
  computed: {
    ...mapGetters([
        'info'
    ]),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('loadCategories')
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      window.M.updateTextFields();
      this.select = window.M.FormSelect.init(this.$refs.select)
    }, 0)
  },
  validations: {
    amount: {
      minValue: minValue(1)
    },
    description: {
      required
    }
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style scoped>

</style>
