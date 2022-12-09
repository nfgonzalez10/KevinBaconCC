module.exports.KEVIN_BACON_ID = "nm0000102";
module.exports.X_RAPIDAPI_KEY =
  "26f362881cmshc1cdd3f00ba238bp1edb96jsn6f4ac2508612";
module.exports.X_RAPIDAPI_HOST = "online-movie-database.p.rapidapi.com";

module.exports.OPTIONS = {
  hostname: exports.X_RAPIDAPI_HOST,
  method: "GET",
  headers: {
    "X-RapidAPI-Key": exports.X_RAPIDAPI_KEY,
    "X-RapidAPI-Host": exports.X_RAPIDAPI_HOST,
  },
  maxRedirects: 20,
};

module.exports.TEST_ENABLE = true;
