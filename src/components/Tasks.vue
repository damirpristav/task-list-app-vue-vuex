<template>
  <section className="section">
    <h2 className="is-size-4 has-text-centered">List of tasks in selected list</h2>
    <p className="py-4 has-text-centered" v-if="tasks.length === 0">No Tasks</p>
    <table className="table is-striped is-fullwidth" v-else>
      <thead>
        <tr>
          <th>Task</th>
          <th className="has-text-centered">Edit</th>
          <th className="has-text-centered">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
          <td>{{ task.name }}</td>
          <td className="has-text-centered">
            <button className="button is-primary is-small" @click="handleSetTaskToEdit(task)">
              <span className="icon">
                <i className="fas fa-edit"></i>
              </span>
            </button>
          </td>
          <td className="has-text-centered">
            <button className="button is-danger is-small" @click="handleSetTaskToDelete(task)">
              <span className="icon">
                <i className="fas fa-times"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { useStore } from 'vuex'

export default {
  props: ['tasks'],
  setup() {
    const store = useStore()

    // Set task to edit
    const handleSetTaskToEdit = (task) => {
      store.commit('setTaskToEdit', task)
    }

    // Set task to delete
    const handleSetTaskToDelete = (task) => {
      store.commit('setTaskToDelete', task)
    }

    return { handleSetTaskToEdit, handleSetTaskToDelete }
  }
}
</script>

<style>

</style>