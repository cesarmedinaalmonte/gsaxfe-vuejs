<template>

    <div>
        <el-row :gutter="30">
            <el-col :span="6">
                <el-card align="left"  :body-style="{ padding: '60px',backgroundColor:'#0275d8',borderColor: '#0275d8', color:'#fff'}" shadow="always">
                    <span style=" font-size: 60px; ">553</span><br>
                    <i style="margin-right: 5px;" class="fas fa-user-graduate fa-2x"></i>
                    <span style=" font-size: 35px; margin-right: 10px;">Estudiante</span>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card align="left" :body-style="{ padding: '60px', backgroundColor:'#5cb85c', borderColor: '#5cb85c', color:'#fff'}" shadow="always">
                    <span style=" font-size: 60px; ">30</span><br>
                    <i style="margin-right: 5px;" class="fas fa-chalkboard-teacher fa-2x"></i>
                    <span style="font-size: 35px;">Profesores</span>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card align="left" :body-style="{ padding: '60px', backgroundColor: '#d9534f', borderColor:'#d9534f', color:'#fff' }" shadow="always">
                    <span style=" font-size: 60px; ">8</span><br>
                    <i style="margin-right: 5px;" class="fas fa-chalkboard fa-2x"></i>
                    <span style="font-size: 35px;">Cursos</span>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card align="left" :body-style="{ padding: '60px', backgroundColor: '#f0ad4e', borderColor:'#f0ad4e', color:'#fff'}" shadow="always">
                    <span style=" font-size: 60px; ">14</span><br>
                    <i style="margin-right: 5px;" class="fas fa-book-open fa-2x"></i>
                    <span style="font-size: 35px;">Materia</span>
                </el-card>
            </el-col>

        </el-row>
    </div>

</template>
<script>
export default {
    name: 'Dashboard',
    beforeMount: function(){
        this.$store.dispatch('updateHeader', {
            title: 'Dashboard',
            breadcrumb: ['dashboard']
        })
}
}
</script>


