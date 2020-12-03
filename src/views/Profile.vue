<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="description">{{ 'Name' | localize }}</label>
        <span
            v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid">{{ 'EnterName' | localize }}</span>
      </div>

      <div class="switch">
        <label>
          En
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Ru
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Refresh' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {required} from 'vuelidate/lib/validators'

export default {
  name: "Profile",
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  mounted() {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'

    setTimeout(() => {
      window.M.updateTextFields();
    })
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()

        return
      }

      try {
        await this.$store.dispatch('updateInfo', {
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  validations: {
    name: {required}
  },
  computed: {
    ...mapGetters(['info'])
  }
}
</script>

<style scoped>
  .switch {
    margin-bottom: 20px;
  }
</style>
