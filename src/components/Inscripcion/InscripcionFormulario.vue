<template>
    <el-row style="margin-top: 20px;">
        <el-col :span="24">

            <!-- seleccion de estudiantes -->
            <el-dialog title="Inscribir Estudiante" :visible.sync="showInscripcionModal">
                <el-form>
                    <el-form-item label="Estudiante" prop="grado">
                        <el-input placeholder="Estudiante" v-model="estudiantesearch" >
                             <el-button slot="append" icon="el-icon-search" @click="buscarEstudiante()"></el-button>
                        </el-input>
                    </el-form-item>
                </el-form>

                <el-table
                        :data="estudianteLista"
                        style="width: 100%"
                        stripe>

                        <el-table-column
                            label="Nombre">
                            <template slot-scope="scope">
                                {{ scope.row.nombre +' '+ scope.row.apellido}}
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Padre">
                            <template slot-scope="scope">
                                {{ scope.row.padre }}
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Madre">
                            <template slot-scope="scope">
                                {{ scope.row.madre }}
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Inscribir">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary" @click="inscribirEstudiante(scope.row.id)">Inscribir</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
            </el-dialog>

            <!-- materias del curso -->
            <el-dialog title="Lista de Materias" :visible.sync="showMateriasModal">
                <el-table v-if="inscripcion.curso"
                        :data="inscripcion.curso.materias"
                        style="width: 100%"
                        stripe>

                        <el-table-column
                            label="Materia">
                            <template slot-scope="scope">
                                {{ scope.row.materia.nombre }}
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Docente">
                            <template slot-scope="scope">
                                {{ scope.row.docente.nombre +' '+ scope.row.docente.apellido}}
                            </template>
                        </el-table-column>
                    </el-table>
            </el-dialog>

            <el-row>
                <el-col :span="12">

                    <el-form label-width="120px">

                        <el-form-item label="Periodo">
                            <el-select placeholder="Periodo" style="width:100%;" v-model="periodoSeleccionado">
                                <el-option v-for="periodo in listaPeriodos" :key="periodo.id" 
                                    :label="periodo.codigo"
                                    :value="periodo.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Curso">
                            <el-select placeholder="Curso" style="width:100%;" v-model="valorCursoSeleccionado" >
                                <el-option v-for="curso in listaCursos" :key="curso.id"
                                            :label="(curso.nombre +' '+ curso.seccion +' '+ curso.nivel)"
                                            :value="curso.id"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="text" @click="(showMateriasModal = !showMateriasModal)">Lista de Materias del Curso</el-button>
                        </el-form-item>


                    </el-form>

                </el-col>
            </el-row>

            <el-row style="margin-top: 5px;">
                <el-col :span="24">
                    <h4>Lista de Estudiantes Inscritos</h4>
                    <div style="text-align: right;">
                        <el-button type="primary" size="small" 
                        @click="(showInscripcionModal = !showInscripcionModal)"
                        style="margin-right: 5px;">Inscribir Estudiante</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row style="margin-top: 5px;">
                <el-col :span="24">
                    <el-table
                        :data="inscripcion.estudiantes"
                        style="width: 100%"
                        stripe>

                        <el-table-column
                            label="Nombre">
                            <template slot-scope="scope">
                                {{ scope.row.nombre +' '+ scope.row.apellido}}
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Padre">
                            <template slot-scope="scope">
                                {{ scope.row.padre }}
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Madre">
                            <template slot-scope="scope">
                                {{ scope.row.madre }}
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Operationes">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="removerEstudiante(scope.row.id)">Remover</el-button>
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

export default {
    name: 'InscripcionFormulario',
    data(){
        return {
            showInscripcionModal: false,
            showMateriasModal: false,

            listaCursos: [],
            valorCursoSeleccionado: "",

            listaPeriodos: [],
            periodoSeleccionado: "",

            inscripcion: "",

            estudiantesearch: "",
            estudianteLista: []

        }
    },
    methods: {
        init: function(){
            let _this = this;
            // -- dependencies
            _this.getCursos();
            _this.getPeriodos();
        },
        getCursos: function(){
            let _this = this;
            axios.get(`/cursos`)
                    .then((response) => {
                        _this.listaCursos = response.data;                    
                    }).catch((error)=> {
                    console.log(error);
                });
        },
        getPeriodos: function(){
            let _this = this;
            axios.get(`/periodos/actual`)
                    .then((response) => {
                        _this.listaPeriodos = response.data.data;   
                        // -- preset periodo
                        _this.listaPeriodos.map(function(item){
                            if (item.id === 1)
                            _this.periodoSeleccionado = item.id;
                        });

                    }).catch((error)=> {
                    console.log(error);
                });
        },
        async getInscripcionPorCurso(id){
            let _this = this;
            axios.get(`/inscripciones/actualPorCurso/${id}`)
                .then((response) => {
                    _this.inscripcion = response.data.data;   
                }).catch((error)=> {
                console.log(error);
                if (error.response.status === 404){ // not found
                    _this.inscripcion = ""; 

                    let message = "Ocurrio un error cargando la informacion de la inscripcion.";
                    if (error.response.data){
                        message = error.response.data.message;
                    }
                    
                    this.$notify.error({
                        title: 'Error',
                        message: message,
                    });
                }
            });
        },
        buscarEstudiante: function(){
            let _this = this;
            if (!_this.estudiantesearch || _this.estudiantesearch.trim() == '' ){
                this.$notify.error({
                    title: 'Error',
                    message: "Utilice el filtro de estudiante para mejorar la busqueda.",
                });

                return false;
            }

            axios.post(`/estudiantes/buscar`, {nombre: _this.estudiantesearch})
            .then((response) => {
                _this.estudianteLista = response.data.data;
            }).catch((error)=> {
                console.log(error);
            });


        },
        removerEstudiante: function(id){
            let _this = this;
            let inscripcionId = _this.inscripcion.id;
            axios.delete(`/inscripciones/${inscripcionId}/estudiantes/${id}`)
                .then((response) => {
                    _this.inscripcion = response.data.data;  
                    _this.$notify({
                        title: 'Estudiante Removido!',
                        message: 'Estudiante removido satisfactoriamente.',
                        type: 'success'
                    }); 
                }).catch((error)=> {
                console.log(error);
                if (error.response.status === 404){ // not found
                    

                    let message = "Ocurrio un error removiendo el estudiante.";
                    if (error.response.data){
                        message = error.response.data.message;
                    }
                    
                    _this.$notify.error({
                        title: 'Error',
                        message: message,
                    });
                }
            });
        },
        inscribirEstudiante: function(id){
            let _this = this;
            let inscripcionId = _this.inscripcion.id;

            axios.post(`/inscripciones/${inscripcionId}/estudiantes/${id}`)
                .then((response) => {
                    _this.inscripcion = response.data.data;   
                    this.$notify({
                        title: 'Bien!',
                        message: 'Estudiante inscrito satisfactoriamente.',
                        type: 'success'
                    });
                }).catch((error)=> {
                console.log(error);
                if (error.response.status === 404 || error.response.status === 400){ // not found

                    let message = "Ocurrio un error removiendo el estudiante.";
                    if (error.response.data){
                        message = error.response.data.message;
                    }
                    
                    this.$notify.error({
                        title: 'Error',
                        message: message,
                    });
                }
            });
        }
    },
    watch: {
        valorCursoSeleccionado: function (nuevo, viejo) {
            this.getInscripcionPorCurso(nuevo)
        },
        showInscripcionModal: function(nuevo, viejo){
            if (nuevo === false){
                this.estudiantesearch = "";
                this.estudianteLista = [];
            }
        }
    },
    beforeMount: function(){
        this.$store.dispatch('updateHeader', {
            title: 'Inscripciones',
            breadcrumb: ['Inscripciones']
        });

        this.init();
    }
}
</script>
                