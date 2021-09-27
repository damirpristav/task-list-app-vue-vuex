import { createStore } from 'vuex'
import { getListsFromLS, saveListsToLS } from '../utils'

export default createStore({
  state: {
    lists: getListsFromLS(),
    listToDelete: null,
    listToEdit: null,
    selectedList: null,
    taskToDelete: null,
    taskToEdit: null,
    notificationMessage: '',
    notificationType: 'success',
  },
  getters: {
    getLists: (state) => state.lists,
    getListToEdit: (state) => state.listToEdit,
    getListToDelete: (state) => state.listToDelete,
    getSelectedList: (state) => state.selectedList,
    getTaskToDelete: (state) => state.taskToDelete,
    getTaskToEdit: (state) => state.taskToEdit,
    getNotificationMessage: (state) => state.notificationMessage,
    getNotificationType: (state) => state.notificationType,
  },
  mutations: {
    /* Lists */
    setSelectedList: (state, data) => {
      state.selectedList = state.lists.find(l => l.id === data)
    },
    setListToEdit: (state, data) => state.listToEdit = data,
    setListToDelete: (state, data) => state.listToDelete = data,
    addNewList: (state, data) => {
      const lists = [...state.lists]
      lists.push(data)
      saveListsToLS(lists)
      state.lists = lists
    },
    deleteList: (state) => {
      const newLists = state.lists.filter(l => l.id !== state.listToDelete)
      state.lists = newLists
      if(state.listToDelete === state.selectedList.id) {
        state.selectedList = null
      }
      state.listToDelete = null 
      saveListsToLS(newLists)
    },
    updateList: (state, data) => {
      const list = {...state.listToEdit, ...data}
      const newLists = state.lists.map(l => l.id === list.id ? list : l)
      state.lists = newLists
      saveListsToLS(newLists)
      state.listToEdit = null
    },

    /* Tasks */
    setTaskToEdit: (state, data) => state.taskToEdit = data,
    setTaskToDelete: (state, data) => state.taskToDelete = data,
    addNewTask: (state, data) => {
      const lists = JSON.parse(JSON.stringify(state.lists))
      const list = lists.find(l => l.id === state.selectedList.id)
      if(list) {
        list.tasks.push(data)
      }
      const newLists = state.lists.map(l => l.id === state.selectedList.id ? list : l)
      saveListsToLS(newLists)
      state.lists = newLists
      state.selectedList = list
    },
    deleteTask: (state) => {
      const lists = JSON.parse(JSON.stringify(state.lists))
      const list = lists.find(l => l.id === state.selectedList.id)
      const tasks = list.tasks.filter(t => t.id !== state.taskToDelete.id)
      const newList = { ...list, tasks }
      const newLists = state.lists.map(l => l.id === state.selectedList.id ? newList : l)
      state.lists = newLists
      state.selectedList = newList
      state.taskToDelete = null
      saveListsToLS(newLists)
    },
    updateTask: (state, data) => {
      const lists = JSON.parse(JSON.stringify(state.lists))
      const list = lists.find(l => l.id === state.selectedList.id)
      const task = { ...state.taskToEdit, ...data }
      const newTasks = list.tasks.map(t => t.id === state.taskToEdit.id ? task : t)
      const newList = { ...list, tasks: newTasks }
      const newLists = state.lists.map(l => l.id === list.id ? newList : l)
      state.lists = newLists
      state.selectedList = newList 
      state.taskToEdit = null 
      saveListsToLS(newLists)
    },

    /* Notification */
    setNotification: (state, data) => {
      state.notificationMessage = data.message 
      state.notificationType = data.type || 'success'
    },
  },
  actions: {
  },
  modules: {
  }
})
