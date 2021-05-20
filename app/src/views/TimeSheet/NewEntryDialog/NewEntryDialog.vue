<template>

    <v-dialog
        :value='dialog'
        @click:outside='closeDialog'
        width='550'>
        <v-card>
            <v-card-title class='title grey lighten-2'>
                New Time Entry
                <span class='date' v-if='showType === "day"'>{{ $moment(date).format('dddd, DD MMM YYYY') }}</span>
            </v-card-title>

            <v-card-text>
                <div class='body'>
                    <div class='project-task'>Project/Task</div>

                    <DropdownSearch :list='clientProjects'
                                    :selectedId='selectedProject && selectedProject.project_id'
                                    :btn-class-name='$style["btn"]'
                                    @onSelectItem='handleSelectProject'
                    >
                        <template v-slot:label>
                            <div :class='$style["project-client"]'>
                                <div :class='$style["client"]'>{{ selectedProject.client_name }}</div>
                                <div :class='$style["project"]'>[{{ selectedProject.project_code
                                    }}] {{ selectedProject.project_name }}
                                </div>
                            </div>
                        </template>
                    </DropdownSearch>


                    <DropdownSearch :list='projectTasks'
                                    :selectedId='selectedTask && selectedTask.task_id'
                                    :btn-class-name='$style["dropdown-task"]'
                                    @onSelectItem='handleSelectTask'
                    >
                        <template v-slot:label>
                            <div :class='$style["task"]'>
                                {{ selectedTask.task_name }}
                            </div>
                        </template>
                    </DropdownSearch>

                    <v-row v-if='showType === "day"'>
                        <v-col cols='8'>
                            <TextArea
                                label='Notes (optional)'
                                @onChange='(newNote) => notes = newNote'
                            />
                        </v-col>
                        <v-col cols='4'>
                            <Input
                                :value='hours > 0 ? $utils.toTime(hours) : ""'
                                :props-to-pass='{
                                    placeholder : "0:00",
                                    rules: [
                                        (v) =>  !v || (v &&v.trim().length ===0) ||$utils.isTime(v, true)
                                    ]
                                }'
                                @onChange='handleChangeHours'
                            />
                        </v-col>
                    </v-row>
                </div>

            </v-card-text>

            <v-card-actions>
                <Button
                    :props-to-pass='{
                        color: "primary"
                    }'
                    @onClick='handleSubmit'
                >
                    <template v-slot:btn-label>
                        {{ showType === 'week' ? 'Save Row' : hours > 0 ? 'Save Entry' : 'Start Timer' }}
                    </template>
                </Button>
                <Button
                    color='primary'
                    text
                    @onClick='closeDialog'
                >
                    <template v-slot:btn-label>
                        Cancel
                    </template>
                </Button>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import DropdownSearch from '@/components/DropdownSearch/DropdownSearch';
import TextArea from '@/components/TextArea/TextArea';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';

export default {
    name: 'NewEntryDialog',
    components: { Button, Input, TextArea, DropdownSearch },
    props: [
        'date'
    ],
    data: () => ({
        dialog: false,
        projects: [],
        tasks: [],
        clientProjects: [],
        projectTasks: [],
        selectedProject: null,
        selectedTask: null,
        notes: '',
        hours: 0
    }),
    computed: {
        userId() {
            return this.$store.getters.userId;
        },
        users() {
            return this.$store.getters.users;
        },
        showType() {
            return this.$store.getters.showType;
        },
        pickerDate() {
            return this.$store.getters.pickerDate;
        },
        range() {
            return this.$store.getters.range;
        }
    },
    mounted() {
        this.dialog = true;
        this.projects = [
            {
                project_id: 1,
                project_code: 'SAMPLE',
                project_name: 'Fixed Fee Project',
                client_id: 1,
                client_name: '[SAMPLE] Client A',
                tasks: [
                    {
                        task_id: 1,
                        billable: true
                    },
                    {
                        task_id: 2,
                        billable: true
                    },
                    {
                        task_id: 3,
                        billable: true
                    },
                    {
                        task_id: 4,
                        billable: true
                    },
                    {
                        task_id: 5,
                        billable: false
                    }
                ]
            },
            {
                project_id: 2,
                project_code: 'SAMPLE',
                project_name: 'Non-Billable Project',
                client_id: 1,
                client_name: '[SAMPLE] Client A',
                tasks: [
                    {
                        task_id: 1,
                        billable: false
                    },
                    {
                        task_id: 2,
                        billable: false
                    },
                    {
                        task_id: 3,
                        billable: false
                    },
                    {
                        task_id: 4,
                        billable: false
                    },
                    {
                        task_id: 5,
                        billable: false
                    }
                ]
            },
            {
                project_id: 3,
                project_code: 'SAMPLE',
                project_name: 'Monthly Retainer',
                client_id: 2,
                client_name: '[SAMPLE] Client B',
                tasks: [
                    {
                        task_id: 1,
                        billable: true
                    },
                    {
                        task_id: 2,
                        billable: true
                    },
                    {
                        task_id: 3,
                        billable: true
                    },
                    {
                        task_id: 4,
                        billable: true
                    },
                    {
                        task_id: 5,
                        billable: false
                    }
                ]
            },
            {
                project_id: 4,
                project_code: 'SAMPLE',
                project_name: 'TimeSheet & Material Project',
                client_id: 2,
                client_name: '[SAMPLE] Client B',
                tasks: [
                    {
                        task_id: 1,
                        billable: true
                    },
                    {
                        task_id: 2,
                        billable: true
                    },
                    {
                        task_id: 3,
                        billable: true
                    },
                    {
                        task_id: 4,
                        billable: true
                    },
                    {
                        task_id: 5,
                        billable: false
                    }
                ]
            }
        ];

        this.tasks = [
            {
                task_id: 1,
                task_name: 'Design'
            },
            {
                task_id: 2,
                task_name: 'Marketing'
            },
            {
                task_id: 3,
                task_name: 'Programming'
            },
            {
                task_id: 4,
                task_name: 'Project Management'
            },
            {
                task_id: 5,
                task_name: 'Business Development'
            }
        ];

        this.clientProjects = this.$_.chain(this.projects)
            .groupBy(p => p.client_id)
            .map((value, key) => {
                let title;
                const items = value.map(v => {
                    title = v.client_name;

                    return {
                        id: v.project_id,
                        title: `[${v.project_code}] ${v.project_name}`
                    };
                });
                return {
                    id: key,
                    title,
                    items
                };
            })
            .value();
        this.handleSelectProject(this.projects[0].project_id);
    },
    methods: {
        handleSubmit: function() {
            this.$emit('onSubmit', {
                hours: this.hours,
                notes: this.notes,
                projectId: this.selectedProject.project_id,
                taskId: this.selectedTask.task_id
            });
        },
        closeDialog: function() {
            console.log('closeDialog');
            this.$emit('onClose');
        },
        handleSelectProject: function(projectId) {
            this.selectedProject = this.projects.find(p => projectId === p.project_id);

            const projectTasks = this.selectedProject.tasks.map(t => {
                const task = this.tasks.find(task => t.task_id === task.task_id);

                return {
                    ...task,
                    billable_id: t.billable ? 1 : 2,
                    billable_name: t.billable ? 'Billable' : 'Non-Billable'
                };
            });

            this.projectTasks = this.$_.chain(projectTasks)
                .groupBy(t => t.billable_id)
                .map((value, key) => {
                    let title;
                    const items = value.map(t => {
                        title = t.billable_name;
                        return {
                            id: t.task_id,
                            title: t.task_name
                        };
                    });
                    return {
                        id: key,
                        title,
                        items
                    };
                })
                .value();

            this.selectedTask = projectTasks[0];
        },
        handleSelectTask: function(newTaskId) {
            this.selectedTask = this.tasks.find(t => newTaskId === t.task_id);
        },
        handleChangeHours: function(newHours) {
            const num = this.$utils.timeToNum(newHours, true);
            if (!isNaN(num)) {
                this.hours = num;
            }
        }

    },
    watch: {
        selectedTask: function(newTask) {
            console.log('selectedTask', newTask);
        }
    }
};
</script>

<style scoped lang='scss'>
@import "style";
</style>

<style module lang='scss'>
.btn {
    height: 55px !important;
}

.project-client {
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    padding: 10px 6px;

    .project {
        font-weight: 600;
        font-size: 15px;
    }

    .client {
        color: #888;
        font-size: 12px;
        margin-bottom: 3px;
    }
}

.dropdown-task {
    margin: 15px 0;
}

.task {
    padding: 10px 6px;
}


</style>
