connect-pagination

Very simple and easy to use connect (express) middleware for parsing pagination query strings.

## Installation

    $ npm install connect-pagination

## Quick Start

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

## Available Options

    * `pageParam` specifies the query param for the page number (defaults to `page`)
    * `ippParam` specifies the query param for the number of items per page (defaults to `ipp`)
    * `page` the default page number (defaults to `1`)
    * `ipp` the default number of items per page (defaults to `24`)

## `req.pagination`

Through `req.pagination` the following object becomes available:

    * `page` the current requested page number
    * `ipp` the current requested number of items per page
    * Function `buildQuery(page, ipp)` returns a query string like `?page=4&ipp=20`
    * Function `addQuery(url, page, ipp)` adds the pagination query to the url given
