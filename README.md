## Nest Starter project

To use, clone this repo, remove the Git origin and start building.

### launch.json

This repo includes a `launch.json` file for VS Code that allows you to hit F5 to debug right out of the box.

### Environment & Configuration

Dotenv package is included so you can put a `.env` file in the root. Sample usage of `.env` is shown in the provided `sample.env` file. Available configuration options are:

- `PORT`: Configure the port number the app listens on, which defaults to 3000 
- `BASE_PATH`: Use this to specify the base path for the app. This is useful for API gateway scenarios, or for specifying API versions without changing code. So you could set `v2` as the `BASE_PATH` and the app would listen on `http://{hostname}/v2` instead of the root

