

module.exports = {
    searchRecipePage: (req, res) => {

        let query = "SELECT id_recipe,id_product FROM recipeproduct  "; // query database to get all the recipeproduct

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('search.ejs', {
                 title: " Welcome to MyFOOD | Add a new Recipe"
                , recipeproduct: result
            });
        });
    },
};