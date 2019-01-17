<template>
    <el-row style="margin-top: 20px;">
        <el-col :span="24">
            <el-row>
                <el-col :span="24" style="text-align: right;">
                    <el-button type="primary" style="margin-right: 5px;">Guardar</el-button>
                    <router-link :to="{name: 'materias'}">
                        <el-button type="danger">Cancelar</el-button>
                    </router-link>
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
                <el-col :span="12">

                    <el-form ref="form" label-width="120px">

                        <el-form-item label="Alcance">
                            <el-switch
                                v-model="isCursoMateria"
                                active-text="Curso Materia">
                            </el-switch>
                        </el-form-item>

                        <el-form-item label="Nombre">
                            <el-input placeholder="Nombre" v-model="materia.nombre"></el-input>
                        </el-form-item>

                        <el-form-item label="Codigo">
                            <el-input placeholder="Codigo" v-model="materia.codigo"></el-input>
                        </el-form-item>

                    </el-form>
                    <!-- <hr> -->

                    <el-form ref="form" label-width="120px" style="border-top: 1px solid gray;">

                        <el-form-item label="Curso" style="margin-top: 15px;">
                            <el-select placeholder="Curso" style="width:100%;"
                                v-model="selectedCursoMateria.curos" >
                                <el-option v-for="item in listaCursos"
                                            :key="item.id"
                                            :label="(item.nombre +' '+ item.seccion +' '+ item.nivel)"
                                            :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Profesor(a)">
                            <el-select placeholder="Profesor(a)" style="width:100%;"
                                v-model="selectedCursoMateria.docente">
                                <el-option v-for="item in listaProfesores"
                                            :key="item.id"
                                            :label="(item.nombre +' '+ item.apellido)"
                                            :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item style="text-align: right;">
                            <el-button type="info" plain>Guardar</el-button>
                        </el-form-item>

                    </el-form>

                </el-col>
            </el-row>

            <el-row style="margin-top: 5px; margin-bottom: 15px;">
                <el-col :span="24">

                    <el-table
                        :data="listaCursoMateria"
                        style="width: 100%"
                        border stripe>

                        <el-table-column
                            label="Curso">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.curso.nombre +' '+ scope.row.curso.seccion  +' '+ scope.row.curso.nivel}}</span>
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
                                <el-button size="mini" @click="seleccionarCursoMateria(scope.row)">Seleccionar</el-button>
                                <el-button size="mini" @click="eliminarCursoMateria(scope.row)" type="danger">Eliminar</el-button>
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

                listaCursos: [],
                listaProfesores: [],

                isCursoMateria: false,
                selectedCursoMateria: CursoMateriaModel({}),

                listaCursoMateria: [],

            }
        },
        methods: {
            async init(){
                let _this = this;

                // dependencias
                _this.cargarCursos();
                _this.cargarProfesores();
                // mostrar un loading si hay tiempo
                if (typeof this.$route.params.materia_id !== 'undefined'){
                    // carga la materia
                    axios.get(`/materia/${this.$route.params.materia_id}/`)
                        .then((response) => {
                            _this.materia = response.data;
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

                    // cargar los cursos materias filtrado por la materia seleccionada
                    _this.cargarListaCursoMateria();

                }else{
                    _this.limpiar();
                    this.$store.dispatch('updateHeader', {
                        title: 'Crear Materia',
                        breadcrumb: ['Materias', 'Crear']
                    })
                }
            },
            cargarProfesores: function(){
                let _this = this;
                axios.get(`/docente/`)
                    .then((response) => {
                        _this.listaProfesores = response.data.results;
                    }).catch((error)=> {
                    // nothing to do here
                });
            },
            cargarCursos: function(){
                let _this = this;
                axios.get(`/curso/`)
                    .then((response) => {
                        _this.listaCursos = response.data.results;
                    }).catch((error)=> {
                    // nothing to do here
                });
            },
            cargarListaCursoMateria: function(){
                let _this = this;
                let materia_id = this.$route.params.materia_id;

                axios.get(`/cursomateria/`)
                    .then((response) => {
                        _this.listaCursoMateria = response.data.results;
                    }).catch((error)=> {
                    // nothing to do here
                });
            },
            // seleccion desde la lista para editar
            seleccionarCursoMateria: function(cm){
                let _this = this;
                let seleccionado = CursoMateriaModel(cm);
                _this.selectedCursoMateria = seleccionado;
            },
            // eliminar elemento de la lista
            eliminarCursoMateria: function(cm){
                let _this = this;
            },
            guardar: function(){
                let _this = this;

                // validacion de formulario
                this.$refs.formulario_materia.validate((valid) => {
                    if (valid) {
                        if (_this.materia.id){ // editar profesor
                            axios.put(`/materia/${this.$route.params.materia_id}/`, _this.materia)
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
                            axios.post(`/materia/`, _this.materia)
                                .then((response) => {
                                    let data = response.data;
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
