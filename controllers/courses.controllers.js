let Course = require("../modules/course.module");

const { validationResult } = require("express-validator");//check 
const httpStatusText = require("../utils/http.Status.Text");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");
class Allcontrollers {
  GetAllcourses = asyncWrapper(async (req, res) => {
    const query = req.query;

    let page = query.page || 1;
    let limit = query.limit || 10;
    let skip = (page - 1) * limit;

    const courses = await Course.find({}, { __v: false })
      .limit(limit)
      .skip(skip);
    res.json({ status: httpStatusText.SUCESS, data: { courses } });
});
  GetCourse = asyncWrapper(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
      const err = appError.create("course not found", 404, httpStatusText.FAIL);
      return next(err);
    } else {
      return res
        .status(200)
        .json({ status: httpStatusText.SUCESS, data: { course } });
    }
  });
  AddCourse = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = appError.create(errors.array(), 404, httpStatusText.FAIL);
      return next(err);
    }
    const newCourse = new Course(req.body);
    await newCourse.save();
    const courses = await Course.find({ _id: newCourse._id }, { __v: false });
    res.status(201).json({ status: httpStatusText.SUCESS, data: courses });
  });
  UpdateCourse = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      //return res.json({status:httpStatusText.ERROR ,message:errors.array()})
      const err = appError.create(
        "fields are require",
        400,
        httpStatusText.FAIL
      );

      return next(err);
    }
    const cc = await Course.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    const courseup = await Course.findById(req.params.id);
    if (!courseup) {
      return next(
        appError.create("course not found", 404, httpStatusText.FAIL)
      );
    }
    return res
      .status(201)
      .json({ status: httpStatusText.SUCESS, data: { courseup } });
  });

  DeleteCourse = asyncWrapper(async (req, res, next) => {
    const DeleteC = await Course.findByIdAndDelete(req.params.id);
    if (!DeleteC) {
      const err = appError.create("course not found", 404, httpStatusText.FAIL);
      return next(err);
    }
    res.json({ status: httpStatusText.SUCESS, data: null });
  })
}
module.exports = Allcontrollers;
