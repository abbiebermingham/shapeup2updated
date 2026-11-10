<script setup>

import { RouterLink } from 'vue-router'

</script>


<template>

  <section class="panel">

    <h1 tabindex="-1">Page not found</h1>

    <p>Choose a page from the navigation or return to your workout.</p>

    <RouterLink to="/">Back to workout</RouterLink>

  </section>

</template>