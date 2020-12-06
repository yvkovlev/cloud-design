const router = require('express').Router();
const Font = require('../models/Font');
const Plugin = require('../models/Plugin');
const Project = require('../models/Project');
const RenderUtility = require('../models/RenderUtility');
const Status = require('../models/Status');

router.post("/add-project", async (req, res) => {

  const newStatus = new Status({});

  const newProject = new Project({
    project_name: req.body.project_name,
    output_format: req.body.output_format,
    output_height: req.body.output_height,
    output_width: req.body.output_width,
    comment: req.body.comment,
    program: req.body.program,
    frame_start: req.body.frame_start,
    frame_end: req.body.frame_end,
    status_id: newStatus._id
  });

  const newPlugin = new Plugin({
    plugin_name: req.body.plugin,
    project_id: newProject._id
  });

  const newRenderUtility = new RenderUtility({
    renderutility_name: req.body.render_utility,
    project_id: newProject._id
  });

  const newFont = new Font({
    font_name: req.body.fonts,
    project_id: newProject._id
  })

  try {
    newStatus.save();
  } catch(err) {
    console.log("Status wasn't saved");
    console.log(err);
    return res.send({
      "code": "500",
      "message": "can't save status"
    })
  }

  try {
    newProject.save();
  } catch(err) {
    console.log("Project wasn't saved");
    console.log(err);
    return res.send({
      "code": "500",
      "message": "can't save project"
    })
  }

  try {
    newRenderUtility.save();
  } catch(err) {
    console.log("Render utility wasn't saved");
    console.log(err);
    return res.send({
      "code": "500",
      "message": "can't save render utility"
    })
  }

  try {
    newPlugin.save();
  } catch(err) {
    console.log("Plugin wasn't saved");
    console.log(err);
    return res.send({
      "code": "500",
      "message": "can't save plugin"
    })
  }

  try {
    newFont.save();
  } catch(err) {
    console.log("Font wasn't saved");
    console.log(err);
    return res.send({
      "code": "500",
      "message": "can't save font"
    })
  }

  return res.status(200).send({
    "code": "200",
    "message": ""
  })

})

module.exports = router;
