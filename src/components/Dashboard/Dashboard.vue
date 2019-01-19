<template>


    <el-row style="margin-top: 20px;">
        <el-col :span="24">
            <el-row :gutter="10">
         
                <el-col :span="6">
                    <el-card align="left" :body-style="{ padding: '25px',backgroundColor:'#0275d8',borderColor: '#0275d8', color:'#fff'}" shadow="always">
                        <span style="font-size: 50px;">{{resumen.estudiantes}}</span><br>
                        <i style="margin-right: 5px;" class="fas fa-user-graduate fa-2x"></i>
                        <span style="font-size: 35px; margin-right: 10px;">Estudiante</span>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card align="left" :body-style="{ padding: '25px', backgroundColor:'#5cb85c', borderColor: '#5cb85c', color:'#fff'}" shadow="always">
                        <span style=" font-size: 50px; ">{{resumen.docentes}}</span><br>
                        <i style="margin-right: 5px;" class="fas fa-chalkboard-teacher fa-2x"></i>
                        <span style="font-size: 35px;">Profesores</span>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card align="left" :body-style="{ padding: '25px', backgroundColor: '#d9534f', borderColor:'#d9534f', color:'#fff' }" shadow="always">
                        <span style="font-size: 50px;">{{resumen.cursos}}</span><br>
                        <i style="margin-right: 5px;" class="fas fa-chalkboard fa-2x"></i>
                        <span style="font-size: 35px;">Cursos</span>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card align="left" :body-style="{ padding: '25px', backgroundColor: '#f0ad4e', borderColor:'#f0ad4e', color:'#fff'}" shadow="always">
                        <span style="font-size: 50px;">{{resumen.materias}}</span><br>
                        <i style="margin-right: 5px;" class="fas fa-book-open fa-2x"></i>
                        <span style="font-size: 35px;">Materias</span>
                    </el-card>
                </el-col>
            </el-row>
        </el-col>

    </el-row>
    

</template>
<script>
import axios from '@/plugins/axios'

export default {
    name: 'Dashboard',
    data(){
        return {
            resumen: {
                cursos: 0,
                docentes: 0,
                materias: 0,
                estudiantes: 0,
            }
        }
    },
    methods: {
        getResumenDashboard: function(){
            let _this = this;
            axios.get(`/dashboard/`).then((response) => {
                _this.resumen = response.data.data;
            }).catch((error) => {
                // nothing to do here
            });
        }
    },
    beforeMount: function(){
        this.$store.dispatch('updateHeader', {
            title: 'Dashboard',
            breadcrumb: ['dashboard']
        });

        this.getResumenDashboard();
    }
}
</script>


