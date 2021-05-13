<template>
    <BaseDropdown
        :btn-class-name='[$style["btn"], btnClassName]'
        :close-menu='closeDropdown'
        :props-to-pass='propsToPass'
    >
        <template v-slot:btn-label>
            <v-row justify='space-between' align='center'>
                <slot name='label'></slot>
                <div :class='[classLabel, "label"]'> {{ label }}</div>
                <v-icon :class='[classDropdownIcon, "dropdown-icon"]'>mdi-menu-down</v-icon>
            </v-row>
        </template>
        <template v-slot:dropdown-content>

            <v-list dense>
                <v-list-item-group
                    v-for='item in list'
                    v-model='selectedItem'
                    :key='"items-" + item.id'
                >
                    <v-list-item
                        :value='item.id'
                        active-class='primary--text text--accent-4'
                    >
                        <v-list-item-content
                            v-on:click='() => onSelectItem(item.id)'
                        >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>

            </v-list>
        </template>
    </BaseDropdown>
</template>

<script>
import BaseDropdown from '@/components/BaseDropdown/BaseDropdown';

export default {
    name: 'Dropdown',
    components: { BaseDropdown },
    props: [
        'btnClassName',
        'value',
        'propsToPass',
        'closeMenu',
        'label',
        'classLabel',
        'classDropdownIcon',
        'list',
    ],
    data: () => ({
        closeDropdown: 0,
        selectedItem: null
    }),
    created() {
        if (this.value != null) {
            this.selectedItem = this.value;
        }
    },
    methods: {
        onSelectItem: function(id) {
            this.closeDropdown++;
            this.$emit('onSelectItem', id);
        }
    }
};
</script>

<style scoped lang='scss'>

.v-subheader {
    font-size: 1rem;
    font-weight: 600;
}

.v-list-item__content {
    text-align: left;
}

.label {
    overflow: hidden;
    max-width: 90%;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 10px;
}

.dropdown-icon {
    padding: 0 5px;
}
</style>

<style module lang='scss'>
.btn {
    max-width: 100%;
    width: 100%;
}

.input {
    padding: 10px !important;
    background-color: #fff;
}
</style>
