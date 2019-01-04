<template>
    <el-container>
        <el-aside>
            <Sidebar/>
        </el-aside>

        <el-main>
            <PageHeader/>
            <router-view :key="$route.path"/>
        </el-main>
    </el-container>
</template>

<script>
import Sidebar from '@/components/Layout/Sidebar'
import PageHeader from '@/components/Layout/PageHeader'

export default {
    name: 'home',
    components: {
        Sidebar,
        PageHeader
    }
}
</script>
