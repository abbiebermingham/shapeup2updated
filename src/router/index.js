import { createRouter, createWebHashHistory } from 'vue-router'

import WorkoutView from '../views/WorkoutView.vue'

import ExerciseDetailView from '../views/ExerciseDetailView.vue'

import ManageWorkoutView from '../views/ManageWorkoutView.vue'

import NotFoundView from '../views/NotFoundView.vue'


const router = createRouter({

    history: createWebHashHistory(),

    routes: [

        { path: '/', name: 'workout', component: WorkoutView },

        { path: '/exercises/:id', name: 'exercise-detail', component: ExerciseDetailView },

        { path: '/manage', name: 'manage', component: ManageWorkoutView },

        { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }

    ],

    scrollBehavior() {

        return { top: 0 }

    }

})


export default router