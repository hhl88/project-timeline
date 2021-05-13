<template>
    <Dropdown
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
            <Input
                label='Search...'
                leftIcon='mdi-magnify'
                :clearable='true'
                :props-to-pass='{
                    dense: true
                }'
                :class-name='$style["input"]'
            />


            <v-list dense>
                <template v-for='item in list'>
                    <v-subheader :key='"header-" + keyId ? item[keyId] : item.id'>
                        {{ keyTitle ? item[keyTitle] : item.title }}
                    </v-subheader>
                    <v-list-item-group
                        v-model='selectedItem'
                        :key='"items-"  + keyId ? item[keyId] : item.id'
                    >
                        <v-list-item
                            v-for='(child) in item.items'
                            :key='"dropdown-" + keyId ? child[keyId] : (keyTitle ? child[keyTitle] : child.title)'
                            :value='keyId ? child[keyId] : child.id'
                            active-class='primary--text text--accent-4'
                        >
                            <!--                            <v-list-item-icon v-if='child.icon'>-->
                            <!--                                <v-icon v-text="child.icon"></v-icon>-->
                            <!--                            </v-list-item-icon>-->
                            <v-list-item-content
                                v-on:click='() => onSelectItem(keyId ? child[keyId] : child.id)'
                            >
                                <v-list-item-title>{{ keyTitle ? child[keyTitle] : child.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </template>

            </v-list>
        </template>
    </Dropdown>
</template>

<script>
import Dropdown from '@/components/BaseDropdown/BaseDropdown';
import Input from '@/components/Input/Input';

export default {
    name: 'DropdownSearch',
    components: { Dropdown, Input },
    props: [
        'menuClassName',
        'btnClassName',
        'value',
        'propsToPass',
        'closeMenu',
        'label',
        'classLabel',
        'classDropdownIcon',
        'list',
        'keyId',
        'keyTitle'
    ],
    data: () => ({
        closeDropdown: 0,
        selectedItem: null
    }),
    created() {
        if (this.value) {
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
