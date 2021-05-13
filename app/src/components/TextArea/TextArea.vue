<template>
    <v-textarea
        :class='[className]'
        :label='label'
        auto-grow
        dense
        outlined
        rows='2'
        row-height='15'
        clear-icon='mdi-close-circle'
        v-bind='propsToPass'
        :value='input'
        @change='handleChange'
        full-width
    >
    </v-textarea>
</template>

<script>
export default {
    name: 'TextArea',
    props: [
        'label',
        'propsToPass',
        'value',
        'className'
    ],
    data: () => ({
        input: ''
    }),
    created() {
        if (this.value) {
            this.input = this.value;
        }
    },
    methods: {
        handleChange: function(newValue) {
            this.input = newValue;
            this.$emit('onChange', newValue);
        }
    }
};
</script>

<style scoped>
::v-deep textarea {
    max-height: 150px;
    overflow-y: auto;
}
</style>
