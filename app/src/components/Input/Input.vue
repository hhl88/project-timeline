<template>
    <v-text-field
        outlined
        dense
        :value='v'
        :label='label'
        :prepend-inner-icon='leftIcon'
        :clear-icon='clearable ? (clearIcon || "mdi-close-circle") : ""'
        :clearable='clearable'
        hide-details
        v-bind='propsToPass'
        :class='className'
        @change='handleChange'
        @blur='handleBlur'
    ></v-text-field>
</template>

<script>
export default {
    name: 'Input',
    props: [
        'value',
        'label',
        'leftIcon',
        'clearable',
        'clearIcon',
        'propsToPass',
        'className'
    ],
    data: () => ({
        v: ''
    }),
    created() {
        this.v = this.value;
    },
    methods: {
        handleChange: function(newValue) {
            this.v = newValue;
            this.$emit('onChange', newValue);
        },
        handleBlur: function() {
            if (this.propsToPass && this.propsToPass.rules && !this.propsToPass.rules.some(rule => rule(this.v))) {
                this.v = null;
                this.$emit('onChange', null);
            }
        }
    },
    watch: {
        value: function(newValue) {
            this.v = newValue;
        }
    }
}
;
</script>

<style scoped>

</style>
