import projects from '@/__mocks__/responses/projects';

export const Projects = {
    create(newProject) {
        try {
            projects.push({ ...newProject, id: Math.floor(Math.random() * 1000) + 1 });
            return true;
        } catch (e) {
            console.error('Error when creating new project', e);
        }
        return false;
    },
    fetchOne(id) {
        const project = projects.find(p => p.id === id);
        if (project) {
            const projectTasks = [];
            const teamMembers = [];
            const teamMemberTasks = [];
            return project;
        }

        return null;
    }
};
