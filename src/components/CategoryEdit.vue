<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Edit' | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
                v-for="c in categories"
                :key="c.id"
                :value="c.id"
            >
              {{ c.title }}
            </option>
          </select>
          <label>{{ 'Choose_category' | localize }}</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">{{ 'Title' | localize }}</label>
          <span
              v-if="$v.title.$dirty && !$v.title.required"
              class="helper-text invalid"
          >
            {{ 'Enter_category_title' | localize }}
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">{{ 'Limit' | localize }}</label>
          <span
              v-if="$v.limit.$dirty && !$v.limit.minValue"
              class="helper-text invalid"
          >
            {{ 'Min_value' }} 100
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'Refresh' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {minValue, required} from "vuelidate/lib/validators";

export default {
  name: "CategoryEdit",
  props: {
    categories: {
      type: Array,
      required: true,
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: '',
    current: null
  }),
  created() {
    const {id, title, limit} = this.categories[0]

    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    window.M.updateTextFields();

    this.select = window.M.FormSelect.init(this.$refs.select)
  },
  watch: {
    current(catId) {
      const {id, title, limit} = this.categories.find(c => c.id === catId)

      this.current = id
      this.title = title
      this.limit = limit
    }
  },
  validations: {
    title: {
      required
    },
    limit: {
      minValue: minValue(100)
    }
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const categoryData = {
        id: this.current,
        title: this.title,
        limit: this.limit
      }

      try {
        await this.$store.dispatch('updateCategory', categoryData)

        this.$emit('updated', categoryData)

        this.$message('Категория успешно обновлена')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
