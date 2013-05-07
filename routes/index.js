
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.layers = function(req, res){
  res.render('layers', {});
};