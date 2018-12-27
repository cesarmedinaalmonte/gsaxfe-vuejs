<template>
    <el-row style="margin-top: 20px;">
        <el-col :span="24">
            <el-row>
                <el-col :span="24" style="text-align: right;">
                    <el-button type="primary" style="margin-right: 5px;">Guardar</el-button> 
                    <router-link :to="{name: 'cursos'}">
                        <el-button type="danger">Cancelar</el-button>
                    </router-link>
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
                <el-col :span="12">

                    <el-form ref="form" label-width="120px">

                        <el-form-item label="Nombre">
                            <el-input placeholder="Nombre del curso"></el-input>
                        </el-form-item>

                        <el-form-item label="Seccion">
                            <el-select placeholder="Seccion" style="width:100%;">
                            <el-option label="Seccion A" value="A"></el-option>
                            <el-option label="Seccion B" value="B"></el-option>
                            <el-option label="Seccion C" value="C"></el-option>
                            <el-option label="Seccion D" value="D"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Nivel">
                            <el-select placeholder="Nivel" style="width:100%;">
                            <el-option label="Nivel Inicial" value="inicial"></el-option>
                            <el-option label="Nivel Primaria" value="primaria"></el-option>
                            <el-option label="Nivel Secundaria" value="secundaria"></el-option>
                            </el-select>
                        </el-form-item>

                    </el-form>

                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>


<script>
export default {
    name: 'CursoFormulario'
}
</script>
