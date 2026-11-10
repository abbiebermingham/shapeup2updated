<script setup>
defineProps({
  exercises: { type: Array, required: true },
  editing: { type: Boolean, default: false }
})

const emit = defineEmits(['edit', 'remove', 'toggle'])
</script>

<template>
  <p v-if="exercises.length === 0" class="empty-state">
    No exercises yet. Add one to start your plan.
  </p>
  <ul v-else class="exercise-list">
    <li v-for="exercise in exercises" :key="exercise.id"
        class="exercise" :class="{ completed: exercise.completed }">
      <label class="exercise-details">
        <input type="checkbox" :checked="exercise.completed"
               :disabled="editing"
               @change="emit('toggle', exercise.id)">
        <span>
          <strong>{{ exercise.name }}</strong>
          <small>{{ exercise.minutes }} minutes</small>
        </span>
      </label>
      <button type="button" class="secondary-button"
              :disabled="editing" @click="emit('edit', exercise.id)">
        Edit
      </button>
      <button type="button" class="remove-button"
              :disabled="editing" @click="emit('remove', exercise.id)"
              :aria-label="'Remove ' + exercise.name">
        Remove
      </button>
    </li>
  </ul>
</template>