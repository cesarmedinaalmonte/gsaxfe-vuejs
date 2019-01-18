<template>
    <el-row style="margin-top: 20px;">
        <el-col :span="24">
            <el-row>
                <el-col :span="24" style="text-align: right;">
                    <router-link :to="{name: 'crear_estudiante'}">
                        <el-button type="primary" size="small">Crear Estudiante</el-button>
                    </router-link>
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
                <el-col :span="24">

                    <el-table
                        :data="tableData"
                        style="width: 100%!important;">

                        <el-table-column
                            label="Nombre">
                            <template slot-scope="scope">
                                {{ scope.row.nombre }}
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Apellido Paterno">
                            <template slot-scope="scope">
                                {{ scope.row.apellidoPaterno }}
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="Apellido Materno">
                            <template slot-scope="scope">
                                {{ scope.row.apellidoMaterno }}
                            </template>
                        </el-table-column>


                        <el-table-column
                            label="Sexo">
                            <template slot-scope="scope">
                                {{ scope.row.sexo }}
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Fecha de Nacimiento">
                            <template slot-scope="scope">
                                {{ scope.row.fechaNacimiento }}
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Correo">
                            <template slot-scope="scope">
                                {{ scope.row.email }}
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Operationes">
                            <template slot-scope="scope">
                                <router-link :to="{name: 'editar_estudiante', params: {estudiante_id: scope.row.id }}">
                                    <el-button size="mini" type="primary">Editar</el-button>
                                </router-link>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div style="text-align:right; margin-top:15px;">
                        <el-pagination background
                            :current-page.sync="pageNumber"
                            :page-size="10"
                            layout="total, prev, pager, next"
                            :total="totalRecords"
                            @current-change="listaEstudiantes()">
                        </el-pagination>
                    </div>

                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>


<script>
import axios from '@/plugins/axios'


export default {
    name: 'EstudianteLista',
    data() {
        return {
            pageNumber: 1,
            totalRecords: 0,
            tableData: []
        }
    },
    methods:{
        listaEstudiantes: function(){
            let _this = this;
            axios.get(`/estudiantes/?page=${_this.pageNumber}`)
            .then((response) => {

                _this.tableData = response.data.data;
                _this.totalRecords = 12; //response.data.count;

            }).catch((error)=> {
                console.log(error);
            });
        }
    },
    beforeMount: function(){
        this.$store.dispatch('updateHeader', {
                title: 'Lista de Estudiantes',
                breadcrumb: ['Estudiantes']
            })

        this.listaEstudiantes()

    }
}
</script>

<style>
    table.el-table__body {
        overflow-x: scroll;
    }
</style>
