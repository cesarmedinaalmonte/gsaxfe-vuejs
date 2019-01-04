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
                            <el-input placeholder="Nombre del curso" v-model="curso.grado"></el-input>
                        </el-form-item>

                        <el-form-item label="Seccion" prop="seccion">
                            <el-select placeholder="Seccion" style="width:100%;" v-model="curso.seccion.id">
                            <el-option v-for="item in secciones"
                                        :key="item.id"
                                        :label="item.nombre"
                                        :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Nivel" prop="nivel">
                            <el-select placeholder="Nivel" style="width:100%;" v-model="curso.nivel.id">
                            <el-option v-for="item in niveles"
                                        :key="item.id"
                                        :label="item.nombre"
                                        :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>

                    </el-form>

                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>


<script>
import axios from '@/plugins/axios'

const NivelModel = function(data = {}){
    return {
        id: data.id ? data.id : "",
        nombre:  data.nombre ? data.nombre : ""
    };
}

const SeccionModel = function(data = {}){
    return {
        id: data.id ? data.id : "",
        nombre:  data.nombre ? data.nombre : ""
    };
}

const CursoModel = function(data = {}){
    return {
        id: data.id ? data.id : "",
        grado:  data.grado ? data.grado : "",
        seccion:  data.seccion ? data.seccion : SeccionModel(),
        nivel:  data.nivel ? data.nivel : NivelModel()
    };
}

const CursoFormRules = function(){
    return {
        grado: [{ required: true, message: 'El nombre es requerido', trigger: 'change' }],
        seccion: {
            type: "object", required: true,
            fields: {
                id: {type: "number", required: true, message: 'La seccion es requerida', trigger: 'change'}
            }
        },
        nivel: {
            type: "object", required: true,
            fields: {
                id: {type: "number", required: true, message: 'El nivel es requerido', trigger: 'change'}
            }
        }
        
    }
}

export default {
    name: 'CursoFormulario',
    data(){
        return {
            curso: CursoModel({}),
            rules: CursoFormRules(),

            niveles: [],
            secciones: []
        }
    },
    methods: {
        async init(){
            let _this = this;
            _this.cargarNiveles();
            _this.cargarSecciones();
            if (typeof this.$route.params.curso_id !== 'undefined'){
                
                axios.get(`/curso/${this.$route.params.curso_id}/`)
                .then((response) => {
                    _this.curso = response.data;
                    // actualiza el header
                    this.$store.dispatch('updateHeader', {
                        title:  _this.curso.grado,
                        breadcrumb: ['Cursos', _this.curso.grado]
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
            axios.get(`/nivel/`)
            .then((response) => {
                _this.niveles = response.data.results;
            }).catch((error)=> {
                // nada que hacer aqui
            });
        },
        cargarSecciones: function(){
            let _this = this;
            axios.get(`/seccion/`)
            .then((response) => {
                _this.secciones = response.data.results;
            }).catch((error)=> {
                // nada que hacer aqui
            });
        },
        guardar: function(){
            let _this = this;

            // validacion de formulario
            this.$refs.formulario_curso.validate((valid) => {
                if (valid) {
                    delete _this.curso.nivel.nombre;
                    delete _this.curso.seccion.nombre;

                    if (_this.curso.id){ // editar profesor
                        axios.put(`/curso/${this.$route.params.curso_id}/`, _this.curso)
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

                    }else{ // crear profesor
                        axios.post(`/curso/`, _this.curso)
                        .then((response) => {
                            let data = response.data;
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
