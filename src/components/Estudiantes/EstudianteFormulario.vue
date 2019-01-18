<template>
    <el-row style="margin-top: 20px;">
        <el-col :span="24">
            <el-row>
                <el-col :span="24" style="text-align: right;">
                    <el-button type="primary" size="small" style="margin-right: 5px;" @click="guardar()">Guardar</el-button>
                    <router-link :to="{name: 'estudiantes'}">
                        <el-button type="danger" size="small">Cancelar</el-button>
                    </router-link>
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
                <el-col :span="12">

                    <el-form
                        :model="estudiante" :rules="rules" ref="formulario_estudiante"
                        label-width="120px">

                        <el-form-item label="Nombre" prop="nombre">
                            <el-input placeholder="Nombre" v-model="estudiante.nombre"></el-input>
                        </el-form-item>

                        <el-form-item label="Apellido" prop="apellido">
                            <el-input placeholder="Nombre" v-model="estudiante.apellido"></el-input>
                        </el-form-item>

                        <el-form-item label="Sexo" prop="sexo">
                            <el-select placeholder="Sexo" style="width:100%;" v-model="estudiante.sexo">
                            <el-option label="Masculino" value="M"></el-option>
                            <el-option label="Femenino" value="F"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Fecha Nac." prop="fechanacimiento">
                            <el-date-picker type="date"  placeholder="Fecha" suffix-icon="el-icon-date" v-model="estudiante.fechaNacimiento"></el-date-picker>
                        </el-form-item>

                        <el-form-item label="Direccion" prop="direccion">
                            <el-input placeholder="Direccion" v-model="estudiante.direccion"></el-input>
                        </el-form-item>

                        <el-form-item label="Padre" prop="apellidoP">
                            <el-input placeholder="Apellido Paterno" v-model="estudiante.padre"></el-input>
                        </el-form-item>

                        <el-form-item label="Madre" prop="apellidoM">
                            <el-input placeholder="Apellido Materno" v-model="estudiante.madre"></el-input>
                        </el-form-item>

                        <el-form-item label="Telefono" prop="telefono" >
                            <el-input placeholder="Telefono" v-model="estudiante.telefono"></el-input>
                        </el-form-item>

                    </el-form>

                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>


<script>
import axios from '@/plugins/axios'

const EstudianteModel = function(data = {}){
    return {
        id: data.id ? data.id : "",
        nombre:  data.nombre ? data.nombre : "",
        apellido:  data.apellido ? data.apellido : "",
        sexo:  data.sexo ? data.sexo : "M",
        fechaNacimiento:  data.fechaNacimiento ? data.fechaNacimiento : "",
        direccion:  data.direccion ? data.direccion : "",
        telefono:  data.telefono ? data.telefono : "",
        email:  data.email ? data.email : "",
        padre:  data.padre ? data.padre : "",
        madre:  data.madre ? data.madre : "",

        
    };
}

const EstudianteFormRules = function(){
    return {
        nombre: [{ required: true, message: 'El nombre es requerido', trigger: 'change' },],
        apellido: [{ required: true, message: 'El apellido es requerido', trigger: 'change' },],
        direccion: [{ required: true, message: 'El direccion es requerido', trigger: 'change' },],
        telefono: [{ min: 10, max: 10, message: 'El telefono debe tener 10 numeros', trigger: 'change' }]
    }
}

export default {
    name: 'EstudianteFormulario',
    data(){
        return {
            estudiante: EstudianteModel({}),
            rules: EstudianteFormRules()
        }
    },
    methods: {
        async init(){
            let _this = this;
            // mostrar un loading si hay tiempo
            if (typeof this.$route.params.estudiante_id !== 'undefined'){
                // console.log();
                axios.get(`/estudiantes/${this.$route.params.estudiante_id}`)
                .then((response) => {
                    _this.estudiante = response.data.data;
                    // actualiza el header
                    let nombre =  _this.estudiante.nombre+" "+  _this.estudiante.apellido;
                    this.$store.dispatch('updateHeader', {
                        title: nombre,
                        breadcrumb: ['Estudiantes', nombre]
                    })
                }).catch((error)=> {
                   if (error.response.status === 404){ // not found
                       _this.$router.push({name: 'not_found'});
                   }
                });

            }else{
                _this.limpiar();
                this.$store.dispatch('updateHeader', {
                    title: 'Crear Estudiante',
                    breadcrumb: ['Estudiantes', 'Crear']
                })
            }
        },
        guardar: function(){
            let _this = this;

            // validacion de formulario
            this.$refs.formulario_estudiante.validate((valid) => {
                if (valid) {
                    if (_this.estudiante.id){ // editar estudiante
                        axios.put(`/estudiantes/${this.$route.params.estudiante_id}`, _this.estudiante)
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

                    }else{ // crear estudiante
                        axios.post(`/estudiantes/`, _this.estudiante)
                        .then((response) => {
                            let data = response.data.data;
                            this.$notify({
                                title: 'Bien!',
                                message: 'Estudiente creado satisfactoriamente.',
                                type: 'success'
                            });
                            // redireccionar a la ruta de editar
                            _this.$router.push({name: 'editar_estudiante', params: {estudiante_id: data.id }});
                        }).catch((error)=> {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Ocurrio un error creando al estudiante.',
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
            _this.estudiante = EstudianteModel({});
        }
    },
    beforeMount: function(){
        this.init();
    }
}
</script>
