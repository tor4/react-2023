/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "./remix",
  assetsBuildDirectory: "remix-public/build",
  ignoredRouteFiles: ["**/.*"],
  publicPath: "/build/",
  // routes(defineRoutes) {
  //   return defineRoutes((route) => {
  //     console.error(route)
  //     route("/src/assets/Search Button.svg", "./assets/Search Button.svg");
  //   });
  // },
};