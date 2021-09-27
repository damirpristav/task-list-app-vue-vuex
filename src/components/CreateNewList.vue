<template>
  <div class="card mb-5">
    <div class="card-header">
      <p class="card-header-title">Create New List</p>
    </div>
    <div class="card-content">
      <form @submit.prevent="handleSubmit">
        <div class="field">
          <label class="label">List Name</label>
          <div class="control">
            <input 
              type="text" 
              class="input"
              placeholder="List Name"
              v-model="listName"
            >
          </div>
        </div>
        <div class="control">
          <button type="submit" class="button is-primary">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const listName = ref('')

    // On submit - create new list
    const handleSubmit = () => {
      if(listName.value.trim() === '') {
        return alert('List name is required!')
      }

      const newList = {
        id: `list-${new Date().getTime()}`,
        name: listName.value.trim(),
        tasks: []
      }

      store.commit('addNewList', newList)
      store.commit('setNotification', { message: `New list("${newList.name}") created!`, type: 'success' })
      listName.value = ''
    }

    return { listName, handleSubmit }
  }
}
</script>

<style>

</style>