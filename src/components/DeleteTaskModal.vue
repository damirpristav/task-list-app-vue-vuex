<template>
  <div class="modal is-active">
    <div class="modal-background" @click="handleClose"></div>
    <div class="modal-card">
      <header class="modal-card-head has-text-centered">
        <p class="modal-card-title">Are you sure you want to delete this task ?</p>
      </header>
      <footer class="modal-card-foot">
        <button type="submit" class="button is-danger" @click="handleDelete">Delete</button>
        <button type="button" class="button" @click="handleClose">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    // On modal close
    const handleClose = () => {
      store.commit('setTaskToDelete', null)
    }

    // On task delete
    const handleDelete = () => {
      store.commit('deleteTask')
      store.commit('setNotification', { message: `Task deleted!`, type: 'danger' })
    }

    return { handleClose, handleDelete }
  }
}
</script>

<style>

</style>