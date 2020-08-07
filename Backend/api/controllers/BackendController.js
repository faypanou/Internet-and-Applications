'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');


  // ----- first query ------
  // input max 5 ασθένειες και μια χρονική περίοδο και output το πλήθος των άρθρων για κάθε ασθένεια στη περίοδο αυτή

exports.articles = function(req, res) {
  //console.log("here",{$or: [{title:  {$regex:".*"+req.params.virus+".*"}}, {abstract: {$regex:".*"+req.params.virus+".*"}}]})
  Task.countDocuments({$and: [{$or: [{title:  {$regex:".*"+req.params.virus+".*", $options: "i"}}, {abstract: {$regex:".*"+req.params.virus+".*",$options: "i"}}]},
  {publish_time: {$gte: ""+req.params.from+"", $lte: ""+req.params.tο+""}}]},
//console.log(new Date( req.params.from))
  function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

// ----- second query -----
// εμφάνιση του έτους με τα περισσότερα άρθρα για τη συγκεκριμένη ασθένεια (input)

exports.year = function(req, res) {
Task.aggregate([{$match: {$or: [{title:  {$regex:".*"+req.params.input+".*", $options: "i"}}, {abstract: {$regex:".*"+req.params.input+".*", $options: "i"}}]}},
{"$group":{"_id":{"$substr":["$publish_time", 0, 4]},"count":{"$sum" : 1}}}, {"$sort": {"count":-1}}],
//{"$group": { _id: {$year : "publish_time"}}, "count":{$sum:1}}, {$sort: {_id:-1}}, {$limit: 1},
function( err, task) {
  var mYearCount = task[0].count; 
  var result = {}
  for (var y of task){
    if(y.count < mYearCount)
      break
    result[y._id] = y.count
  }
  if (err)
    res.send(err);
  res.json(result);
}); //}]);
};
 
// ----- thierd query------
//  histogram

exports.histog= function(req, res) {
  Task.aggregate([{$match: {$or: [{title:  {$regex:".*"+req.params.input+".*", $options: "i"}}, {abstract: {$regex:".*"+req.params.input+".*", $options: "i"}}]}},
  {"$group":{"_id":{"$substr":["$publish_time", 0, 4]},"y":{"$sum" : 1}}}, {'$sort':{"_id":1}}],
  function( err, task) {
    var result = []
    for(var t of task){
      var d = {}
      if(t._id ==="")
        continue
      d['label'] = t._id
      d['y'] = t.y
      result.push(d)
    }
    if (err)
      res.send(err);
  res.json(result);
});
};
