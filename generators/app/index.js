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
      this.log("Logged in as " + user.email);
      return KinveyApi.apps();

    }.bind(this)).then(function(apps){
      //Apps retrieved      
      var envChoices = [];

      apps.map(function(app){ //loop through apps
        app.environments.map(function(env){   //loop through environments
          envChoices.push ({
            name : app.name + '(' + env.name + ')',
            value: {
             app: app,
             env: env 
            }
          });  
        });
        
      });

      var envPrompt = [{
        type: 'list',
        name: 'environment',
        message: 'What environment are you building this app for?',
        choices: envChoices,
        store: true,
        filter: function (selection){
          return selection;
        }
      }];

      return this.prompt(envPrompt);

    }.bind(this)).then(function(props){
      //env selected, get collections
      
      this.props.config.app = props.environment.app;
      this.props.config.env = props.environment.env;
      
      return KinveyApi.collections(props.environment.env.id);

    }.bind(this)).then(function(collections){
      //Collections Retrieved
      const reserved = ['user', '_blob'];
      collections = collections.filter(function(collection){
        return reserved.indexOf(collection.name) < 0;
      });

      this.props.allCollections = collections;

      var colPrompt = [{
        type : 'checkbox',
        name : 'collections',
        message : 'Select the collections you want to include in your app as views.',
        choices : collections
      }];

      return this.prompt(colPrompt);

    }.bind(this)).then(function(selection){
      //User selected some collections
      var collections = selection.collections;
      this.props.config.collections = collections;
      
      const noSelection = '<No selection>';
      var skinChoices = [noSelection];
      
      //filter out the selected collections
      this.props.allCollections.map(function(collection){      
        if (collections.indexOf(collection.name) < 0){
          skinChoices.push(collection);
        }          
      });

      var skinPrompt = [{
        type: 'list',
        name: 'skin',
        message: 'Do you have a collection that skins the app? If you do, select it here. If not, enter <No Selection>.',
        choices: skinChoices,
        filter: function (selection){
          return selection;
        }
      }];

      return this.prompt(skinPrompt);
    }.bind(this)).then(function(skinSelection){
      var skin = skinSelection.skin;
      if (skin !== '<No Selection>'){
        this.props.config.skin = skinSelection.skin;
        this.props.config.collections
      }
      
    }.bind(this)).catch(function(error){
      this.log("Something bad happened.\n" + error);
      
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

    this.fs.copyTpl(
      this.templatePath('www/js/_controllers.js'),
      this.destinationPath(`www/js/controllers.js`),
      {
        config : config
      }
    );        


    this.log("collections: " + collections);
    this.log("skin: " + config.skin);

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
