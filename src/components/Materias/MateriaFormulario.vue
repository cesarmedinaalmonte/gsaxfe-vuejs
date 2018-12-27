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
                            <el-input placeholder="Nombre"></el-input>
                        </el-form-item>

                        <!-- <el-card shadow="hover"> -->

                            <el-form-item label="Curso">
                                <el-select placeholder="Curso" style="width:100%;">
                                    <el-option label="1 ero - Seccion A - Primaria" value="1"></el-option>
                                    <el-option label="1 ero - Seccion B - Primaria" value="2"></el-option>
                                    <el-option label="1 ero - Seccion B - Primaria" value="3"></el-option>
                                    <el-option label="2 do - Seccion A - Primaria" value="4"></el-option>
                                    <el-option label="2 do - Seccion B - Primaria" value="5"></el-option>
                                    <el-option label="2 do - Seccion B - Primaria" value="6"></el-option>
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
export default {
    name: 'MateriaFormulario',
    data() {
        return {
            tableData: [
                {
                    curso: '1 ero - Seccion A - Primaria',
                    Profesor: 'Bad Bunny'
                },
                {
                    curso: '1 ero - Seccion A - Primaria',
                    Profesor: 'Bad Bunny'
                },
                {
                    curso: '1 ero - Seccion A - Primaria',
                    Profesor: 'Bad Bunny'
                },
                {
                    curso: '1 ero - Seccion A - Primaria',
                    Profesor: 'Bad Bunny'
                }
                
            ]
        }
    },
}
</script>