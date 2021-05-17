<template>
    <div>
        <slot
            v-if='err'
            name='error'
            v-bind:err='err'
            v-bind:vm='vm'
            v-bind:info='info'
        >
            Something went wrong
        </slot>
        {{ $slots.default[0] }}
    </div>
</template>

<script>
export default {
    name: 'ErrorBoundary',
    props: {
        stopPropagation: Boolean
    },
    data() {
        return {
            err: false,
            vm: null,
            info: null
        };
    },
    errorCaptured(err, vm, info) {
        this.err = err;
        this.vm = vm;
        this.info = info;
        return !this.stopPropagation;
    }
};
</script>

<style scoped lang='scss'>

</style>
