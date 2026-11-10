<script setup>

import { nextTick, watch } from 'vue'

import { RouterView, useRoute } from 'vue-router'

import SiteNav from './components/SiteNav.vue'


const route = useRoute()


// After client-side navigation, move keyboard focus to the new page heading.

watch(() => route.fullPath, async () => {

  await nextTick()
  document.querySelector('#main-content h1')?.focus()

})

</script>


<template>

  <a class="skip-link" href="#main-content">Skip to main content</a>

  <div class="dashboard">

    <header class="hero">

      <p class="eyebrow">YOUR DAILY WORKOUT PLANNER</p>

      <p class="site-title">Shape Up</p>

      <p>Small steps. Stronger habits.</p>

    </header>

    <SiteNav />

    <main id="main-content" tabindex="-1">

      <RouterView />

    </main>

  </div>

</template>



