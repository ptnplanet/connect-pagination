/**
 * Created
 * User: philipp
 * Date: 30.06.13
 * Time: 16:56
 *
 * The connect-pagination middleware.
 */

'use strict';

// Node modules to load.
var querystring = require('querystring'),
    url         = require('url');

// Default options.
var opt = {},
    defaults = {
        pageParam: 'page',
        ippParam: 'ipp',
        page: 1,
        ipp: 24
    };

/**
 * Only build the query object with values that differ from the defaults.
 *
 * @param {Number} page
 * @param {Number} ipp
 * @param {Object} obj (optional)
 */
var buildQueryObject = function (page, ipp, obj) {

    var queryObj = obj || {};

    if ((page !== undefined) && (page !== opt.page)) {
        queryObj.page = page;
    }

    if ((ipp !== undefined) && (ipp !== opt.ipp)) {
        queryObj.ipp = ipp;
    }

    return queryObj;
};

/**
 * Builds the query string for the pagination-enabled url.
 *
 * @param {Number} page
 * @param {Number} ipp
 */
var buildQuery = function (page, ipp) {

    return querystring.stringify(buildQueryObject(page, ipp));
};

/**
 * Appends the pagination query string to the url given.
 *
 * @param {String} baseUrl
 * @param {Number} page
 * @param {Number} ipp
 */
var addQuery = function (baseUrl, page, ipp) {

    var parsedUrl = url.parse(baseUrl, true);
    buildQueryObject(page, ipp, parsedUrl.query);
    parsedUrl.search = querystring.stringify(parsedUrl.query);
    return url.format(parsedUrl);
};

/**
 * The pagination middleware. It will attach a `pagination` object to the request object with the following properties:
 * - page: the page requested (defaults to the page option or to 1, if no page option was given)
 * - ipp: the number of items per page (defaults to the ipp option or to 24, if no ipp option was given)
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
var paginationMiddleware = function (req, res, next) {

    req.pagination = {
        page: parseInt(req.query[opt.pageParam] || opt.page, 10),
        ipp:  parseInt(req.query[opt.ippParam]  || opt.ipp,  10),
        buildQuery: buildQuery,
        addQuery: addQuery
    };

    req.pagination.optionsPresent = ((req.query[opt.pageParam] === undefined)
            && (req.query[opt.ippParam] === undefined));

    if (res.locals !== undefined) {
        res.locals.pagination = req.pagination;
    }

    next();
};

/**
 * Configures the pagination middleware for easy use with connect/express:
 *
 * var pagination = require('connect-pagination');
 * app.use(pagination({ pageParam: 'p' });
 *
 * Available options:
 *  - pageParam: the name of the param holding the current page value (defaults to 'page')
 *  - ippParam: the name of the param holding the number of items per page (defaults to 'ipp')
 *  - page: the default page number (defaults to 1)
 *  - ipp: the default number of items per page (defaults to 24)
 *
 * @param   {Object} options (optional)
 * @returns {Function}
 */
module.exports = function (options) {

    options = options || {};

    for (var property in defaults) {
        if (defaults.hasOwnProperty(property)) {
            opt[property] = options[property] || defaults[property];
        }
    }

    return paginationMiddleware;
};
