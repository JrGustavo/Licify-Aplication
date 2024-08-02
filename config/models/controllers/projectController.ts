const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    const { projectName, startDate, endDate, items } = req.body;
    const images = req.files.map(file => file.path);

    try {
        const newProject = new Project({
            projectName,
            startDate,
            endDate,
            images,
            items,
            createdBy: req.user.id
        });

        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('createdBy', ['name', 'email']);
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.applyToProject = async (req, res) => {
    const { projectId, items } = req.body;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        project.items = project.items.map(item => {
            const newItem = items.find(i => i.name === item.name);
            return newItem ? { ...item._doc, proposedUnitValue: newItem.proposedUnitValue } : item;
        });

        await project.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
