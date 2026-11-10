<script setup>

import { RouterLink } from 'vue-router'

import { useWorkout } from '../stores/workoutStore.js'


const { exercises, completedCount, totalMinutes, progressPercent } = useWorkout()

</script>


<template>

  <section class="panel" aria-labelledby="overview-heading">

    <h1 id="overview-heading" tabindex="-1">Your workout</h1>

    <p>{{ completedCount }} of {{ exercises.length }} exercises completed</p>

    <p>{{ totalMinutes }} minutes planned</p>

    <label for="overview-progress">{{ progressPercent }}% complete</label>

    <progress id="overview-progress" :value="progressPercent" max="100">

      {{ progressPercent }}%

    </progress>


    <p v-if="exercises.length === 0" class="empty-state">

      No exercises yet. Open Manage workout to add one.

    </p>

    <ul v-else class="exercise-list">

      <li v-for="exercise in exercises" :key="exercise.id" class="exercise">

        <div>

          <RouterLink :to="{ name: 'exercise-detail', params: { id: exercise.id } }">

            {{ exercise.name }}

          </RouterLink>

          <p>{{ exercise.minutes }} minutes ·

            {{ exercise.completed ? 'Completed' : 'Not completed' }}</p>

        </div>

      </li>

    </ul>

    <p><RouterLink to="/manage">Manage workout</RouterLink></p>

  </section>

</template>