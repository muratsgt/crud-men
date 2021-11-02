const Category = require("../models/Category");
const validator = require("express-validator");


exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        return res
            .status(400)
            .json({ errors: [error] });
    };
}

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({ status: { $ne: "deleted" } }); //.select("-status");
        res.status(200).json(categories);
    } catch (error) {
        return res
            .status(400)
            .json({ errors: error });
    };
}

exports.addCategory = async (req, res) => {
    try {
        const { title, status, dateCreated, description } = req.body;

        // field validation
        const validationErr = validator.validationResult(req);
        if (validationErr?.errors?.length > 0) {
            return res
                .status(400)
                .json(validationErr);
        };

        // check if exists
        const categoryExists = await Category.exists({ title: title });
        if (categoryExists) {
            return res
                .status(400)
                .json({ errors: [{ message: "Category already exists!" }] });
        }

        // save to DB
        const category = new Category({
            title,
            description,
            status,
            dateCreated,
        });
        const addedCategory = await category.save({ new: true });
        console.log("addCategory= ", addedCategory)
        res.status(200).send("Successfully saved to DB");

    } catch (error) {
        return res.status(500).json({ errors: error });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { title, status, description, _id } = req.body;

        // field validation
        const validationErr = validator.validationResult(req);
        if (validationErr.errors.length > 0) {
            return res
                .status(400)
                .json(validationErr);
        };

        // update category
        const updatedCategory = await Category.findByIdAndUpdate(_id, {
            title,
            status: status || "updated",
            dateUpdated: Date.now(),
            description
        }, { new: true, runValidators: true });
        console.log("updatedCategory= ", updatedCategory);

        res.status(200).send("Category updated.");

    } catch (error) {
        return res
            .status(500)
            .json({ errors: error });
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
        return res
            .status(500)
            .json({ errors: error });
    };
};

exports.destroyCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).send("Category is completely deleted from DB");
    } catch (error) {
        return res.status(500).json(error);
    }
};