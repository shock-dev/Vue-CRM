<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div class="row">
      <home-bill/>

      <home-currently/>
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCurrently from "@/components/HomeCurrently";
export default {
  name: "Home",
  components: {HomeCurrently, HomeBill}
}
</script>

<style scoped>

</style>
