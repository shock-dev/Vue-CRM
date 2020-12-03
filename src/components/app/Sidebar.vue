<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
import localize from "@/filters/localize.filter";

export default {
  name: "Sidebar",
  props: ['isOpen'],
  data() {
    return {
      links: [
        {title: localize('Menu__Bill'), url: '/', exact: true},
        {title: localize('Menu__History'), url: '/history'},
        {title: localize('Menu__Planning'), url: '/planning'},
        {title: localize('Menu__NewRecord'), url: '/record'},
        {title: localize('Menu__Categories'), url: '/categories'}
      ]
    }
  }
}
</script>

<style scoped>

</style>
