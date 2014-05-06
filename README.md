## connect-pagination

Very simple and easy to use connect (express) middleware for parsing pagination query strings.

### Installation

    $ npm install connect-pagination

### Quick Start with Connect.js or Express.js

```js

var connect    = require('connect'),
    pagination = require('connect-pagination')

var paginationOptions = {
    pageParam: 'p'
};

connect()
    .use(pagination(options))
    .use(function (req, res) {
        res.send(req.pagination);
    });
```

### Available Options

* `pageParam` specifies the query param for the page number (defaults to `page`)
* `ippParam` specifies the query param for the number of items per page (defaults to `ipp`)
* `page` the default page number (defaults to `1`)
* `ipp` the default number of items per page (defaults to `24`)

### The `req.pagination` object

Through `req.pagination` the following object becomes available:

* `page` the current requested page number
* `ipp` the current requested number of items per page
* `optionsPresent` `true` if there are pagination request parameters
* Function `buildQuery(page, ipp)` returns a query string like `?page=4&ipp=20`
* Function `addQuery(url, page, ipp)` adds the pagination query to the url given

### Changelog

#### 1.0.5

* Fixed bug that resulted in wrong query strings.

#### 1.0.4

* Add `optionsPresent` attribute to `req.pagination` object.

#### 1.0.3

* Parse query parameters to numbers.

#### 1.0.2

* The ```pagination``` object is now attached to ```res.locals``` so that it can be used in express remplates
