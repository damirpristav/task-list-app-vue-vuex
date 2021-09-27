// Helper functions
const getListsFromLS = () => {
  if(localStorage.getItem('task_list')) {
    return JSON.parse(localStorage.getItem('task_list'))
  }

  return []
}

const saveListsToLS = (lists) => {
  localStorage.setItem('task_list', JSON.stringify(lists))
}

export {
  getListsFromLS,
  saveListsToLS,
}