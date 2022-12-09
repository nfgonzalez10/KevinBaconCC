# Kevin Bacon Code Challenge 🥓🥓

This project gets data from IMDB to match some relations between Kevin Bacon and other actors.

### Prerequisites

This algorimth runs by node.js, before you run it, you must install node.

```
node v14.17.1
```

By default this project is running by **TEST_ENABLE** to limite the request call to the API.

If you want to try run with all data, you must change the **TEST_ENABLE** flag in:

```
./utils/constanst.js
```

Your flag will be:

```
module.exports.TEST_ENABLE = false;
```

### Installing

To run this project you should install with

```
npm i
```

## Running

To verify the list of actors names know run:

```
node index.js --typeFile=list_actors_names_we_now_know
```

To load new data from imdb api run:

```
node index.js --typeFile=load_kevin_bacons_history
```

To get degrees with in relation to Kevin Bacon 🥓 run:

```
node index.js --typeFile=degrees_away_from_kevin_bacon --actor="Actor name"
```

## Authors

- \*_Nicolas Gonzalez_ - _Initial work_ - [nfgonzalez10](https://github.com/nfgonzalez10)
