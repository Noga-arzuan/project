const fs = require('fs');

module.exports = {
    addRecipePage: (req, res) => {
        res.render('add-recipe.ejs', {
            title:" Welcome to MyFOOD | Add a new Recipe"
            , message: ''
        });
},
    addRecipe: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let name = req.body.name;
       
    
        let product_1 = req.body.product_1;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = username + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM `recipe_` WHERE user_name = '" + username + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Username already exists';
                res.render('add-recipe.ejs', {
                    message,
                    title: " Welcome to MyFOOD | Add a new Recipe"
                });
    } else {
    // check the filetype before uploading it
    if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
        // upload the file to the /public/assets/img directory
        uploadedFile.mv(`public/assets/img/${image_name}`, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            // send the recipe details to the database
            let query = "INSERT INTO `recipe_`(name,kind,product_1) VALUES ('" + name + "', '" + product_1 + "', '" + kind + "' )";

            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        });
    } else {
        message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
        res.render('add-recipe.ejs', {
            message,
            title: : " Welcome to MyFOOD | Add a new Recipe"
                    });
}
            }
        });
    },
editRecipePage: (req, res) => {
    let recipeId = req.params.id;
    let query = "SELECT * FROM `recipe_` WHERE id = '" + recipeId + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('edit-recipe.ejs', {
            title:" Edit Recipe"
            , Recipe: result[0]
            , message: ''
        });
    });
},
    editRecipe: (req, res) => {
        let recipeId = req.params.id;
        let name = req.body.name;
        let kind = req.body.kind;
        let product_1 = req.body.product_1;
        let number = req.body.number;

        let query = "UPDATE `recipe_` SET `name` = '" + name + "', `kind` = '" + kind + "', `product_1` = '" + product_1 + "', `number` = '" + number + "' WHERE `recipe_`.`id` = '" + recipeId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
        deleteRecipe: (req, res) => {
            let recipeId = req.params.id;
            let getImageQuery = 'SELECT image from `recipe_` WHERE id = "' + recipeId + '"';
            let deleteUserQuery = 'DELETE FROM recipe_ WHERE id = "' + recipeId + '"';

            db.query(getImageQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }

                let image = result[0].image;

                fs.unlink(`public/assets/img/${image}`, (err) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    db.query(deleteUserQuery, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
                });
            });
        }
};