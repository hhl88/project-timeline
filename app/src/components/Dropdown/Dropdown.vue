<template>
    <v-menu
        ref='popMenu'
        v-model='popMenu'
        offset-y
        :close-on-content-click='false'
        transition='scale-transition'
        :close-on-click='true'
        v-bind="propsToPass"
        :content-class='menuClassName'
    >
        <template v-slot:activator='{ on, attrs }'>
            <v-btn depressed :class='btnClassName'
                   v-bind='attrs'
                   v-on='on'
                   v-on:click='popMenu = !popMenu'
            >
                <slot name="btn-label"></slot>
            </v-btn>

        </template>

        <slot name='dropdown-content'></slot>
    </v-menu>
</template>

<script>
export default {
    name: 'Dropdown',
    props: [
        'menuClassName',
        'btnClassName',
        'value',
        'propsToPass'
    ],
    data: () => ({
        popMenu: false
    })
};
</script>

<style scoped>

</style>
