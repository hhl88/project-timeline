<template>

    <DropdownSearch :list='list'
                    :selected-id='selectedUser && selectedUser.user_id'
                    :btn-class-name='$style["dropdown-teammate"]'
                    @onSelectItem='onSelectTeammate'
                    key-child-id='user_id'
                    key-child-title='user_name'
                    label='Teammate'
                    :props-to-pass='{ left: true, nudgeBottom: 10}'
    />
</template>

<script>
import DropdownSearch from '@/components/DropdownSearch/DropdownSearch';

export default {
    name: 'DropdownTeammate',
    components: { DropdownSearch },
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
        list: [],
        selectedUser: null
    }),
    computed: {
        users() {
            return this.$store.getters.users;
        },
        userId() {
            return this.$store.getters.userId;
        }
    },
    methods: {
        onSelectTeammate: function(value) {
            this.closeTeammate++;
            this.$store.dispatch('setUser', value);
        }
    },
    watch: {
        users(newValue) {
            this.list = [{
                id: 1,
                title: 'Employee',
                items: [...newValue]
            }];
        },
        userId(newValue) {
            this.selectedUser = this.users.find(user => user.user_id === newValue);
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

.dropdown-teammate {
    width: 130px;
}
</style>
