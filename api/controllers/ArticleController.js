/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //SHOW ARTICLE
	list: function (req, res) {
    Article.find({}).exec(function(err, articles) {
      if(err){
        res.send(500, { error: "Cant find articles in database"})
      }
      res.view('articles/list', {article:articles});
    });  
  },

  //SHOW NEW CONTROLLER
  new: function (req, res) {
    res.view('articles/new')
  },

  //CREATE CONTROLLER
  create: function (req, res) {
    var title = req.body.title;
    var body = req.body.body;
    
    if(body.length > 0 && title.length > 0){
      Article.create(
        {
          title: title, 
          body: body
        })
        .exec(function(err) {
          if(err){
            res.send(500,
              {error: 'Could not create article'}
            );
          }
          res.redirect('/article/list');
        });
      }else{
         res.redirect('/article/new');
      }
  },

  //DELETE CONTROLLER
  delete: function(req, res) {
    Article.destroy({
      id: req.params.id
    })
    .exec(function(err) {
      if(err){
        res.send(500,
           {error: 'Could not delete article'}
        );
      }
      res.redirect('/article/list');
    });
    return false;
  },

  //EDIT CONTROLLER
  edit: function(req, res) {
    Article.findOne({ 
      id: req.params.id
    })
    .exec(function(err, foundArticle) {
      if(err){
        res.send(500,
           {error: 'Cannot find article with the given id : '+id}
        );
      }
      res.view('articles/edit', { foundArticle : foundArticle});
    });
  },

  //UPDATE CONTROLLER
  update: function (req, res) {
    var title = req.body.title;
    var body = req.body.body;
    
    if(body.length > 0 && title.length > 0){
      Article.update({id: req.params.id},
        {
          title: title, 
          body: body
        })
        .exec(function(err) {
          if(err){
            res.send(500,
              {error: 'Could not update article'}
            );
          }
          res.redirect('/article/list');
        });
      }else{
         res.redirect('/article/edit/'+req.params.id);
      }
  }
};

