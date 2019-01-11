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

                        <el-form-item label="Nombre">
                            <el-input placeholder="Nombre" v-model="materia.nombre"></el-input>
                        </el-form-item>

                        <el-form-item label="Codigo">
                            <el-input placeholder="Codigo" v-model="materia.codigo"></el-input>
                        </el-form-item>

                        <!-- <el-card shadow="hover"> -->

                            <el-form-item label="Curso">
                                <el-select placeholder="Curso" style="width:100%;" >
                                    <el-option v-for="item in cursos"
                                               :key="item.id"
                                               :label="item.nombre"
                                               :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="Profesor(a)">
                                <el-select placeholder="Profesor(a)" style="width:100%;">
                                    <el-option label="Mikel Aparicio" value="1"></el-option>
                                    <el-option label="Luis Polonia" value="2"></el-option>
                                    <el-option label="Bad Bunny" value="3"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="info" plain>Agregar</el-button>
                            </el-form-item>

                        <!-- </el-card> -->

                    </el-form>

                </el-col>
            </el-row>

            <el-row style="margin-top: 5px; margin-bottom: 15px;">
                <el-col :span="24">

                    <el-table
                        :data="tableData"
                        style="width: 100%"
                        border stripe>

                        <el-table-column
                            label="Curso">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.curso }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Profesor">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.Profesor }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Operationes">
                            <template slot-scope="scope">
                                <el-button size="mini">Seleccionar</el-button>
                                <el-button size="mini" type="danger">Eliminar</el-button>
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

    const MateriaFormRules = function(){
        return {
            nombre: [{ required: true, message: 'El nombre es requerido', trigger: 'change' },],
            codigo: [{ required: true, message: 'El codigo es requerido', trigger: 'change' },],

        }
    }

    export default {
        name: 'CursoLista',
        data() {
            return {

                materia: MateriaModel(),
                rules: MateriaFormRules()

            }
        },
        methods: {
            async init(){
                let _this = this;
                // mostrar un loading si hay tiempo
                if (typeof this.$route.params.materia_id !== 'undefined'){
                    // console.log();
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
