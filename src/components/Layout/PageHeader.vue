<template>
    <div>
        <h2> {{title}} </h2>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>Inicio</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(value, index) in breadcrumb" :key="index">
               {{value}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'PageHeader',
    computed: mapState({
        title: state => state.headerTitle,
        breadcrumb: state => state.breadcrumb
    })
}
</script>

