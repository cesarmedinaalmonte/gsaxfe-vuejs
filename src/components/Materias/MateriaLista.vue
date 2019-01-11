<template>
    <el-row style="margin-top: 20px;">
        <el-col :span="24">
            <el-row>
                <el-col :span="24" style="text-align: right;">
                    <router-link :to="{name: 'crear_materia'}">
                        <el-button type="primary">Crear Materia</el-button>
                    </router-link>
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
                <el-col :span="24">

                    <el-table
                        :data="tableData"
                        style="width: 100%">

                        <el-table-column
                            label="Nombre">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.nombre }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Codigo">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.codigo }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Creado En">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.date }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Operationes">KK
                            <template slot-scope="scope">
                                <el-button size="mini">Editar</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div style="text-align:right; margin-top:15px;">
                        <el-pagination background
                            :current-page.sync="pageNumber"
                            :page-size="5"
                            layout="total, prev, pager, next"
                            :total="40">
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
    name: 'MateriaLista',
        data() {
        return {
            pageNumber: 1,
            totalRecords: 0,
            tableData: []
        }
    },
    methods:{
        listaMateria: function(){
            let _this = this;
            axios.get(`/materia/?page=${_this.pageNumber}`)
                .then((response) => {

                    _this.tableData = response.data.results;
                    _this.totalRecords = response.data.count;

                }).catch((error)=> {
                console.log(error);
            });
        }
    },
    beforeMount: function(){
        this.$store.dispatch('updateHeader', {
            title: 'Lista de Materias',
            breadcrumb: ['Materias']
        })
        this.listaMateria();
    }
    }
</script>

<style>
    table.el-table__body {
        overflow-x: scroll;
    }
</style>
