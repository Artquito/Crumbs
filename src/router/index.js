import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import TeacherManager from '../views/teacher.vue'
import CurriculumBox from '../views/Curriculums.vue'
import Class_Manager from '../views/Classes.vue'
import Student_Manager from '../views/Students.vue'
import Test from '../views/Test.vue'
import Lesson_Manager from '../views/Lessons.vue' 
import Lesson_Box from '../views/Lesson_Box.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/teacher',
    name: 'TeacherManager',
    component: TeacherManager
  },
  {
    path: '/curriculums',
    name: 'Curriculum_Box',
    component: CurriculumBox
  },
  {
    path: '/classes',
    name: 'Class_Manager',
    component: Class_Manager
  },
  {
    path: '/students',
    name: 'Student_Manager',
    component: Student_Manager
  },
  {
    path:'/test',
    name:'testingchamber',
    component:Test
  },
  {
    path:'/lessons/:Id/:Curriculum_Name/:Curriculum_Year',
    name:'Lesson_Manager',
    component:Lesson_Manager
  },
  {
    path:"/lessons",
    name:"Lesson_Box",
    component:Lesson_Box,
  },

]

const router = new VueRouter({
  routes
})

export default router
