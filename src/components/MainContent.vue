<template>
  <div className="column is-9">
    <div className="box">
      <SelectList />
      <div v-if="selectedList">
        <AddNewTask />
        <Tasks :tasks="selectedList.tasks" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import SelectList from './SelectList.vue'
import AddNewTask from './AddNewTask.vue'
import Tasks from './Tasks.vue'

export default {
  components: { SelectList, AddNewTask, Tasks },
  setup() {
    const store = useStore()

    // Get selected list
    const selectedList = computed(() => store.getters.getSelectedList)

    return { selectedList }
  }
}
</script>

<style>

</style>