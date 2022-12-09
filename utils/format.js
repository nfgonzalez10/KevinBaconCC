/**
 *
 * @param {String} response /name/nm3592338/
 * @returns {String} response nm3592338
 */
module.exports.formatResponseMovies = (response) =>
  response?.replace(/^\/[a-z]{4,5}\//gm, "").replace("/", "");
