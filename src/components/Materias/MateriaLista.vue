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
                            label="Curos">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.curso }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Seccion">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.seccion }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="Nivel">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.nivel }}</span>
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
                            label="Operationes">
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

    const MateriaModel = function(data = {}){
        return {
            id: data.id ? data.id : "",
            nombre:  data.nombre ? data.nombre : "",
            apellido:  data.apellido ? data.apellido : "",

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
    name: 'CursoLista',
    data() {
        return {
            pageNumber: 5,
            tableData: [
                {
                    date: '2016-05-03',
                    nombre: 'Matematicas',
                    seccion: 'A',
                    nivel: 'Primaria',
                    curso: '1 ero',
                },
                {
                    date: '2016-05-03',
                    nombre: 'Ciencias Sociales',
                    seccion: 'A',
                    nivel: 'Primaria',
                    curso: '1 ero',
                },
                {
                    date: '2016-05-03',
                    nombre: 'Matematicas',
                    seccion: 'B',
                    nivel: 'Primaria',
                    curso: '2 do',
                },
                {
                    date: '2016-05-03',
                    nombre: 'Dibujo',
                    seccion: 'A',
                    nivel: 'Inicial',
                    curso: '1 ero',
                },
                {
                    date: '2016-05-03',
                    nombre: 'Educacion Fisica',
                    seccion: '',
                    nivel: 'Primaria',
                    curso: '3 ero',
                },
                {
                    date: '2016-05-03',
                    nombre: 'Ciencias Naturales',
                    seccion: 'C',
                    nivel: 'Primaria',
                    curso: '1 ero',
                },

            ]
        }
    },
}
</script>
