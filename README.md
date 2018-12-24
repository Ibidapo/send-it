# SendIT
SendIT is a courier service that helps users deliver parcels to different destinations. SendIT provides courier quotes based on weight categories.

[![Build Status](https://travis-ci.com/Ibidapo/send-it.svg?branch=develop)](https://travis-ci.com/Ibidapo/send-it)
[![Coverage Status](https://coveralls.io/repos/github/Ibidapo/send-it/badge.svg?branch=develop)](https://coveralls.io/github/Ibidapo/send-it?branch=develop)
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

API endpoint to fetch all parcel orders
```
https://travissend-it.herokuapp.com/api/v1/parcels
```

API endpoint to fetch a parcel order, using the Parcel ID
```
https://travissend-it.herokuapp.com/api/v1/parcels/:id
```

API endpoint to fetch parcel orders created by a  User, using the User ID
```
https://travissend-it.herokuapp.com/api/v1/users/:id/parcels
```

API endpoint to add parcels
```
https://travissend-it.herokuapp.com/api/v1/parcels
```

API endpoint to cancel a parcel order, using the Parcel ID
```
https://travissend-it.herokuapp.com/api/v1/parcels/:id/cancel
```

API endpoint to register a User
```
https://travissend-it.herokuapp.com/api/v1/auth/signup
```

API endpoint to login a User
```
https://travissend-it.herokuapp.com/api/v1/auth/login
```

API endpoint to update destination of a parcel order
```
https://travissend-it.herokuapp.com/api/v1/parcels/:id/destination
```

API endpoint to update status of a parcel order
```
https://travissend-it.herokuapp.com/api/v1/parcels/:id/status
```

API endpoint to update present location of a parcel order
```
https://travissend-it.herokuapp.com/api/v1/parcels/:id/presentLocation
```

API endpoint to update user information
```
https://travissend-it.herokuapp.com/api/v1/users
```

API endpoint to verify email for forgot password
```
https://travissend-it.herokuapp.com/api/v1/auth/forgotPassword
```

API endpoint to reset password
```
https://travissend-it.herokuapp.com/api/v1/auth/resetPassword
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
* [JWT](https://jwt.io/) - JSON Web Token for securely transmitting information between parties as a JSON object.
* [Nodemailer](https://nodemailer.com/) -  a module for Node.js applications to allow easy as cake email sending. 
* [ElephantSQL](https://www.elephantsql.com/) - PostgreSQL database hosting service.

## Author

**Ibidapo Rasheed** 

## License

None.

## Acknowledgments

* Hat tip to everyone who contributed to the development of the tools used
* Inspiration
* etc
