<template>
    <v-text-field
        outlined
        :label='label'
        :prepend-inner-icon='leftIcon'
        :clear-icon='clearable ? (clearIcon || "mdi-close-circle") : ""'
        :clearable='clearable'
        solo
        flat
        hide-details
    ></v-text-field>
</template>

<script>
export default {
    name: 'Input',
    props: [
        'label',
        'leftIcon',
        'clearable',
        'clearIcon'
    ]
};
</script>

<style scoped>

</style>
