<template>
  <div class="modal is-active">
    <div class="modal-background" @click="handleClose"></div>
    <form class="modal-card" @submit.prevent="handleSubmit">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Task</p>
        <button type="button" class="delete" @click="handleClose"></button>
      </header>
      <div class="modal-card-body">
        <div class="field">
          <label class="label">Task Name</label>
          <div class="control">
            <input type="text" class="input" placeholder="Task Name" v-model="taskName">
          </div>
        </div>
        <div class="field">
          <label class="label">Complete task</label>
          <label class="checkbox">
            <input type="checkbox" v-model="taskState">
            Complete 
          </label>
        </div>
      </div>
      <footer class="modal-card-foot">
        <button type="submit" class="button is-success">Save changes</button>
        <button type="button" class="button" @click="handleClose">Cancel</button>
      </footer>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex' 

export default {
  props: ['task'],
  setup({ task }) {
    const store = useStore()
    const taskName = ref(task.name)
    const taskState = ref(task.completed)

    // On close
    const handleClose = () => {
      store.commit('setTaskToEdit', null)
    }

    // On submit - update task
    const handleSubmit = () => {
      if(taskName.value.trim() === '') {
        return alert('Task name is required!')
      }

      store.commit('updateTask', { name: taskName.value.trim(), completed: taskState.value })
      store.commit('setNotification', { message: `Task updated!`, type: 'success' })
    }

    return { taskName, taskState, handleClose, handleSubmit }
  }
}
</script>

<style>

</style>