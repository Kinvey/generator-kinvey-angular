# generator-kinvey-angular
> Build a complete AngularJS app connected to your Kinvey backend. 

## How to Use Locally

* Install [Yeoman](http://yeoman.io) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
#Install yeoman
npm install -g yo
```

* Install ionic. If you have it already, skip this step. 

```bash
#Install ionic
npm install -g ionic
```

* Clone this repo. From the root folder, run `npm install` followed by `npm link`. 

```bash
#Clone the repo
git clone <repo-url>

#Install dependencies
npm install

#Install the package globally as a symlink
npm link
```

* Navigate to a folder where you'd like your new project (this should be different from the folder where you cloned this generator). Call `yo kinvey-angular` to kick off a new project.

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

Copyright (c) 2016 Kinvey, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

[npm-image]: https://badge.fury.io/js/generator-kinvey-angular.svg
[npm-url]: https://npmjs.org/package/generator-kinvey-angular
[travis-image]: https://travis-ci.org//generator-kinvey-angular.svg?branch=master
[travis-url]: https://travis-ci.org//generator-kinvey-angular
[daviddm-image]: https://david-dm.org//generator-kinvey-angular.svg?theme=shields.io
[daviddm-url]: https://david-dm.org//generator-kinvey-angular
[coveralls-image]: https://coveralls.io/repos//generator-kinvey-angular/badge.svg
[coveralls-url]: https://coveralls.io/r//generator-kinvey-angular
