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
                        v-model='value'
                        :key='"items-"  + (keyId ? item[keyId] : item.id) + "-" + keyTitle ? item[keyTitle] : item.title'
                    >
                        <v-list-item
                            v-for='(child) in item.items'
                            :key='"dropdown-" + (keyChildId ? child[keyChildId] : child.id) + "-" + keyChildTitle ? child[keyChildTitle] : child.title'
                            :value='keyChildId ? child[keyChildId] : child.id'
                            active-class='primary--text text--accent-4'
                            :class="{ 'is-active': keyChildId ? child[keyChildId] : child.id === value }"
                        >
                            <v-list-item-content>
                                <v-list-item-title>{{ keyChildTitle ? child[keyChildTitle] : child.title }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </template>

            </v-list>
        </template>
    </BaseDropdown>
</template>

<script>
import BaseDropdown from '@/components/BaseDropdown/BaseDropdown';
import Input from '@/components/Input/Input';

export default {
    name: 'DropdownSearch',
    components: { BaseDropdown, Input },
    props: [
        'menuClassName',
        'btnClassName',
        'selectedId',
        'propsToPass',
        'closeMenu',
        'label',
        'classLabel',
        'classDropdownIcon',
        'list',
        'keyId',
        'keyTitle',
        'keyChildId',
        'keyChildTitle'
    ],
    data: () => ({
        closeDropdown: 0
    }),
    computed: {
        value: {
            get() {
                console.log('getter', this.selectedId);
                return this.selectedId;
            },
            set(newVal) {
                this.closeDropdown++;
                console.log('set', newVal);
                this.$emit('onSelectItem', newVal);
            }
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
