var writePackage = require('./writePackage'),
    writeConfig  = require('./writeConfig'),
    mkdirp       = require('mkdirp');

'use strict';

var setConfigFiles = function(self, cb){
  setyorc(self, function(){
    setconfig(self, function(){
      setpackage(self, function(){
        cb();
      });
    });
  });
}


// saving yo-rc file
function setyorc(self, cb){
  if(self.environmentOption !== 'wordpress'){
    // Delete all worpress references
    self.config.delete('wpBlankTheme');
    self.config.delete('removeDefaultThemes');
    self.config.delete('wordpressVersion');

    delete self.cfg['wpBlankTheme'];
    delete self.cfg['removeDefaultThemes'];
    delete self.cfg['wordpressVersion'];
  }

  if(self.environmentOption !== 'wordpress' && self.environmentOption !== 'drupal' ){
    // Delete all theme references
    self.config.delete('themeName');
    self.config.delete('themeNameSpace');
    self.config.delete('themeDir');

    delete self.cfg['themeName'];
    delete self.cfg['themeNameSpace'];
    delete self.cfg['themeDir'];
  }

  if(self.environmentOption !== 'drupal'){
    self.config.delete('drupalVersion');

    delete self.cfg['drupalVersion'];
  }

  if(self.environmentOption !== 'laravel'){
    self.config.delete('laravelVersion');

    delete self.cfg['laravelVersion'];
  }

  if(self.environmentOption !== 'codeigniter'){
    self.config.delete('codeigniterVersion');

    delete self.cfg['codeigniterVersion'];
  }

  if(self.environmentOption === 'static'){
    self.config.delete('environmentName');
    self.config.delete('laravelVersion');
    self.config.delete('drupalVersion');
    self.config.delete('codeigniterVersion');

    delete self.cfg['environmentName'];
    delete self.cfg['laravelVersion'];
    delete self.cfg['drupalVersion'];
    delete self.cfg['codeigniterVersion'];
  }

  // console.log(self.cfg)
  self.config.set(self.cfg);

  cb();
}

// saving config file
function setconfig(self, cb){
  var configFile  = './config.json',
      destRoot    = self.destinationRoot()
  if(self.gulpDirOption) {
    mkdirp(destRoot + '/gulp');
    configFile  = './gulp/config.json'
  };
  writeConfig(configFile, self);

  cb();
}

// setting the package
function setpackage(self, cb){
  var packageFile   = './package.json',
      destRoot      = self.destinationRoot()
  if(self.gulpDirOption) {
    mkdirp(destRoot + '/gulp');
    packageFile = './gulp/package.json'
  };
  writePackage(packageFile, self);

  cb();
}

module.exports = setConfigFiles;
