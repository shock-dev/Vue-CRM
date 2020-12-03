<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="description">Имя</label>
        <span
            v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid">Введите имя</span>
      </div>

      <div class="switch">
        <label>
          En
          <input type="checkbox">
          <span class="lever"></span>
          Ru
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
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
    name: ''
  }),
  mounted() {
    this.name = this.info.name

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
        await this.$store.dispatch('updateInfo', {name: this.name})
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
