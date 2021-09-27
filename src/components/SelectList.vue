<template>
  <section>
    <h2 class="is-size-4 has-text-centered mb-4">Choose a list</h2>
    <div class="field mb-5">
      <div class="control has-icons-left">
        <div class="select is-fullwidth">
          <select class="fullwidth" v-model="selected" @change="handleChange">
            <option value="">Select List</option>
            <option v-for="list in lists" :key="list.id" :value="list.id">{{ list.name }}</option>
          </select>
        </div>
        <div class="icon is-small is-left">
          <i class="fas fa-list"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const selected = ref('')

    // Get lists
    const lists = computed(() => store.getters.getLists)

    // Get selected list
    const selectedList = computed(() => store.getters.getSelectedList)

    // On select change
    const handleChange = () => {
      store.commit('setSelectedList', selected.value)
    }

    // Watch for selectedList and update selected variable if selectedList is deleted
    watch(selectedList, () => {
      if(!selectedList.value) {
        selected.value = ''
      }
    })

    return { selected, lists, handleChange }
  }
}
</script>

<style>

</style>