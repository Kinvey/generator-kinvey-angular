'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the mind-blowing ' + chalk.red('Kinvey') + ' bootstrapper!'
    ));

    var prompts = [{
      type: 'editor',
      name: 'config',
      message: 'Enter your configuration json',
      default: '',
      store: true
    }];

    // var prompts = [{
    //   type: 'input',
    //   name: 'collectionName',
    //   message: 'What is the name of your collection?',
    //   default: 'books'
    // }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      // this.log (yosay
      //   ("Config: " + props.config));
      this.props = props;
    }.bind(this));
  },

  writing: function () {

    var config = JSON.parse(this.props.config);

    //copy the static part of the template first
    this.fs.copy(
      `${this.templatePath()}/**/!(_)*`,
      this.destinationPath()    
    );


    //copy the app.js
    this.fs.copyTpl(
      this.templatePath('www/js/_app.js'),
      this.destinationPath('www/js/app.js'),
      {
        config : config
      }
    );


    //copy the index.html
    this.fs.copyTpl(
     this.templatePath('www/_index.html'),
      this.destinationPath('www/index.html'),    
      {
        config : config
      }
    );


    this.fs.copyTpl(
     this.templatePath('www/templates/_menu.html'),
      this.destinationPath('www/templates/menu.html'),    
      {
        config : config
      }
    );


    //setup the collections
    const collections = config.collections;

    //this.log("collections: " + collections);

    for (var i=0; i<collections.length; i++){
      var collection = collections[i];
      this.log("collection: " + collection);

      var collectionName = collection.name;
      this.log("processing collection: " + collectionName);
      
      this.fs.copyTpl(
        this.templatePath('www/js/controllers/_collection.js'),
        this.destinationPath(`www/js/controllers/${collectionName}.js`),
        {
          collectionName : collectionName
        }
      );

      this.fs.copyTpl(
        this.templatePath('www/templates/_collection.html'),
        this.destinationPath(`www/templates/${collectionName}.html`),
        {
          collectionName : collectionName
        }
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
