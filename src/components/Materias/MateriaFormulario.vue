<template>
    <el-row style="margin-top: 20px;">
        <el-col :span="24">
            <el-row>
                <el-col :span="24" style="text-align: right;">
                    <el-button type="primary" style="margin-right: 5px;" @click="guardar()">Guardar</el-button>
                    <router-link :to="{name: 'materias'}">
                        <el-button type="danger">Cancelar</el-button>
                    </router-link>
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
                <el-col :span="12">

                    <el-form ref="formulario_materia" :model="materia" :rules="rules" label-width="120px">
<!-- 
                        <el-form-item label="Alcance">
                            <el-switch
                                v-model="isCursoMateria"
                                active-text="Curso Materia">
                            </el-switch>
                        </el-form-item> -->

                        <el-form-item label="Nombre" prop="nombre">
                            <el-input placeholder="Nombre" v-model="materia.nombre"></el-input>
                        </el-form-item>

                        <el-form-item label="Codigo" prop="codigo">
                            <el-input placeholder="Codigo" v-model="materia.codigo"></el-input>
                        </el-form-item>

                    </el-form>

                </el-col>
            </el-row>

        </el-col>
    </el-row>
</template>


<script>
    import axios from '@/plugins/axios'

    const MateriaModel = function(data = {}){
        return {
            id: data.id ? data.id : "",
            nombre:  data.nombre ? data.nombre : "",
            codigo:  data.codigo ? data.codigo : "",
        };
    }

    const CursoMateriaModel = function(data = {}){
        return {
            id: data.id ? data.id : "",
            materia: data.materia ? data.materia : "",
            curso: data.curso ? data.curso : "",
            docente: data.docente ? data.docente : "",
        };
    }

    const MateriaFormRules = function(){
        return {
            nombre: [{ required: true, message: 'El nombre es requerido', trigger: 'change' },],
            codigo: [{ required: true, message: 'El codigo es requerido', trigger: 'change' },],
        }
    }

    export default {
        name: 'MateriaFormulario',
        data() {
            return {

                materia: MateriaModel(),
                rules: MateriaFormRules(),

            }
        },
        methods: {
            async init(){
                let _this = this;

                // mostrar un loading si hay tiempo
                if (typeof this.$route.params.materia_id !== 'undefined'){
                    // carga la materia
                    axios.get(`/materias/${this.$route.params.materia_id}`)
                        .then((response) => {
                            _this.materia = response.data.data;
                            // actualiza el header
                            let nombre =  _this.materia.nombre;
                            this.$store.dispatch('updateHeader', {
                                title: nombre,
                                breadcrumb: ['Materias', nombre]
                            })
                        }).catch((error)=> {
                        if (error.response.status === 404){ // not found
                            _this.$router.push({name: 'not_found'});
                        }
                    });

                }else{
                    _this.limpiar();
                    this.$store.dispatch('updateHeader', {
                        title: 'Crear Materia',
                        breadcrumb: ['Materias', 'Crear']
                    })
                }
            },
            guardar: function(){
                let _this = this;

                // validacion de formulario
                this.$refs.formulario_materia.validate((valid) => {
                    if (valid) {
                        if (_this.materia.id){ // editar profesor
                            axios.put(`/materias/${this.$route.params.materia_id}`, _this.materia)
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
                            axios.post(`/materias/`, _this.materia)
                                .then((response) => {
                                    let data = response.data.data;
                                    this.$notify({
                                        title: 'Bien!',
                                        message: 'Materia creada satisfactoriamente.',
                                        type: 'success'
                                    });
                                    // redireccionar a la ruta de editar
                                    _this.$router.push({name: 'editar_materia', params: {materia_id: data.id }});
                                }).catch((error)=> {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Ocurrio un error creando la materia.',
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
            },
            limpiar: function(){
                let _this = this;
                _this.profesor = MateriaModel({});
            }
        },
        beforeMount: function(){
            this.init();
        }
    }
</script>
