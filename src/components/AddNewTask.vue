<template>
  <section className="section">
    <h2 className="is-size-4 has-text-centered">Add new task to selected field</h2>
    <form @submit.prevent="handleSubmit">
      <div className="field">
        <label className="label">Task Name</label>
        <div className="control">
          <input type="text" className="input" placeholder="Add Task" v-model="taskName" />
        </div>
        <div className="control mt-4">
          <input type="submit" value="Add New Task" className="button is-primary" />
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const taskName = ref('')

    // On submit
    const handleSubmit = () => {
      if(taskName.value.trim() === '') {
        return alert('Task name is required!')
      }

      const newTask = {
        name: taskName.value.trim(),
        id: `task-${new Date().getTime()}`,
        completed: false
      }

      store.commit('addNewTask', newTask)
      store.commit('setNotification', { message: `New task("${newTask.name}") created!`, type: 'success' })
      taskName.value = ''
    }

    return { taskName, handleSubmit }
  }
}
</script>

<style>

</style>