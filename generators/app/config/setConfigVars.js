'use strict';

var path              = require('path'),
    setBaseConfigVars = require('./setBaseConfigVars');

var setConfigVars = function (self, cb) {

  setBaseConfigVars(self, function(){
    self.projectUrl = self.cfg.projectUrl;
    self.projectName = self.cfg.projectName;
    if(self.cfg.projectName) self.projectNameJson = self.cfg.projectName.replace(/\s/g,'');
    self.projectDescription = self.cfg.projectDescription;
    self.projectVersion = self.cfg.projectVersion;
    self.projectAuthor = self.cfg.projectAuthor;
    self.authorEmail = self.cfg.authorEmail;
    self.projectLicense = 'MIT';

    self.themeNameSpace = self.cfg.themeNameSpace;
    self.themeName = self.cfg.themeName;
    self.wpBlankTheme = self.cfg.wpBlankTheme;
    self.themeAuthor = self.cfg.projectAuthor;
    self.themeAuthorEmail = self.cfg.authorEmail;

    self.themeDir = self.cfg.themeDir;
    self.assetsDir = self.cfg.assetsDir;
    self.cssDir = self.cfg.cssDir;
    self.imgDir = self.cfg.imgDir;
    self.jsDir = self.cfg.jsDir;
    self.libDir = self.cfg.libDir;
    self.fontDir = self.cfg.fontDir;

    self.iconfontOption = self.cfg.iconfontOption;
    self.cfg.fontStyleOutputBase = '../../../../';

    self.templateOption = self.cfg.templateOption;

    switch (self.environmentOption) {
      case 'express':
        self.assetsDir = 'public';
      break;

      case 'laravel':
      case 'codeigniter':
        self.assetsDir = path.join('public', self.assetsDir);
      break;
    }

    switch (self.environmentOption){
      case 'wordpress':
        self.templateDest = path.join(self.mainDir, 'wp-content/themes', self.themeDir);
      break;

      case 'drupal':
        self.templateDest = path.join(self.mainDir, 'themes', self.themeDir);
      break;

      break;

      default:
        self.templateDest = self.mainDir;
    };

    self.cssDirPath = path.join(self.assetsDir, self.cssDir);
    self.jsDirPath = path.join(self.assetsDir, self.jsDir);
    self.imgDirPath = path.join(self.assetsDir, self.imgDir);
    self.fontDirPath = path.join(self.assetsDir, self.fontDir);
    self.cssLibDirPath = path.join(self.cssDirPath, self.libDir);
    self.jsLibDirPath = path.join(self.jsDirPath, self.libDir);

    cb();
  })

}

module.exports = setConfigVars;
