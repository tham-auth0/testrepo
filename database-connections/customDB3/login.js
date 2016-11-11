function login(email, password, callback) {
  mongo('mongodb://mlabcustomdbuser:qwe123qwe@ds057066.mlab.com:57066/mlabcustomdb', function (db) {
    var users = db.collection('users');
    users.findOne({ email: email }, function(err, user) {

      if (err) return callback(err);

      if (!user) return callback(new WrongUsernameOrPasswordError(email));
      
      if (password !== user.password) {
        return callback();
      }
      
      callback(null, {
        user_id: user._id.toString(),
        nickname: user.nickname,
        email: user.email
      });

    });
  });
}
