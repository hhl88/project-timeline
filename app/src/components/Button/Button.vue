<template>
    <v-btn depressed
           class='btn'
           :class='btnClassName'
           v-bind='propsToPass'
           @click='click'
    >
        <slot name='btn-label'></slot>
    </v-btn>
</template>

<script>
export default {
    name: 'Button',
    props: [
        'btnClassName',
        'propsToPass',
        'onClick'
    ],
    methods: {
        click: function() {
            this.$emit('onClick');
        }
    }
};
</script>

<style scoped lang='scss'>
@import "./style";
</style>
