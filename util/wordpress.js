var wpRepo = "git://github.com/WordPress/WordPress.git";


function getCurrentVersion(callback) {
	var latestVersion = '3.8';
	require('simple-git')().listRemote('--tags '+ wordpressRepo, function(err, tagsList) {
		if (err) return callback(err, latestVersion);
		tagList = ('' + tagsList).split('\n');
		tagList.pop();
		lastTag = /\d\.\d(\.\d)?/ig.exec(tagList.pop());
		if (lastTag !== null) {
			latestVersion = lastTag[0];
		}
		callback(null, latestVersion);
	});
};

module.exports = {
  getCurrentVersion: getCurrentVersion
}
