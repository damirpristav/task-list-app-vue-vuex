<template>
  <div class="modal is-active">
    <div class="modal-background" @click="handleClose"></div>
    <div class="modal-card">
      <header class="modal-card-head has-text-centered">
        <p class="modal-card-title">Are you sure you want to delete this list("{{ list.name }}") ?</p>
      </header>
      <div class="modal-card-body">
        <h2 class="is-size-5 has-text-centered">All tasks related to this list will be deleted</h2>
        <div class="content" v-if="list">
          <p class="has-text-centered pt-4 mb-0" v-if="list.tasks.length === 0">No tasks in this list!</p>
          <ul v-else>
            <li v-for="task in list.tasks" :key="task.id">{{ task.name }}</li>
          </ul>
        </div>
      </div>
      <footer class="modal-card-foot">
        <button type="button" class="button is-danger" @click="handleDelete">Delete</button>
        <button type="button" class="button" @click="handleClose">Cancel</button>
      </footer>
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

    // Get list id to delete
    const listId = computed(() => store.getters.getListToDelete)

    // Find list by id
    const list = computed(() => lists.value.find(l => l.id === listId.value))

    // On close
    const handleClose = () => {
      store.commit('setListToDelete', null)
    }

    // On delete
    const handleDelete = () => {
      store.commit('deleteList')
      store.commit('setNotification', { message: `List deleted!`, type: 'danger' })
    }

    return { list, handleClose, handleDelete }
  }
}
</script>

<style>

</style>