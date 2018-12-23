<template>
    <el-container>
        <el-aside>
            <Sidebar/>
        </el-aside>

        <el-main>
            <router-view/>
        </el-main>
    </el-container>
</template>

<script>
import Sidebar from '@/components/Layout/Sidebar'

export default {
    name: 'home',
    components: {
        Sidebar
    }
}
</script>
