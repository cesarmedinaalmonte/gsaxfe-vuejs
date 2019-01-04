<template>
    <el-row style="margin-top: 20px;">
        <el-col :span="24">
            <el-row>
                <el-col :span="24" style="text-align: right;">
                    <el-button type="primary" size="small" style="margin-right: 5px;" @click="guardar()">Guardar</el-button> 
                    <router-link :to="{name: 'profesores'}">
                        <el-button type="danger" size="small">Cancelar</el-button>
                    </router-link>
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
                <el-col :span="12">

                    <el-form 
                        :model="profesor" :rules="rules" ref="formulario_profesor"
                        label-width="120px"> 

                        <el-form-item label="Nombre" prop="nombre">
                            <el-input placeholder="Nombre" v-model="profesor.nombre"></el-input>
                        </el-form-item>

                        <el-form-item label="Apellido" prop="apellido">
                            <el-input placeholder="Apellido" v-model="profesor.apellido"></el-input>
                        </el-form-item>

                        <el-form-item label="Sexo" prop="sexo">
                            <el-select placeholder="Sexo" style="width:100%;" v-model="profesor.sexo">
                            <el-option label="Masculino" value="M"></el-option>
                            <el-option label="Femenino" value="F"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Direccion" prop="direccion">
                            <el-input placeholder="Direccion" v-model="profesor.direccion"></el-input>
                        </el-form-item>

                        <el-form-item label="Telefono" prop="telefono" >
                            <el-input placeholder="Telefono" v-model="profesor.telefono"></el-input>
                        </el-form-item>

                    </el-form>

                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>


<script>
import axios from '@/plugins/axios'

const ProfesorModel = function(data = {}){
    return {
        id: data.id ? data.id : "",
        nombre:  data.nombre ? data.nombre : "",
        apellido:  data.apellido ? data.apellido : "",
        sexo:  data.sexo ? data.sexo : "M",
        direccion:  data.direccion ? data.direccion : "",
        telefono:  data.telefono ? data.telefono : "",
        email:  data.email ? data.email : "",
    };
}

const ProfesorFormRules = function(){
    return {
        nombre: [{ required: true, message: 'El nombre es requerido', trigger: 'change' },],
        apellido: [{ required: true, message: 'El apellido es requerido', trigger: 'change' },],
        direccion: [{ required: true, message: 'El direccion es requerido', trigger: 'change' },],
        telefono: [{ min: 10, max: 10, message: 'El telefono debe tener 10 numeros', trigger: 'change' }]
    }
}

export default {
    name: 'ProfesorFormulario',
    data(){
        return {
            profesor: ProfesorModel({}),
            rules: ProfesorFormRules()
        }
    },
    methods: {
        async init(){
            let _this = this;
            // mostrar un loading si hay tiempo
            if (typeof this.$route.params.profesor_id !== 'undefined'){
                // console.log();
                axios.get(`/docente/${this.$route.params.profesor_id}/`)
                .then((response) => {
                    _this.profesor = response.data;
                    // actualiza el header
                    let nombre =  _this.profesor.nombre+" "+  _this.profesor.apellido;
                    this.$store.dispatch('updateHeader', {
                        title: nombre,
                        breadcrumb: ['Profesores', nombre]
                    })
                }).catch((error)=> {
                   if (error.response.status === 404){ // not found
                       _this.$router.push({name: 'not_found'});  
                   }
                });

            }else{
                _this.limpiar();
                this.$store.dispatch('updateHeader', {
                    title: 'Crear Profesor',
                    breadcrumb: ['Profesores', 'Crear']
                })
            }
        },
        guardar: function(){
            let _this = this;

            // validacion de formulario
            this.$refs.formulario_profesor.validate((valid) => {
                if (valid) {
                    if (_this.profesor.id){ // editar profesor
                        axios.put(`/docente/${this.$route.params.profesor_id}/`, _this.profesor)
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
                        axios.post(`/docente/`, _this.profesor)
                        .then((response) => {
                            let data = response.data;
                            this.$notify({
                                title: 'Bien!',
                                message: 'Profesor creado satisfactoriamente.',
                                type: 'success'
                            });
                            // redireccionar a la ruta de editar
                            _this.$router.push({name: 'editar_profesor', params: {profesor_id: data.id }});  
                        }).catch((error)=> {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Ocurrio un error creando el profesor.',
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
            _this.profesor = ProfesorModel({});
        }
    },
    beforeMount: function(){
        this.init();
    }
}
</script>
