const Category = require("../models/Category");
const validator = require("express-validator");
const errorMessage = require("../helper/errorMessage");

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        return errorMessage(res, error, 400);
    };
}

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({ status: { $ne: "deleted" } }); //.select("-status");
        res.status(200).json(categories);
    } catch (error) {
        return errorMessage(res, error);
    };
}

exports.addCategory = async (req, res) => {
    try {
        const { title, status, description } = req.body;

        // field validation
        const validationErr = validator.validationResult(req);
        if (validationErr?.errors?.length) {
            return errorMessage(res, validationErr.errors, 400)
        };

        // check if exists
        const categoryExists = await Category.exists({ title: title });
        if (categoryExists) {
            return errorMessage(res, "Category already exists!", 400);
        }

        // save to DB
        const category = new Category({
            title,
            description,
            status,
        });
        const addedCategory = await category.save({ new: true });
        console.log("addCategory= ", addedCategory)
        res.status(200).send("Successfully saved to DB");

    } catch (error) {
        return errorMessage(res, error)
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { title, status, description, _id } = req.body;

        // field validation
        const validationErr = validator.validationResult(req);
        if (validationErr.errors.length) {
            return errorMessage(res, validationErr.errors, 400);
        };

        // update category
        const updatedCategory = await Category.findByIdAndUpdate(_id, {
            title,
            status: status || "updated",
            dateUpdated: Date.now(),
            description
        }, { new: true, runValidators: true });
        console.log("updatedCategory= ", updatedCategory);
        if (!updatedCategory) {
            return errorMessage(res, "wrong request!", 400)
        }
        res.status(200).send("Category updated.");

    } catch (error) {
        return errorMessage(res, error);
    };
};

exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, {
            status: "deleted",
            dateDeleted: Date.now()
        });
        res.status(200).send(`Category ${req.params.id} deleted.`);
    } catch (error) {
        return errorMessage(res, error);
    };
};

exports.destroyCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).send("Category is completely deleted from DB");
    } catch (error) {
        return errorMessage(res, error);
    }
};