const express = require('express')
const Project = require("../models/Project.js")
const Task = require("../models/Task.js")

const router = express.Router();

// Get all projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    
    // Get task counts for each project
    const projectsWithTaskCount = await Promise.all(
      projects.map(async (project) => {
        const taskCount = await Task.countDocuments({ projectId: project._id });
        return {
          ...project.toObject(),
          taskCount
        };
      })
    );

    res.status(200).json({
      success: true,
      count: projectsWithTaskCount.length,
      data: projectsWithTaskCount
    });
  } catch (error) {
    next(error);
  }
});

// Get single project
router.get('/:id', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Get task count for the project
    const taskCount = await Task.countDocuments({ projectId: project._id });
    const projectWithTaskCount = {
      ...project.toObject(),
      taskCount
    };
    
    res.status(200).json({
      success: true,
      data: projectWithTaskCount
    });
  } catch (error) {
    next(error);
  }
});

// Create new project
router.post('/', async (req, res, next) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || 'open' // Default status
    });
    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    next(error);
  }
});

// Update project
router.put('/:id', async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    next(error);
  }
});

// Delete project
router.delete('/:id', async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;