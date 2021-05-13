<template>
    <v-menu
        ref='menu'
        v-model='menu'
        offset-y
        :close-on-content-click='false'
        transition='scale-transition'
        :close-on-click='true'
        v-bind='propsToPass'
        :content-class='menuClassName'
    >
        <template v-slot:activator='{ on, attrs }'>
            <Button :btn-class-name='btnClassName'
                    v-bind='attrs'
                    @onClick='menu = !menu'
                    v-on='on'
            >
                <template v-slot:btn-label>
                    <slot name='btn-label'></slot>
                </template>
            </Button>

        </template>

        <slot name='dropdown-content'></slot>
    </v-menu>
</template>

<script>
import Button from '@/components/Button/Button';

export default {
    name: 'BaseDropdown',
    components: { Button },
    props: [
        'menuClassName',
        'btnClassName',
        'value',
        'propsToPass',
        'closeMenu'
    ],
    data: () => ({
        menu: false
    }),
    watch: {
        closeMenu: function() {
            console.log('watch', 'closeMenu');
            this.menu = false;
        }
    }
};
</script>

<style scoped>

</style>
