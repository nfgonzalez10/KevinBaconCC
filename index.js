const argv = require("yargs")(process.argv.slice(2)).argv;
const { getKevinBaconRelation } = require("./managers/actorManager");
const { getKnowActors, levelKnowActor } = require("./managers/searchActor");
const { store } = require("./managers/storeManager");

const init = async () => {
  if (argv.typeFile === "list_actors_names_we_now_know") {
    getKnowActors();
  } else if (argv.typeFile === "load_kevin_bacons_history") {
    const resultKevinBacon = await getKevinBaconRelation();
    store("kevinBaconData.json", resultKevinBacon);
  } else if (argv.typeFile === "degrees_away_from_kevin_bacon" && argv.actor) {
    const result = await levelKnowActor(argv.actor);
    console.log("Degree", result.relation, "Movie:", result.movie);
  }
};
init();
