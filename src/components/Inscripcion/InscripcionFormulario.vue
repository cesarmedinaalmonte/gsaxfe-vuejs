<template>
    <el-row style="margin-top: 20px;">
        <el-col :span="24">
            Inscripciones
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'InscripcionFormulario',

    beforeMount: function(){
        this.$store.dispatch('updateHeader', {
            title: 'Inscripciones',
            breadcrumb: ['Inscripciones']
        })
    }
}
</script>
                