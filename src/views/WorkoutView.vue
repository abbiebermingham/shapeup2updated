<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useWorkout } from '../stores/workoutStore.js'


const { exercises, completedCount, totalMinutes, progressPercent } = useWorkout()

const searchQuery = ref('')
const selectedCategory = ref('') // Empty string means all categories.
const categories = computed(() =>
    [...new Set(exercises.value.map(item => item.category))].sort()
)
const filteredExercises = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return exercises.value.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(query)
    const matchesCategory = selectedCategory.value === '' ||
        item.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})
function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = ''
}


</script>

<template>
  <section>
    <h1 tabindex="-1">Find an exercise</h1>
    <label for="exercise-search">Search exercise names</label>
    <input id="exercise-search" v-model="searchQuery" type="search">
    <label for="exercise-category">Category</label>
    <select id="exercise-category" v-model="selectedCategory">
      <option value="">All categories</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
    <button type="button" @click="clearFilters">Clear filters</button>
    <p role="status">{{ filteredExercises.length }} of {{ exercises.length }} exercises shown.</p>
    <p v-if="exercises.length === 0">No exercises yet. Add one in Manage workout.</p>
    <ul v-else-if="filteredExercises.length" class="exercise-list">
      <li v-for="exercise in filteredExercises" :key="exercise.id" class="exercise">
        <div>
          <RouterLink :to="{ name: 'exercise-detail', params: { id: exercise.id } }">
            {{ exercise.name }}
          </RouterLink>
          <p>{{ exercise.category }} · {{ exercise.minutes }} minutes</p>
        </div>
      </li>
    </ul>
    <p v-else>No exercises match. Change your search or clear the filters.</p>
  </section>
</template>


