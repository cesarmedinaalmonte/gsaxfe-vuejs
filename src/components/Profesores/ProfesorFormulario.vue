<template>
    <el-row style="margin-top: 20px;">
        <el-col :span="24">
            <el-row>
                <el-col :span="24" style="text-align: right;">
                    <el-button type="primary" style="margin-right: 5px;">Guardar</el-button> 
                    <router-link :to="{name: 'profesores'}">
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

                        <el-form-item label="Apellido">
                            <el-input placeholder="Apellido"></el-input>
                        </el-form-item>

                        <el-form-item label="Seccion">
                            <el-select placeholder="Sexo" style="width:100%;">
                            <el-option label="Masculino" value="M"></el-option>
                            <el-option label="Femenito" value="F"></el-option>
                            <el-option label="Otros" value="O"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Direccion">
                            <el-input placeholder="Direccion"></el-input>
                        </el-form-item>

                        <el-form-item label="Telefono">
                            <el-input placeholder="Telefono"></el-input>
                        </el-form-item>

                    </el-form>

                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>



<script>
export default {
    name: 'ProfesorFormulario'
}
</script>
