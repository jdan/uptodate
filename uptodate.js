/** uptodate.js | (c) 2013 Jordan Scales | See LICENSE.txt
    Keeps the timestamps on your webpage up to date.
*/

var uptodate = function(options) {

  /* provide an empty options hash if we're found without one */
  options = options || {};

  var defaults = {
    /* by default, match class 'uptodate' */
    klass: 'uptodate',

    /* to fetch the timestamp, we will fetch the `data-time` attribute
       of the given element */
    timestamp: function(el) {
      return parseInt(el.getAttribute('data-time'));
    },

    /* the default period is 1 minute (1000 * 60 ms) */
    period: 1000 * 60,

    /* uses the `time_ago_in_words` sample function (below) by default */
    formatter: time_ago_in_words
  };

  /* extend the defaults */
  options.klass     = options.klass     || defaults.klass;
  options.timestamp = options.timestamp || defaults.timestamp;
  options.period    = options.period    || defaults.period;
  options.formatter = options.formatter || defaults.formatter;

  /** timefix function
        this function will match all elements with class `klass`
        then extract a timestamp from the `attr` attribute
        and send it off to `formatter`
  */
  var timefix = function() {

    /* match all elements by `klass` */
    var els = document.getElementsByClassName(options.klass);

    /* iterate over all matched elements */
    for (var i = 0; i < els.length; i++) {
      var el = els[i];

      /* fetch the timestamp from the `attr` attribute */
      var ts = options.timestamp(el);

      /* send `ts` to the `formatter`
         and place the result in the elements HTML */
      el.innerHTML = options.formatter(ts);
    }
  };

  /* now, create a timer based on `period` to automatically call `timefix` */
  setInterval(timefix, options.period);

};

/* time_ago_in_words method based on ActionView's helper of the same name
     see the following for more information
     http://api.rubyonrails.org/classes/ActionView/Helpers/DateHelper.html#method-i-time_ago_in_words
   This has been heavily modified to accomodate minutes and hours only
  
   Feel free to send this output to other functions. For example:
     uptodate({ formatter: function(ts) { return time_ago_in_words(ts).toLowerCase() }; });
*/
var time_ago_in_words = function(ts) {
  /* fetching a `from` and `to` time to work with deltas */
  var from = new Date(ts);
  var to   = new Date();

  /* the distance (in seconds) with decimals (to match Ruby's `Time`) */
  var distance = Math.abs(to - from) / 1000;

  /* rounding off the distance in minutes and in seconds */
  var distance_in_minutes = Math.round(distance / 60);
  var distance_in_hours   = Math.round(distance_in_minutes / 60);

  /* generate the output (no i18n for now) */
  if (distance_in_minutes < 1) {
    /* in the rare chance that this case is hit, return 'Less than one minute ago' */
    return 'Less than one minute ago';

  } else if (distance_in_minutes < 45) {
    /* between 1 and 45 minutes, return the number of minutes */
    return distance_in_minutes + ' minute'+(distance_in_minutes ==1?' ':'s ')+'ago';

  } else if (distance_in_minutes < 90) {
    /* between 45 and 90 minutes, we are about one hour ago */
    return 'About one hour ago'
  } else if (distance_in_hours < 24) {
    /* if it was less than a day ago */
    var hours = Math.round(distance_in_minutes / 60);
    return distance_in_hours + ' hours ago';
  } else {
    /* if it was more than a day ago, use days */
    var days = Math.floor(distance_in_hours / 24);
    return days + ' days ago';
  }
};
