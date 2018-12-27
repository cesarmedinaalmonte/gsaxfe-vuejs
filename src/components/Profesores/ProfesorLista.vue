<template>
    <el-row style="margin-top: 20px;">
        <el-col :span="24">
            <el-row>
                <el-col :span="24" style="text-align: right;">
                    <router-link :to="{name: 'crear_profesor'}">
                        <el-button type="primary">Crear Profesor</el-button>
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
                                <el-button size="mini">Editar</el-button>
                                <el-button size="mini" type="danger">Eliminar</el-button>
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
export default {
    name: 'ProfesorLista',
    data() {
        return {
            pageNumber: 5,
            tableData: [
                {
                    date: '2016-05-03',
                    nombre: 'Pedro',
                    apellido: 'Hernandez',
                    sexo: 'Masculino',
                    direccion: 'C/ XX #5, Santiago, RD.',
                    telefono: '(809) 555 3333',
                }, 
                {
                    date: '2016-05-03',
                    nombre: 'Diogenes',
                    apellido: 'Martinez',
                    sexo: 'Masculino',
                    direccion: 'C/ XX #5, Santiago, RD.',
                    telefono: '(809) 555 3333',
                },
                {
                    date: '2016-05-03',
                    nombre: 'Gloria',
                    apellido: 'Estefan',
                    sexo: 'Femenino',
                    direccion: 'C/ XX #5, Santiago, RD.',
                    telefono: '(809) 555 3333',
                },
                {
                    date: '2016-05-03',
                    nombre: 'Hector',
                    apellido: 'Fernandez',
                    sexo: 'Masculino',
                    direccion: 'C/ XX #5, Santiago, RD.',
                    telefono: '(809) 555 3333',
                },
                {
                    date: '2016-05-03',
                    nombre: 'Luis',
                    apellido: 'Polonia',
                    sexo: 'Masculino',
                    direccion: 'C/ XX #5, Santiago, RD.',
                    telefono: '(809) 555 3333',
                }                
            ]
        }
    },
}
</script>

<style>
    table.el-table__body {
        overflow-x: scroll;
    }
</style>
