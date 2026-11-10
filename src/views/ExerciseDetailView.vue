<script setup>

import { computed } from 'vue'

import { RouterLink, useRoute } from 'vue-router'

import { useWorkout } from '../stores/workoutStore.js'


const route = useRoute()

const { exercises } = useWorkout()


const exercise = computed(() => {

  const id = Number(route.params.id)

  if (!Number.isInteger(id) || id < 1) return undefined

  return exercises.value.find(item => item.id === id)

})

</script>


<template>

  <section class="panel">

    <template v-if="exercise">

      <h1 tabindex="-1">{{ exercise.name }}</h1>

      <dl>

        <dt>Exercise ID</dt><dd>{{ exercise.id }}</dd>

        <dt>Duration</dt><dd>{{ exercise.minutes }} minutes</dd>

        <dt>Status</dt>

        <dd>{{ exercise.completed ? 'Completed' : 'Not completed' }}</dd>

      </dl>

      <p><RouterLink to="/manage">Manage workout</RouterLink></p>

    </template>

    <template v-else>

      <h1 tabindex="-1">Exercise not found</h1>

      <p>This exercise is not available in the current workout.</p>

    </template>

    <RouterLink to="/">Back to workout</RouterLink>

  </section>

</template>