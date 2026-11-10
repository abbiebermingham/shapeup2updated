<script setup>

import { RouterLink } from 'vue-router'

</script>


<template>

  <nav class="site-nav" aria-label="Main navigation">

    <RouterLink to="/" active-class="nav-active" exact-active-class="nav-current">

      Workout overview

    </RouterLink>

    <RouterLink to="/manage" active-class="nav-active"

                exact-active-class="nav-current">Manage workout</RouterLink>

  </nav>

</template>