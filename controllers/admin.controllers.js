const Sequelize = require("sequelize");
const Joi = require("joi");
const AWS = require("aws-sdk");
const {
  User: UserModel,
  CanvasProperties: CanvasPropertiesModel,
} = require("../models");
const dotenv = require("dotenv");
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  s3ForcePathStyle: true,
});

const canvasPropertiesSchema = Joi.object({
  name: Joi.required(),
  size_X: Joi.required(),
  size_Y: Joi.required(),
  window_X: Joi.required(),
  window_Y: Joi.required(),
  x_split: Joi.required(),
  y_split: Joi.required(),
  zoom: Joi.required(),
});

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["name", "ASC"]],
    });

    res.status(200).json({
      status: 200,
      message: "List of users",
      users,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

const getDataFromS3 = async (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
  };
  let bucketList = [];
  s3.listObjects(params, (err, data) => {
    if (err) {
      res.status(500).json({
        status: 500,
        message: err,
      });
    } else {
      data.Contents.forEach((object) => {
        bucketList.push(object.Key);
      });
    }
    res.status(200).json({
      status: 200,
      message: "List of files inside AWS S3 Bucket",
      bucketList,
    });
  });
};

const getCanvasProperties = async (req, res) => {
  try {
    const canvasProperties = await CanvasPropertiesModel.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["id", "ASC"]],
    });

    res.status(200).json({
      status: 200,
      message: "List of canvas properties",
      canvasProperties,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

const addCanvasProperties = async (req, res) => {
  try {
    const { error, value } = canvasPropertiesSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const canvasProperties = await CanvasPropertiesModel.create(value);

    if (!canvasProperties) {
      return res.status(500).json({ error: "Something went wrong!!" });
    }

    return res.status(201).json({
      status: 201,
      message: "Canvas Properties Added",
      canvasProperties,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
};
module.exports = {
  getAllUsers,
  getDataFromS3,
  getCanvasProperties,
  addCanvasProperties,
};
