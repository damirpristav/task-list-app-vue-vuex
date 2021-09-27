<template>
  <header class="hero has-text-centered is-dark is-bold mb-5">
    <div class="hero-body">
      <div class="container">
        <h1 class="title mb-3">{{ title }}</h1>
        <h2 class="subtitle mt-0">{{ subtitle }}</h2>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: ['title', 'subtitle']
}
</script>

<style>

</style>