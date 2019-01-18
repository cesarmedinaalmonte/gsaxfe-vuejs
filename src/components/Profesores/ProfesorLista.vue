<template>
    <el-row style="margin-top: 20px;">
        <el-col :span="24">
            <el-row>
                <el-col :span="24" style="text-align: right;">
                    <router-link :to="{name: 'crear_profesor'}">
                        <el-button type="primary" size="small">Crear Profesor</el-button>
                    </router-link>
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
                <el-col :span="24">

                    <el-table
                        v-loading="loading"
                        :data="tableData"
                        style="width: 100%!important;">

                        <el-table-column
                            label="Nombre">
                            <template slot-scope="scope">
                                {{ scope.row.nombre }}
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Apellido">
                            <template slot-scope="scope">
                                {{ scope.row.apellido }}
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Sexo">
                            <template slot-scope="scope">
                                {{ scope.row.sexo }}
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Direccion">
                            <template slot-scope="scope">
                                {{ scope.row.direccion }}
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Telefono">
                            <template slot-scope="scope">
                                {{ scope.row.telefono }}
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Operationes">
                            <template slot-scope="scope">
                                <router-link :to="{name: 'editar_profesor', params: {profesor_id: scope.row.id }}">
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
                            @current-change="listaProfesores()">
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
    name: 'ProfesorLista',
    data() {
        return {
            pageNumber: 1,
            totalRecords: 0,
            tableData: [],
            loading: false
        }
    },
    methods:{
        listaProfesores: function(){
            let _this = this;
            _this.loading = true;
            axios.get(`/docentes/?page=${_this.pageNumber}`)
            .then((response) => {

                _this.tableData = response.data.data;
                _this.totalRecords = 12; //response.data.count;

                _this.loading = false;

            }).catch((error)=> {
                console.log(error);

                _this.loading = fasle;
            });
        }
    },
    beforeMount: function(){
        this.$store.dispatch('updateHeader', {
                title: 'Lista de Profesores',
                breadcrumb: ['Profesores']
            })

        this.listaProfesores()

    }
}
</script>

<style>
    table.el-table__body {
        overflow-x: scroll;
    }
</style>
