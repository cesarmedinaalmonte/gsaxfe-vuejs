<template>
    <el-row style="margin-top: 20px;">
        <el-col :span="24">
            <el-row>
                <el-col :span="24" style="text-align: right;">
                    <el-button type="primary" size="small" style="margin-right: 5px;" @click="guardar()">Guardar</el-button>
                    <router-link :to="{name: 'cursos'}">
                        <el-button type="danger"  size="small">Cancelar</el-button>
                    </router-link>
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
                <el-col :span="12">

                    <el-form label-width="120px" :model="curso" :rules="rules" ref="formulario_curso">

                        <el-form-item label="Nombre" prop="grado">
                            <el-input placeholder="Nombre del curso" v-model="curso.nombre"></el-input>
                        </el-form-item>

                        <el-form-item label="Seccion" prop="seccion">
                            <el-select placeholder="Seccion" style="width:100%;" v-model="curso.seccion">
                                <el-option v-for="seccion in secciones" :key="seccion.id" 
                                    :label="seccion.nombre"
                                    :value="seccion.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Nivel" prop="nivel">
                            <el-select placeholder="Nivel" style="width:100%;"  v-model="curso.nivel">
                                <el-option v-for="nivel in niveles" :key="nivel.id" 
                                    :label="nivel.nombre"
                                    :value="nivel.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                    </el-form>

                    <el-form ref="form_curso_materia" :rules="cursoMateriaRules" :model="cursoMateria" v-if="curso.id"
                            label-width="120px" 
                            style="border-top: 1px solid gray;">

                        <el-form-item label="Profesor(a)" style="margin-top: 15px;" prop="docente">
                            <el-select placeholder="Profesor(a)" style="width:100%;"
                                v-model="cursoMateria.docente">
                                <el-option v-for="item in listaProfesores"
                                            :key="item.id"
                                            :label="(item.nombre +' '+ item.apellido)"
                                            :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Materia" prop="materia">
                            <el-select placeholder="Materia" style="width:100%;"
                                v-model="cursoMateria.materia">
                                <el-option v-for="item in listaMaterias"
                                            :key="item.id"
                                            :label="item.nombre"
                                            :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item style="text-align: right;">
                            <el-button type="success" size="small" plain  @click="guardarCursoMateria()">Guardar</el-button>
                        </el-form-item>

                    </el-form>

                </el-col>
            </el-row>

            <el-row style="margin-top: 5px; margin-bottom: 15px;" v-if="curso.id">
                <el-col :span="24">

                    <el-table
                        :data="listaCursoMateria"
                        style="width: 100%"
                        border stripe>

                        <el-table-column
                            label="Curso">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.materia.nombre}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Profesor">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.docente.nombre +' '+ scope.row.docente.apellido }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Operationes">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="eliminarCursoMateria(scope.row.id)" type="danger">Eliminar</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </el-col>
            </el-row>

        </el-col>
    </el-row>
</template>


<script>
import axios from '@/plugins/axios'


const CursoModel = function(data = {}){
    return {
        id: data.id ? data.id : "",
        nombre:  data.nombre ? data.nombre : "",
        seccion:  data.seccion ? data.seccion :"",
        nivel:  data.nivel ? data.nivel: ""
    };
}

const CursoFormRules = function() {
    return {
        nombre: [{required: true, message: 'El nombre es requerido', trigger: 'change'}],
        seccion: [{required: true, message: 'La seccion es requerida', trigger: 'change'}],
        nivel: [{required: true, message: 'El nivel es requerido', trigger: 'change'}]
    }
};

const CursoMateriaFormRules = function() {
    return {
        docente: [{required: true, message: 'El profesor es requerido', trigger: 'change'}],
        materia: [{required: true, message: 'La materia es requerida', trigger: 'change'}]
    }
};

export default {
    name: 'CursoFormulario',
    data(){
        return {
            curso: CursoModel({}),
            rules: CursoFormRules(),

            niveles: [],
            secciones: [],

            listaMaterias: [],
            listaProfesores: [],

            cursoMateriaRules: CursoMateriaFormRules(),

            cursoMateria: {
                docente: "",
                materia: "",
            },

            listaCursoMateria: []
           
        }
    },
    methods: {
        async init(){
            let _this = this;
            _this.cargarNiveles();
            _this.cargarSecciones();
            if (typeof this.$route.params.curso_id !== 'undefined'){

                axios.get(`/cursos/${this.$route.params.curso_id}`)
                .then((response) => {
                    _this.curso = response.data;

                    _this.listaCursoMateria = response.data.materias;

                    // dependencias
                    _this.cargarMaterias();
                    _this.cargarProfesores();

                    // actualiza el header
                    this.$store.dispatch('updateHeader', {
                        title:  _this.curso.nombre,
                        breadcrumb: ['Cursos', _this.curso.nombre]
                    })
                }).catch((error)=> {
                   if (error.response.status === 404){ // not found
                       _this.$router.push({name: 'not_found'});
                   }
                });

            }else{
                // _this.limpiar();
                this.$store.dispatch('updateHeader', {
                    title: 'Crear Curso',
                    breadcrumb: ['Cursos', 'Crear']
                })
            }
        },
        cargarNiveles: function(){
            let _this = this;
            axios.get(`/cursos/niveles`)
            .then((response) => {
                _this.niveles = response.data;
            }).catch((error)=> {
                // nada que hacer aqui
            });
        },
        cargarSecciones: function(){
            let _this = this;
            axios.get(`/cursos/secciones`)
            .then((response) => {
                _this.secciones = response.data;
            }).catch((error)=> {
                // nada que hacer aqui
            });
        },
        cargarProfesores: function(){
            let _this = this;
            axios.get(`/docentes/`)
                .then((response) => {
                    _this.listaProfesores = response.data.data;
                }).catch((error)=> {
                // nothing to do here
            });
        },
        cargarMaterias: function(){
            let _this = this;
            axios.get(`/materias/`)
                .then((response) => {
                    _this.listaMaterias = response.data.data;
                }).catch((error)=> {
                // nothing to do here
            });
        },
        guardarCursoMateria: function(){
            let _this = this;
            let id = _this.curso.id;
            // validacion de formulario
            this.$refs.form_curso_materia.validate((valid) => {
                if (valid) {
                    let payload = {
                        docente: {id: _this.cursoMateria.docente},
                        materia: { id: _this.cursoMateria.materia}
                    }
                    axios.post(`/cursos/${id}/curso-materia`, payload )
                        .then((response) => {
                            
                            _this.refreshCursoMateria();

                            this.$notify({
                                title: 'Bien!',
                                message: 'Registro agregado satisfactoriamente.',
                                type: 'success'
                            });
                        }).catch((error)=> {
                            if (error.response){
                                let message = "Ocurrio un error registrando la informacion.";
                                if (error.response.data){
                                    message = error.response.data.message;
                                }
                               
                               this.$notify.error({
                                    title: 'Error',
                                    message: message,
                                });

                            }else{
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Ocurrio un error registrando la informacion.',
                                });
                            }
                        });

                }
            });
            
        },
        // eliminar elemento de la lista
        eliminarCursoMateria: function(cmId){
            let _this = this;
            let cursoId = _this.curso.id;
            axios.delete(`/cursos/${cursoId}/curso-materia/${cmId}` )
            .then((response) => {
                
                _this.refreshCursoMateria();

                this.$notify({
                    title: 'Bien!',
                    message: 'Registro elminando satisfactoriamente.',
                    type: 'success'
                });
            }).catch((error)=> {
                if (error.response){
                    let message = "Ocurrio un error elminando la informacion.";
                    if (error.response.data){
                        message = error.response.data.message;
                    }
                    
                    this.$notify.error({
                        title: 'Error',
                        message: message,
                    });

                }else{
                    this.$notify.error({
                        title: 'Error',
                        message: 'Ocurrio un error eliminando la informacion.',
                    });
                }
            });
        },

        refreshCursoMateria: function(){
            let _this = this;
            axios.get(`/cursos/${_this.curso.id}`)
                .then((response) => {
                   let data = response.data;
                    _this.listaCursoMateria = response.data.materias;
                }).catch((error)=> {
                   // do nothing 
                });
        },
        guardar: function(){
            let _this = this;

            // validacion de formulario
            this.$refs.formulario_curso.validate((valid) => {
                if (valid) {

                    if (_this.curso.id){ // editar profesor
                        axios.put(`/cursos/${this.$route.params.curso_id}`, _this.curso)
                        .then((response) => {
                            this.$notify({
                                title: 'Bien!',
                                message: 'Cambios registrados correctamente.',
                                type: 'success'
                            });
                        }).catch((error)=> {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Ocurrio un error registrando los cambios.',
                            });
                        });

                    }else{ // crear curso
                        axios.post(`/cursos/`, _this.curso)
                        .then((response) => {
                            let data = response.data.data;
                            
                            this.$notify({
                                title: 'Bien!',
                                message: 'Curso creado satisfactoriamente.',
                                type: 'success'
                            });
                            // redireccionar a la ruta de editar
                            _this.$router.push({name: 'editar_curso', params: {curso_id: data.id }});
                        }).catch((error)=> {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Ocurrio un error creando el curso.',
                            });
                        });
                    }
                }else{
                    this.$notify({
                        title: 'Alerta',
                        message: 'Error en formulario.',
                        type: 'warning'
                    });
                }

            });
        }
    },
    beforeMount: function(){
        this.init();
    }
}
</script>
