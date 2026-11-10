<script setup>

import { ref } from 'vue'

import ExerciseList from '../components/ExerciseList.vue'

import { useWorkout } from '../stores/workoutStore.js'


const {

  exercises, completedCount, totalMinutes,

  saveExercise, removeExercise, toggleExercise, clearCompleted

} = useWorkout()


const editingId = ref(null)

const newExercise = ref('')

const newMinutes = ref(15)

const errorMessage = ref('')

const statusMessage = ref('')


function startEditing(id) {

  const exercise = exercises.value.find(item => item.id === id)

  if (!exercise) return

  editingId.value = id

  newExercise.value = exercise.name

  newMinutes.value = exercise.minutes

  errorMessage.value = ''

  statusMessage.value = ''

}


function resetForm() {

  editingId.value = null

  newExercise.value = ''

  newMinutes.value = 15

  errorMessage.value = ''

}


function submitExercise() {

  const wasEditing = editingId.value !== null

  const error = saveExercise(editingId.value, newExercise.value, newMinutes.value)

  if (error) {

    errorMessage.value = error

    statusMessage.value = ''

    return

  }

  resetForm()

  statusMessage.value = wasEditing ? 'Changes saved.' : 'Exercise added.'

}


function cancelEditing() {

  resetForm()

  statusMessage.value = 'Edit cancelled. Saved exercise unchanged.'

}

</script>


<template>

  <section aria-labelledby="manage-heading">

    <h1 id="manage-heading" tabindex="-1">Manage workout</h1>

    <p>{{ totalMinutes }} minutes planned</p>

    <p role="status">{{ statusMessage }}</p>

    <div class="dashboard-grid">

      <section class="panel">

        <h2>{{ editingId === null ? 'Plan an exercise' : 'Edit exercise' }}</h2>

        <form @submit.prevent="submitExercise">

          <label for="exercise-name">Exercise name</label>

          <input id="exercise-name" v-model="newExercise" type="text"

                 maxlength="60" required>

          <label for="exercise-minutes">Duration in minutes</label>

          <input id="exercise-minutes" v-model.number="newMinutes"

                 type="number" min="1" max="180" step="1" required>

          <button type="submit" class="primary-button">

            {{ editingId === null ? 'Add exercise' : 'Save changes' }}

          </button>

          <button v-if="editingId !== null" type="button"

                  class="secondary-button" @click="cancelEditing">Cancel</button>

          <p v-if="errorMessage" role="alert" class="error-message">

            {{ errorMessage }}

          </p>

        </form>

      </section>

      <section class="panel">

        <h2>Your exercises</h2>

        <ExerciseList :exercises="exercises" :editing="editingId !== null"

                      @edit="startEditing" @remove="removeExercise" @toggle="toggleExercise" />

        <button type="button" class="secondary-button" @click="clearCompleted"

                :disabled="completedCount === 0 || editingId !== null">

          Clear completed

        </button>

      </section>

    </div>

  </section>

</template>