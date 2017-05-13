
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.index1 = function(req, res){
 res.render('viewAll', { title: 'Express' });
};