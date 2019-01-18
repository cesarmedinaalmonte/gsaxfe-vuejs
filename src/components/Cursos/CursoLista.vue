<template>
    <el-row style="margin-top: 20px;">
        <el-col :span="24">
            <el-row>
                <el-col :span="24" style="text-align: right;">
                    <router-link :to="{name: 'crear_curso'}">
                        <el-button type="primary">Crear Curso</el-button>
                    </router-link>
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
                <el-col :span="24">

                    <el-table
                        :data="tableData"
                        style="width: 100%">

                        <el-table-column
                            label="Nombre"
                            width="180">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.nombre }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Seccion"
                            width="180">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.seccion }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Nivel"
                            width="180">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.nivel }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Operationes">
                            <template slot-scope="scope">
                                <router-link :to="{name: 'editar_curso', params: {curso_id: scope.row.id }}">
                                    <el-button size="mini">Editar</el-button>
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
                            @current-change="listaCurso()">
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
        name: 'CursoLista',
        data() {
            return {
                pageNumber: 1,
                totalRecords: 0,
                tableData: []
            }
        },
        methods:{
            listaCurso: function(){
                let _this = this;
                axios.get(`/cursos/?page=${_this.pageNumber}`)
                    .then((response) => {
                        _this.tableData = response.data;
                        _this.totalRecords = 12; //response.data.count;

                    }).catch((error)=> {
                    console.log(error);
                });
            }
        },
        beforeMount: function(){
            this.$store.dispatch('updateHeader', {
                title: 'Lista de Curso',
                breadcrumb: ['Cursos']
            })
            this.listaCurso();
        }
    }
</script>

<style>
    table.el-table__body {
        overflow-x: scroll;
    }
</style>
