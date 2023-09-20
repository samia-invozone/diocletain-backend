const Sequelize = require("sequelize");
const AWS = require("aws-sdk");
const { User: UserModel } = require("../models");
const dotenv = require("dotenv");
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  s3ForcePathStyle: true,
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
module.exports = { getAllUsers, getDataFromS3 };
