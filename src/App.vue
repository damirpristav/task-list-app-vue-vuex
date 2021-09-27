<template>
  <Header title="Task List App with Vue and Vuex" subtitle="Create some lists and add some tasks to each list" />
  <div className="container px-5">
    <div className="columns">
      <Sidebar />
      <MainContent />
    </div>
  </div>

  <Notification :message="message" v-if="message" />
  <DeleteListModal v-if="listToDeleteId" />
  <DeleteTaskModal v-if="taskToDelete" />
  <EditListModal v-if="listToEdit" :list="listToEdit" />
  <EditTaskModal v-if="taskToEdit" :task="taskToEdit" />
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import MainContent from './components/MainContent.vue'
import Notification from './components/Notification.vue'
import DeleteListModal from './components/DeleteListModal.vue'
import DeleteTaskModal from './components/DeleteTaskModal.vue'
import EditListModal from './components/EditListModal.vue'
import EditTaskModal from './components/EditTaskModal.vue'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    MainContent,
    Notification,
    DeleteListModal,
    DeleteTaskModal,
    EditListModal,
    EditTaskModal,
  },
  setup() {
    const store = useStore()

    // Get notification message
    const message = computed(() => store.getters.getNotificationMessage)

    // Get id of the list to delete
    const listToDeleteId = computed(() => store.getters.getListToDelete)

    // Get task to delete
    const taskToDelete = computed(() => store.getters.getTaskToDelete)

    // Get list to edit
    const listToEdit = computed(() => store.getters.getListToEdit)

    // Get task to edit
    const taskToEdit = computed(() => store.getters.getTaskToEdit)

    return { message, listToDeleteId, taskToDelete, listToEdit, taskToEdit }
  }
}
</script>

<style>
  .section {
    padding: 2rem 0 !important;
  }

  .table tr td:nth-child(2),
  .table tr td:nth-child(3) {
    width: 100px;
  }

  tr.completed {
    opacity: 0.5;
  }

  tr.completed td:first-child {
    text-decoration: line-through;
  }
</style>
