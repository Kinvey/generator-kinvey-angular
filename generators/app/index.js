'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the mind-blowing ' + chalk.red('generator-kinvey-builder') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'collectionName',
      message: 'What is the name of your collection?',
      default: 'books'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    const collectionName = this.props.collectionName;

    this.fs.copyTpl(
      `${this.templatePath()}/**/!(_)*`,
      this.destinationPath(),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('js/controllers/_collection.js'),
      this.destinationPath(`js/controllers/${collectionName}.js`),
      this.props
    );
  },

  install: function () {
    this.installDependencies();
  }
});
