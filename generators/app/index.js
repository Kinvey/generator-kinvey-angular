'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var KinveyApi = require('./mapi.js');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the mind-blowing ' + chalk.red('Kinvey') + ' bootstrapper!'
    ));

    // var prompts = [{
    //   type: 'editor',
    //   name: 'config',
    //   message: 'Enter your configuration json',
    //   default: '',
    //   store: true
    // }];

    this.log('Enter your Kinvey credentials to continue');

    var prompts = [{
      type: 'input',
      name: 'email',
      message: 'Email:',
      default: '',
      store: true
    }, {
      type: 'password',
      name: 'password', 
      message: 'Password:',
      default: ''
    }];

    return this.prompt(prompts).then(function (props) {
      //User credentials
      this.props = props;
      this.props.config = {};
      
      return KinveyApi.login(this.props.email, this.props.password);

    }.bind(this)).then(function(user){      
      //User is logged in
      this.log("logged in as " + user.email);
      return KinveyApi.apps();

    }.bind(this)).then(function(apps){
      //Apps retrieved      
      var envChoices = [];

      apps.map(function(app){ //loop through apps
        app.environments.map(function(env){   //loop through environments
          envChoices.push ({
            name : app.name + '(' + env.name + ')',
            value: env
          });  
        });
        
      });

      var envPrompt = [{
        type: 'list',
        name: 'env',
        message: 'What environment are you building this app for?',
        choices: envChoices,
        filter: function (env){
          return env;
        }
      }];

      return this.prompt(envPrompt);

    }.bind(this)).then(function(props){
      //env selected, get collections
      this.props.config.appkey = props.env.id;
      this.props.config.appsecret = props.env.appSecret;

      return KinveyApi.collections(props.env.id);

    }.bind(this)).then(function(collections){
      //Collections Retrieved
      var colPrompt = [{
        type : 'checkbox',
        name : 'collections',
        message : 'Select the collections you want to include in your app',
        choices : collections
      }];

      return this.prompt(colPrompt);

    }.bind(this)).then(function(selection){
      //User selected some collections
      var collections = selection.collections;
      this.props.config.collections = collections;

    }.bind(this));
  },

  writing: function () {

    //var config = JSON.parse(this.props.config);
    var config = this.props.config;

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


    // //setup the collections
    const collections = config.collections;

    this.log("collections: " + collections);

    for (var i=0; i<collections.length; i++){
      var collectionName = collections[i];
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
  },

  end: {
    goodbye: function(){
      console.log ("\n\nWe're done! Your app is ready to be tried out. Run " + chalk.yellow("ionic serve") + " and enjoy!\n");
    }
  }

});
