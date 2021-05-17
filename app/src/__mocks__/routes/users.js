import moment from 'moment';
import users from '@/__mocks__/responses/users';
import userProjectTasks from '@/__mocks__/responses/member_project_tasks.json';
import projects from '@/__mocks__/responses/projects.json';
import tasks from '@/__mocks__/responses/tasks.json';
import clients from '@/__mocks__/responses/clients.json';


const formatDate = 'YYYY-MM-DD';

export const Users = {
    create(newUser) {
        try {
            users.push({ ...newUser, id: Math.floor(Math.random() * 1000) + 1 });
            return true;
        } catch (e) {
            console.error('Cannot create user', e);
        }
        return false;
    },
    getUsers() {
        return users;
    },
    getUser(userId) {
        return users.find(u => u.user_id === userId);
    },
    getUserTasks(userId, startDate, endDate) {
        const user = users.find(u => u.user_id === userId);
        if (user) {
            let userTasks = userProjectTasks.filter(task => {
                if(task.user_id !== userId)
                    return false;

                const startAt = moment(task.start_at, formatDate).startOf('day');
                const startInterval = moment(startDate, formatDate).startOf('day');
                if (endDate) {
                    const endInterval = moment(endDate, formatDate).startOf('day');
                    return startAt.isBetween(startInterval, endInterval, undefined, '[]');
                }
                return startInterval.diff(startAt, 'd') === 0;
            });
            userTasks = userTasks.map(ut => {
                const project = projects.find(p => p.project_id === ut.project_id);
                const task = tasks.find(t => t.task_id === ut.task_id);
                const client = clients.find(c => c.client_id === project.client_id);
                return {
                    ...task,
                    ...project,
                    ...client,
                    ...ut
                };
            });
            return userTasks;
        }
        return null;
    }
};
