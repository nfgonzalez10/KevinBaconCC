const https = require("https");
const {
  X_RAPIDAPI_KEY,
  X_RAPIDAPI_HOST,
  KEVIN_BACON_ID,
  OPTIONS,
} = require("../utils/constanst");

const fetch = (options) => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (response) => {
      const chunks = [];

      response.on("data", (chunk) => {
        chunks.push(chunk);
      });
      response.on("end", () => {
        const body = Buffer.concat(chunks);
        resolve(JSON.parse(body.toString()));
      });
      response.on("error", (error) => reject(error));
    });
    req.end();
  });
};

module.exports.getMoviesByActor = async (actorId) => {
  const options = {
    ...OPTIONS,
    path: `/actors/get-all-filmography?nconst=${actorId}`,
  };
  try {
    const data = await fetch(options);
    console.log("🚀 ~ file: index.js:32 ~ getMoviesKevinBacon ~ data", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ file: index.js:33 ~ getMoviesKevinBacon ~ error", error);
  }
};

module.exports.getMovieCast = async (movieId) => {
  const options = {
    ...OPTIONS,
    path: `/title/get-top-cast?tconst=${movieId}`,
  };
  try {
    const data = await fetch(options);
    console.log("🚀 ~ file: index.js:32 ~ getMoviesKevinBacon ~ data", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ file: index.js:33 ~ getMoviesKevinBacon ~ error", error);
  }
};
module.exports.getActorBio = async (actorId) => {
  const options = {
    ...OPTIONS,
    path: `/actors/get-bio?nconst=${actorId}`,
  };
  try {
    const data = await fetch(options);
    console.log("🚀 ~ file: index.js:32 ~ getMoviesKevinBacon ~ data", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ file: index.js:33 ~ getMoviesKevinBacon ~ error", error);
  }
};
