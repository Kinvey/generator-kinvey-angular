# generator-kinvey-angular
> Build a complete Kinvey AngularJS app from a configuration JSON file.

## How to Use Locally

* Install [Yeoman](http://yeoman.io) (we assume you have pre-installed [node.js](https://nodejs.org/)).
* Clone this repo and from the root folder, run `npm install` followed by `npm link`. 

```bash
#Install yeoman
npm install -g yo

#Clone the repo
git clone <repo-url>

#Install dependencies
npm install

#Install the package globally as a symlink
npm link
```

* Navigate to a folder where you'd like your new project. Call `yo kinvey-angular` to kick off a new project.

```bash
cd ~/Desktop
yo kinvey-angular
```

* You will be prompted for your Kinvey credentials. If you don't have a Kinvey account yet, please sign up for one [here](https://us1.kinvey.com). We also recommend having at least one collection in your app before walking through the next steps.

* The generator will walk you through selecting an application environment and adding some collections to your client app. Make your selections and watch as the generator spins off a new Angular app, adds views for the collections you picked and then installs the dependencies.

_Note: the tool assumes that each collection has a `name` and `description` field, and uses the values of these fields in the UI. This assumption will likely be removed in the future._

* Serve up the app you just built with `ionic serve` (this runs it in a browser, use other [ionic commands](http://ionicframework.com/getting-started/) to run it in a device)

```bash
ionic serve
```

## License

Apache-2.0 © [Tejas]()


[npm-image]: https://badge.fury.io/js/generator-kinvey-angular.svg
[npm-url]: https://npmjs.org/package/generator-kinvey-angular
[travis-image]: https://travis-ci.org//generator-kinvey-angular.svg?branch=master
[travis-url]: https://travis-ci.org//generator-kinvey-angular
[daviddm-image]: https://david-dm.org//generator-kinvey-angular.svg?theme=shields.io
[daviddm-url]: https://david-dm.org//generator-kinvey-angular
[coveralls-image]: https://coveralls.io/repos//generator-kinvey-angular/badge.svg
[coveralls-url]: https://coveralls.io/r//generator-kinvey-angular
