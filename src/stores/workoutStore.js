import { ref, computed, readonly } from 'vue'

import { initialExercises } from '../data/exercises.js'


const exercises = ref(initialExercises.map(item => ({ ...item })))


let nextId = Math.max(0, ...exercises.value.map(item => item.id)) + 1


const completedCount = computed(() =>

    exercises.value.filter(item => item.completed).length

)


const totalMinutes = computed(() =>

    exercises.value.reduce((total, item) => total + item.minutes, 0)

)


const progressPercent = computed(() => {

    if (exercises.value.length === 0) return 0

    return Math.round(completedCount.value / exercises.value.length * 100)

})


function saveExercise(id, rawName, rawMinutes) {

    const name = rawName.trim()

    const minutes = Number(rawMinutes)


    if (!name) return 'Please enter an exercise name.'

    if (name.length > 60) return 'Use no more than 60 characters.'

    if (!Number.isInteger(minutes) || minutes < 1 || minutes > 180) {

        return 'Enter a whole number from 1 to 180 minutes.'

    }


    if (id === null) {

        exercises.value.push({ id: nextId++, name, minutes, completed: false })

    } else {

        const exercise = exercises.value.find(item => item.id === id)

        if (!exercise) return 'This exercise is no longer available.'

        exercise.name = name

        exercise.minutes = minutes

    }

    return ''

}


function removeExercise(id) {

    exercises.value = exercises.value.filter(item => item.id !== id)

}


function toggleExercise(id) {

    const exercise = exercises.value.find(item => item.id === id)

    if (exercise) exercise.completed = !exercise.completed

}


function clearCompleted() {

    exercises.value = exercises.value.filter(item => !item.completed)

}


// This single object is shared by every caller in this browser app.

const workout = {

    exercises: readonly(exercises),

    completedCount,

    totalMinutes,

    progressPercent,

    saveExercise,

    removeExercise,

    toggleExercise,

    clearCompleted

}


export function useWorkout() {

    return workout

}

