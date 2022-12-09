const { KEVIN_BACON_ID } = require("../utils/constanst");
const { readFile } = require("./storeManager");

module.exports.levelKnowActor = async (actorName) => {
  const isKnowActor = (await this.getKnowActors()).includes(actorName);
  if (!isKnowActor) {
    return { relation: -1, movie: "Not Found 🔍" };
  }
  return this.searchActor(actorName);
};
/**
 *
 * @param {String} actorName
 */
module.exports.searchActor = async (actorName) => {
  const nameFormat = actorName.trim().toLowerCase().replace(" ", "");
  try {
    const dataFile = JSON.parse(await readFile("kevinBaconData.json"));
    let start = 0;
    let end = Object.keys(dataFile).length;
    let actorKey, result;
    while (start <= end) {
      let pivot = Math.floor((start + end) / 2);
      let actor = Object.keys(dataFile)[pivot];
      let currentActor = dataFile[actor]?.name
        ?.trim()
        .toLowerCase()
        .replace(" ", "");
      if (currentActor === nameFormat) {
        actorKey = actor;
        break;
      } else if (currentActor?.charAt(0) < nameFormat.charAt(0)) {
        start = pivot + 1;
      } else if (currentActor?.charAt(0) === nameFormat.charAt(0)) {
        start = start + 1;
      } else {
        end = pivot - 1;
      }
    }

    const isRelationZero = searchMovie(KEVIN_BACON_ID, actorKey, dataFile);
    if (isRelationZero) {
      result = { relation: 0, movie: isRelationZero };
    } else if (
      isRelationOne(
        actorKey,
        dataFile?.[KEVIN_BACON_ID].actorsRelation,
        dataFile
      )
    ) {
      let movieFound;
      for (const actor2 of dataFile?.[KEVIN_BACON_ID].actorsRelation) {
        movieFound = searchMovie(actorKey, actor2, dataFile);
        if (movieFound) {
          break;
        }
      }
      result = { relation: 1, movie: movieFound };
    } else {
      const isThridRelation = searchThirdRelation(
        dataFile?.[KEVIN_BACON_ID].actorsRelation,
        actorKey,
        dataFile
      );
      if (isThridRelation) {
        const movie = searchMovie(actorKey, isThridRelation, dataFile);
        result = { relation: 2, movie };
      }
    }
    return result;
  } catch (_error) {
    console.log("No actors found. Please load the data");
  }
};

const searchThirdRelation = (actorsKevinBacon, actorId, dataFile) => {
  for (const actor of actorsKevinBacon) {
    const isRelation = isRelationOne(
      actorId,
      dataFile[actor].actorsRelation,
      dataFile
    );
    if (isRelation) {
      return actor;
    }
  }
  return false;
};

const searchMovie = (actor1, actor2, dataFile, iterator = 0) => {
  if (dataFile?.[actor1]?.actorsRelation?.includes(actor2)) {
    for (const movie of dataFile?.[actor1]?.filmography) {
      if (movie?.movieCast?.includes(actor2)) {
        return movie;
      }
    }
  }
  return iterator === 0
    ? searchMovie(actor2, actor1, dataFile, iterator + 1)
    : false;
};

/**
 *
 * @param {String} actorKey
 * @param {String []} kevinBaconActors
 * @param {Object} dataFile
 */
const isRelationOne = (actorKey, kevinBaconActors, dataFile) => {
  for (let key of kevinBaconActors) {
    if (dataFile?.[key]?.actorsRelation?.includes(actorKey)) return true;
  }
  return false;
};

module.exports.getKnowActors = async () => {
  try {
    const dataFile = JSON.parse(await readFile("kevinBaconData.json"));
    const actorsKnow = Object.keys(dataFile).map(
      (actor) => dataFile[actor].name
    );
    console.log("list_actors_names_we_now_know", actorsKnow.join("\n"));
    return actorsKnow;
  } catch (_error) {
    console.log("No actors found. Please load the data");
  }
};
