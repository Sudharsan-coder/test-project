const routerController = require("../controllers/ratings.controller");
const router = require("express").Router();
const util = require("../util/index");

router.get("/weekly/:userId", async (req, res) => {
  const datas = await routerController.getRatingByUserId(req.params.userId);
  let ans = [];
  for (let data of datas) {
    const tempWeekNum = data.weekNum;
    let obj = {};
    delete data.dataValues.weekNum;
    obj[
      util.getStartDateFromWeekNumber(new Date().getFullYear(), tempWeekNum)
    ] = data;
    ans.push(obj);
  }
  ans.reverse();
  res.status(200).json({
    status: 200,
    message: "get all weekly rating by user id",
    data: ans,
  });
});

router.get("/monthly/:userId", async (req, res) => {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let ans = [];
  for (let i = 1; i < 13; i++) {
    const data = await routerController.getMonthlyRatingByUserId(
      req.params.userId,
      i,
      2023
    );
    if (data[0].dataValues.teamPlay) {
      const obj = {};
      obj[month[i - 1]] = data[0];
      ans.push(obj);
    }
  }
  res.status(200).json({
    status: 200,
    message: "get all monthly rating by user id",
    data: ans,
  });
});
router.get("/yearly/:id", async (req, res) => {
  const datas = await routerController.getYearlyRatingByUserId(req.params.id);
  let ans = [];
  for (let data of datas) {
    let obj = {};
    delete data?.dataValues?.year;
    const tempyear = data.year;
    obj[tempyear] = data;
    ans.push(obj);
  }
  res
    .status(200)
    .json({
      status: 200,
      message: "get the yearly average by userId",
      data: ans,
    });
});

router.post("/create", async (req, res) => {
  const data = await routerController.createRating(
    req.body.teamPlay,
    req.body.attitude,
    req.body.technicalExpertise,
    req.body.codingSkills,
    req.body.overAllScore,
    util.getWeekNumber(),
    req.body.userId
  );
  res.status(200).json({
    status: 200,
    message: "created rating",
    data: data,
  });
});

router.get("/allAvaliableYears", async (req, res) => {
  const data = await routerController.getYears();
  let ans = [];
  for (let d of data) ans.push(d.year);
  res
    .status(200)
    .json({ status: 200, mesage: "all avaliable year in db", data: ans });
});

router.post("/update", async (req, res) => {
  const data = await routerController.updateRating(
    req.body.teamPlay,
    req.body.attitude,
    req.body.technicalExpertise,
    req.body.codingSkills,
    req.body.overAllScore,
    req.body.userId,
    req.body.weekNum
  );
  res.status(200).json({
    status: 200,
    message: "update rating by user id and week num",
    data: data,
  });
});

module.exports = router;
