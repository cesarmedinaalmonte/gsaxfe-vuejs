import Vue from 'vue'
import Router from 'vue-router'
// 
import Login from './views/Login.vue'
import Main from './views/Main.vue'

// modulos
import CursoLista from '@/components/Cursos/CursoLista'
import CursoFormulario from '@/components/Cursos/CursoFormulario'

import ProfesorLista from '@/components/Profesores/ProfesorLista'
import ProfesorFormulario from '@/components/Profesores/ProfesorFormulario'

import MateriaLista from '@/components/Materias/MateriaLista'
import MateriaFormulario from '@/components/Materias/MateriaFormulario'

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
        path: '/',
        name: 'inicio',
        component: Main,
        children: [
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
            }
        ]
    },
    
  ]
})
