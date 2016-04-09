/**
 * Save configuration to yo-rc.json file
 */

'use strict';

var saveConfig = function saveConfig() {
    var self = this;


    // If user chooses to use exsiting yo-rc file, then skip prompts
    if (!this.existingConfig) {
      // Create .yo-rc.json file
      this.config.set('installedMain', true);
      this.config.set(this.answers);
    } else {
      this.config.set('installedMain', true);
      this.config.set(this.answers);
    }

};

module.exports = saveConfig;
