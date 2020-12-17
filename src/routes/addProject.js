const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Font = require('../models/Font');
const Format = require('../models/Format');
const Plugin = require('../models/Plugin');
const Project = require('../models/Project');
const Program = require('../models/Program');
const RenderUtility = require('../models/RenderUtility');

const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/cloud-designDB',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = req.body.fileName + path.extname(file.originalname);
      const fileInfo = {
        filename: filename,
        bucketName: 'contents',
        metadata: req.body,
      };
      resolve(fileInfo);
    });
  },
})
const upload = multer({ storage });

router
  .get("/projects", async (req, res) => {
    const userProjects = await Project.find({ user_email: req.query.email }, (err, projects) => {
      if (err)
        res.status(500).send({
          "code": 500,
          "message": "server error"
        });
      else
        res.status(200).send(projects);
    })

  })

  .post("/projects", upload.single('archive'), async (req, res) => {

    const currentRenderUtility = await RenderUtility.findOne({ id: req.body.render_utility }).lean();
    const currentPlugin = await Plugin.findOne({ id: req.body.plugin }).lean();
    const currentProgram = await Program.findOne({ id: req.body.program }).lean();
    const currentFormat = await Format.findOne({ id: req.body.output_format }).lean();

    const newProject = new Project({
      project_name: req.body.project_name,
      output_format: currentFormat.name,
      output_height: req.body.output_height,
      output_width: req.body.output_width,
      comment: req.body.comment,
      program: currentProgram.name,
      frame_start: req.body.frame_start,
      frame_end: req.body.frame_end,
      user_email: req.body.email,
      render_utility: currentRenderUtility.name,
      plugin: currentPlugin.name,
      // archive_id: req.file._id,
    });

    let fonts = req.body.fonts;
    for (let i = 0; i < fonts.length; i++) {
      let currentFont = await Font.findOne({ id: fonts[i] }).lean();
      newProject.fonts.push(currentFont.name);
    }

    try {
      newProject.save();

      return res.status(200).send({
        "code": 200,
        "message": ""
      })
    } catch(err) {
      console.log("Project wasn't saved");
      console.log(err);
      return res.send({
        "code": 500,
        "message": "can't save project"
      })
    }

  })

module.exports = router;
