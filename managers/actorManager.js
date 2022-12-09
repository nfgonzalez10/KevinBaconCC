const {
  getMoviesByActor,
  getMovieCast,
  getActorBio,
} = require("../lib/services");
const { KEVIN_BACON_ID, TEST_ENABLE } = require("../utils/constanst");
const { formatResponseMovies } = require("../utils/format");

module.exports.getKevinBaconRelation = async (
  actor = KEVIN_BACON_ID,
  memo = {},
  depth = 0
) => {
  if (depth > 2) {
    return memo;
  }
  if (actor in memo) return;
  const [movies, bio] = await Promise.all([
    getMoviesByActor(actor),
    getActorBio(actor),
  ]);
  const idsMovies = [];
  let actorsRelation = [];
  memo[actor] = { ...bio, filmography: [] };
  if (TEST_ENABLE) {
    const limit = Math.floor(movies?.filmography?.length / 200) ?? 2;
    movies.filmography = movies.filmography?.slice(0, limit);
  }
  for (const movie of movies?.filmography) {
    const moveId = formatResponseMovies(movie.id);
    idsMovies.push(moveId);
    let movieCast = await getMovieCast(moveId);
    if (TEST_ENABLE) {
      const limit = Math.floor(movieCast?.length / 10) ?? 1;
      movieCast = movieCast?.slice(0, limit);
    }
    actorsRelation.push(...movieCast);
    memo[actor].filmography.push({
      ...movie,
      movieCast: movieCast?.map((actor) => formatResponseMovies(actor)),
    });
  }
  memo[actor].actorsRelation = [...new Set(actorsRelation)].map((actor) =>
    formatResponseMovies(actor)
  );

  for (const actorRelation of memo[actor].actorsRelation) {
    await this.getKevinBaconRelation(actorRelation, memo, depth + 1);
  }
  return sortMemoByName(memo);
};

const sortMemoByName = (memo) => {
  return Object.entries(memo)
    .sort(([, valueA], [, valueB]) => {
      const firstLetterA = valueA.name.charAt(0);
      const firstLetterB = valueB.name.charAt(0);
      return firstLetterA > firstLetterB ? 1 : -1;
    })
    .reduce(
      (actualValue, [key, value]) => ({
        ...actualValue,
        [key]: value,
      }),
      {}
    );
};
