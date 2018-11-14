# SendIT
SendIT is a courier service that helps users deliver parcels to different destinations. SendIT provides courier quotes based on weight categories.

[![Build Status](https://travis-ci.com/Ibidapo/send-it.svg?branch=api-v1)](https://travis-ci.com/Ibidapo/send-it)
[![Coverage Status](https://coveralls.io/repos/github/Ibidapo/send-it/badge.svg?branch=api-v1)](https://coveralls.io/github/Ibidapo/send-it?branch=api-v1)
[![Maintainability](https://api.codeclimate.com/v1/badges/9d353faef4c2e5fe9f6a/maintainability)](https://codeclimate.com/github/Ibidapo/send-it/maintainability)

## Getting Started

### Prerequisites

These tools are required to have to application up and running

* [Node](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/)

To download dependencies 

```
npm install 
```

To start application

```
npm start
```

## User Interafce

Find below, the links to the various page for the UI

* [Home Page](https://ibidapo.github.io/send-it/UI/)
* [User Dashboard](https://ibidapo.github.io/send-it/UI/user.html)
* [Admin Dashboard](https://ibidapo.github.io/send-it/UI/admin.html)


## Deployment

API endpoint to fetch all parcels for as a User
```
https://travissend-it.herokuapp.com/api/v1/parcels
```

API endpoint to fetch a parcel, using the Parcel ID
```
https://travissend-it.herokuapp.com/api/v1/parcels/id
```

API endpoint to fetch parcels created by a  User, using the User ID
```
https://travissend-it.herokuapp.com/api/v1/users/900001/parcels
```

API endpoint to add parcels
```
https://travissend-it.herokuapp.com/api/v1/parcels
```

API endpoint to delete a parcel, using the Parcel ID
```
https://travissend-it.herokuapp.com/api/v1/parcels/100001/cancel
```


## Built With

* [Express](https://expressjs.com/) - The web framework used
* [Body-Parser](https://www.npmjs.com/package/body-parser) - JSON parser
* [Babel](https://babeljs.io/docs/en/learn/) - Transpile ES6 to ES5
* [ESLint](https://eslint.org) - Javascript Linter
* [airbnb](https://github.com/airbnb/javascript) - Javascript style guide
* [Mocha](http://mochajs.org) - Javascript test framework
* [Supertest](https://github.com/visionmedia/supertest) - Super agent driven library for testing node http servers
* [Jest](https://jestjs.io/) - Expect Assertion library for testing

## Author

**Ibidapo Rasheed** 

## License

None.

## Acknowledgments

* Hat tip to everyone who contributed to the development of the tools used
* Inspiration
* etc
