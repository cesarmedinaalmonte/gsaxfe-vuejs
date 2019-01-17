import Vue from 'vue'
import Router from 'vue-router'
//
import Login from './views/Login.vue'
import Main from './views/Main.vue'

// modulos
import Dashboard from '@/components/Dashboard/Dashboard'

import CursoLista from '@/components/Cursos/CursoLista'
import CursoFormulario from '@/components/Cursos/CursoFormulario'

import ProfesorLista from '@/components/Profesores/ProfesorLista'
import ProfesorFormulario from '@/components/Profesores/ProfesorFormulario'

import MateriaLista from '@/components/Materias/MateriaLista'
import MateriaFormulario from '@/components/Materias/MateriaFormulario'

import EstudianteLista from '@/components/Estudiantes/EstudianteLista'
import EstudianteFormulario from '@/components/Estudiantes/EstudianteFormulario'

import Error404 from '@/components/Errores/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
        path: '*',
        name: 'not_found',
        component: Error404
      },
    {
        path: '/',
        component: Main,
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: Dashboard
            },
            {
                path: '/cursos',
                name: 'cursos',
                component: CursoLista
            },
            {
                path: '/cursos/crear',
                name: 'crear_curso',
                component: CursoFormulario
            },
            {
                path: '/cursos/:curso_id',
                name: 'editar_curso',
                component: CursoFormulario
            },
            {
                path: '/profesores',
                name: 'profesores',
                component: ProfesorLista
            },
            {
                path: '/profesores/crear',
                name: 'crear_profesor',
                component: ProfesorFormulario
            },
            {
                path: '/profesores/:profesor_id',
                name: 'editar_profesor',
                component: ProfesorFormulario
            },
            {
                path: '/materias',
                name: 'materias',
                component: MateriaLista
            },
            {
                path: '/materias/crear',
                name: 'crear_materia',
                component: MateriaFormulario
            },
            {
                path: '/materias/:materia_id',
                name: 'editar_materia',
                component: MateriaFormulario
            },
            {
                path: '/profesores/crear',
                name: 'crear_estudiante',
                component: EstudianteFormulario
            },
            {
                path: '/estudiantes',
                name: 'estudiantes',
                component: EstudianteLista
            },
            {
                path: '/estudiantes/:estudiante_id',
                name: 'editar_estudiante',
                component: EstudianteFormulario
            }

            ]
    },

  ]
})
