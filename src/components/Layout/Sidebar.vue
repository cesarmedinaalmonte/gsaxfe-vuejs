<template>
    <el-row class="tac" style="height: 100%;">
        <el-menu :router="true"
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <!-- <el-submenu index="1">
            <template slot="title">
            <i class="el-icon-location"></i>
            <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item one</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
        </el-submenu> -->
        <el-menu-item index="2" :route="{ name: 'cursos'}">
            <i class="el-icon-menu"></i>
            <span>Cursos</span>
        </el-menu-item>
        <el-menu-item index="3"  :route="{ name: 'profesores'}">
            <!-- <i class="el-icon-menu"></i> -->
            <i class="fa fa-user"></i> 
            <span> Profesores</span>
        </el-menu-item>
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