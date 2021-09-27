<template>
  <div class="notification" :class="{ 'is-danger': type === 'danger', 'is-primary': type === 'success' }">
    <button class="delete" @click="handleClose"></button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  props: ['message'],
  setup() {
    const store = useStore()
    let timeout = null

    // On mount
    onMounted(() => {
      if(timeout) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(() => store.commit('setNotification', { message: '' }), 3000)
    })

    // On close
    const handleClose = () => {
      store.commit('setNotification', { message: '' })
      clearTimeout(timeout)
    }

    // Get notification type
    const type = computed(() => store.getters.getNotificationType)

    return { handleClose, type }
  }
}
</script>

<style scoped>
  .notification {
    position: fixed;
    top: 20px;
    left: 20px;
    max-width: 300px;
  }
</style>