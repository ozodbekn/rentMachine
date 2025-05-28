const router = require("express").Router();
const categoryRouter = require("./category.routes.js");
const regionRouter = require("./region.routes.js");
const districtRouter = require("./district.routes.js");
const statusRouter = require("./status.routes.js");
const comissionRouter = require("./comission.routes.js");
const userRouter = require("./users.routes.js");
const userAddressRouter = require("./userAddress.routes.js");

router.use("/category", categoryRouter);
router.use("/region", regionRouter);
router.use("/district", districtRouter);
router.use("/status", statusRouter);
router.use("/comission", comissionRouter);
router.use("/users", userRouter);
router.use("/address", userAddressRouter);

module.exports = router;
