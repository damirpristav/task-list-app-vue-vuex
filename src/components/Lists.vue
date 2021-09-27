<template>
  <div class="panel is-primary">
    <p class="panel-heading">Your lists</p>
    <p class="py-4 has-text-centered" v-if="lists.length === 0">No Lists</p>
    <div v-else>
      <div class="panel-block py-3" v-for="list in lists" :key="list.id">
        <p @click="handleSetListToEdit(list)">{{ list.name }}</p>
        <span class="panel-icon has-text-danger" @click="handleSetListToDelete(list.id)">
          <i class="fas fa-times-circle"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    // Get lists
    const lists = computed(() => store.getters.getLists)

    // Set list to edit
    const handleSetListToEdit = (id) => {
      store.commit('setListToEdit', id)
    }

    // Set list to delete
    const handleSetListToDelete = (id) => {
      store.commit('setListToDelete', id)
    }

    return { lists, handleSetListToEdit, handleSetListToDelete }
  }
}
</script>

<style scoped>
  .panel-block {
    justify-content: space-between;
  }

  .panel-block p {
    cursor: pointer;
  }

  .panel-icon {
    margin-right: 0;
    cursor: pointer;
  }
</style>