<template>
    <el-row class="tac" style="height: 100%;">
        <el-menu :router="true"
            default-active="6"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">

            <el-menu-item-group title="Administracion">
                <el-menu-item index="6">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </el-menu-item>

                <el-menu-item index="1" :route="{ name: 'cursos'}">
                    <i class="fas fa-chalkboard"></i>
                    <span>Cursos</span>
                </el-menu-item>
                <el-menu-item index="2"  :route="{ name: 'profesores'}">
                    <i class="fas fa-chalkboard-teacher"></i>
                    <span> Profesores</span>
                </el-menu-item>
                <el-menu-item index="3" :route="{ name: 'materias'}">
                    <i class="fas fa-book "></i>
                    <span>Materias</span>
                </el-menu-item>
                <el-menu-item index="8"  :route="{ name: 'estudiantes'}">
                    <i class="fas fa-chalkboard-teacher"></i>
                    <span> Estudiantes</span>
                </el-menu-item>

                <el-menu-item index="7" >
                    <i class="fas fa-file-pdf"></i>
                    <span> Reportes</span>
                </el-menu-item>

            </el-menu-item-group>

            <el-menu-item-group title="Profesores">
                <el-menu-item index="4">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </el-menu-item>
                <el-menu-item index="5" >
                    <i class="fas fa-file-pdf"></i>
                    <span> Reportes</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-menu>
    </el-row>
</template>
<script>

export default {
    name: 'Sidebar',
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
