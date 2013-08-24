/**
 * uptodate
 * Keeps the timestamps on your webpage up to date.
 * http://prezjordan.github.io/uptodate
 *
 * Copyright 2013 Jordan Scales (http://jordanscales.com)
 * Released under the MIT license
 * See LICENSE.txt
 */

/*jslint browser: true, evil: true, sloppy: true, vars: true,
         indent: 2, maxerr: 20, maxlen: 105, plusplus: true */

/**
 * time_ago_in_words method based on ActionView's helper of the same name
 *   See the following for more information:
 *   http://api.rubyonrails.org/classes/ActionView/Helpers/DateHelper.html#method-i-time_ago_in_words
 * This has been heavily modified to accomodate minutes, hours, and days only.
 *
 * Feel free to send this output to other functions. For example:
 *   uptodate({ formatter: function(ts) { return time_ago_in_words(ts).toLowerCase() }; });
*/
function time_ago_in_words(ts) {
  // fetching a `from` and `to` time to work with deltas
  var from = new Date(ts);
  var to   = new Date();

  // the distance (in seconds) with decimals (to match Ruby's `Time`)
  var distance = Math.abs(to - from) / 1000;

  // rounding off the distance in minutes and in seconds
  var distance_in_minutes = Math.round(distance / 60);
  var distance_in_hours   = Math.round(distance_in_minutes / 60);
  var result;

  // generate the output (no i18n for now)
  if (distance_in_minutes < 1) {
    result = 'Less than one minute ago';
  } else if (distance_in_minutes < 45) {
    result = distance_in_minutes + ' minute' + (distance_in_minutes === 1 ? ' ' : 's ') + 'ago';
  } else if (distance_in_minutes < 90) {
    // Between 45 and 90 minutes is considered "About one hour ago"
    result = 'About one hour ago';
  } else if (distance_in_hours < 24) {
    var hours = Math.round(distance_in_minutes / 60);
    result = distance_in_hours + ' hours ago';
  } else {
    var days = Math.floor(distance_in_hours / 24);
    result = days + ' days ago';
  }

  return result;
}

/**
 * uptodate
 * The main method that extracts timestamps and generates human-readable time data
 */
function uptodate(options) {
  options = options || {};

  var defaults = {
    klass: 'uptodate',

    timestamp: function (el) {
      return parseInt(el.getAttribute('data-time'), 10);
    },

    period: 1000 * 60,

    formatter: time_ago_in_words
  };

  // extend the defaults
  options.klass     = options.klass     || defaults.klass;
  options.timestamp = options.timestamp || defaults.timestamp;
  options.period    = options.period    || defaults.period;
  options.formatter = options.formatter || defaults.formatter;

  /**
   * Timefix function.
   * This function will match all elements with class `klass` then extract a
   * timestamp from the `attr` attribute and send it off to `formatter`
  */
  function timefix() {
    // match all elements by class `klass`
    var els = document.querySelectorAll('.' + options.klass);
    var el, i, ts;

    // iterate over all matched elements
    for (i = 0; el < els.length; i++) {
      el = els[i];

      // fetch the timestamp from the `attr` attribute
      ts = options.timestamp(el);

      // send `ts` to the `formatter` and place the result in the elements HTML
      el.innerHTML = options.formatter(ts);
    }
  }

  // now, create a timer based on `period` to automatically call `timefix`
  setInterval(timefix, options.period);
}
