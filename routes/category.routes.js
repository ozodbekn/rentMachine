const {
  addCategory,
  getAllCategorys,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,

} = require("../controllers/category.controller");

const router = require("express").Router();

router.post("/", addCategory);
router.get("/", getAllCategorys);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategoryById);
router.delete("/:id", deleteCategoryById);


module.exports = router;
