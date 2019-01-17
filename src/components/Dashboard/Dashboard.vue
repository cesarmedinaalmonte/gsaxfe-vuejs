<template>
    <div>Dashboard</div>
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

