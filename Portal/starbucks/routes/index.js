
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.index1 = function(req, res){
 res.render('viewAll', { title: 'Express' });
};

exports.index2 = function(req, res){
  res.render('viewAll1', { title: 'Express' });
};

exports.index3 = function(req, res){
  res.render('update', { title: 'Express' });
};