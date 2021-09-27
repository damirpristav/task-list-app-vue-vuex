<template>
  <div class="modal is-active">
    <div class="modal-background" @click="handleClose"></div>
    <form class="modal-card" @submit.prevent="handleSubmit">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit List</p>
        <button type="button" class="delete" @click="handleClose"></button>
      </header>
      <div class="modal-card-body">
        <div class="field">
          <label class="label">List Name</label>
          <div class="control">
            <input 
              type="text"
              class="input"
              name="listName"
              placeholder="List Name"
              v-model="listName" 
            />
          </div>
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
  props: ['list'],
  setup({ list }) {
    const store = useStore()
    const listName = ref(list.name)

    // On close
    const handleClose = () => {
      store.commit('setListToEdit', null)
    }

    // On submit - edit list 
    const handleSubmit = () => {
      if(listName.value.trim() === '') {
        return alert('List name is required!')
      }

      store.commit('updateList', { name: listName.value.trim() })
      store.commit('setNotification', { message: `List updated!`, type: 'success' })
    }

    return { listName, handleSubmit, handleClose }
  }
}
</script>

<style>

</style>