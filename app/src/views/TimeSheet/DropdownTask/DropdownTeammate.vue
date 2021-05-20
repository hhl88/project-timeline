<template>
    <Dropdown
        btn-class-name='btn'
        :close-menu='closeTeammate'
        :props-to-pass='propsToPass'
    >
        <template v-slot:btn-label>
            <v-row align-content='center' justify='space-between'>
                <span :class='[classLabel, "label"]'> {{ label || 'Teammate' }}</span>
                <v-icon small>mdi-menu-down</v-icon>
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
                <v-subheader>Employee</v-subheader>
                <v-list-item-group
                    v-model='selectedTeammate'
                    mandatory
                    color='primary'
                >
                    <v-list-item
                        v-for='(item, i) in list'
                        :key='i'
                        :value='item'
                        active-class='active-text text--accent-4'
                    >
                        <v-list-item-content
                            v-on:click='() => onSelectTeammate(item)'
                        >
                            <v-list-item-title v-text='item'></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </template>
    </Dropdown>
</template>

<script>
import Dropdown from '@/components/BaseDropdown/BaseDropdown';
import Input from '@/components/Input/Input';

export default {
    name: 'DropdownTask',
    components: { Dropdown, Input },
    props: [
        'menuClassName',
        'btnClassName',
        'value',
        'propsToPass',
        'closeMenu',
        'label',
        'classLabel'
    ],
    data: () => ({
        closeTeammate: 0,
        selectedTeammate: null,
        list: ['Teammate 1', 'Teammate 2 long long', 'Teammate 3 long long long long long long']
    }),
    methods: {
        onSelectTeammate: function(value) {
            this.closeTeammate++;
            this.selectedTeammate = value;
            console.log('onSelectTeammate', value);
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
    width: 150px;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 5px;
}
</style>

<style module lang='scss'>
.input {
    padding: 10px !important;
    background-color: #fff;
}
</style>
