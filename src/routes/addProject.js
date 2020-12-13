const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Project = require('../models/Project');

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
});

const upload = multer({ storage });

router
  .get("/projects", async (req, res) => {
    const userProjects = await Project.find({ user_email: req.body.email}, (err, projects) => {
      if (err)
        res.status(500).send({
          "code": "500",
          "message": "server error"
        });
      else
        res.status(200).send(projects);
    })

  })

  .post("/projects", upload.single('archive'), async (req, res) => {

  const newProject = new Project({
    project_name: req.body.project_name,
    output_format: req.body.output_format,
    output_height: req.body.output_height,
    output_width: req.body.output_width,
    comment: req.body.comment,
    program: req.body.program,
    frame_start: req.body.frame_start,
    frame_end: req.body.frame_end,
    user_email: req.body.email,
    render_utility_id: req.body.render_utility,
    plugin_id: req.body.plugin
    // archive_id: req.file._id,
  });

  let fonts = req.body.fonts.slice(1, -1).split(",");
  for (let i = 0; i < fonts.length; i++) {
    console.log(fonts[i]);
    newProject.font_id.push(fonts[i]);
  }

  try {
    newProject.save();

    return res.status(200).send({
      "code": "200",
      "message": ""
    })
  } catch(err) {
    console.log("Project wasn't saved");
    console.log(err);
    return res.send({
      "code": "500",
      "message": "can't save project"
    })
  }

})

module.exports = router;
