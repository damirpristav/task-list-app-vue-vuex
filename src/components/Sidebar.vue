<template>
  <div className="column is-3">
    <CreateNewList />
    <Lists />
  </div>
</template>

<script>
import CreateNewList from './CreateNewList.vue'
import Lists from './Lists.vue'

export default {
  components: { CreateNewList, Lists }
}
</script>

<style>

</style>