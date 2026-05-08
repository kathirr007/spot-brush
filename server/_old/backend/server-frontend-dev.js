import  webpack from "webpack";
import  WebpackDevServer from "webpack-dev-server";
import  config from "../config/webpack.dev.js";

const devServerConfig = {
    hot: true,
    inline: true,
    stats: {
        children: false,
        maxModules: 0,
    },
    proxy: {
        // proxies for the backend
        "/api": "http://localhost:3000",
        "/uploads": "http://localhost:3000",
        "/ws-api": {
            target: "ws://localhost:3000",
            ws: true,
        },
    },
};

function startFrontendDevServer(port) {
    // require here to prevent prod dependency to webpack


    new WebpackDevServer(webpack(config), devServerConfig).listen(port, (err) => {
        if (err) {
            console.log(err);
        }

        console.log("Listening on port " + port);
    });
}

export default startFrontendDevServer;
