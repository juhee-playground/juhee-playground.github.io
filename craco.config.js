const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        tsConfigPath: "tsconfig.paths.json",
      },
    },
  ],
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import "src/assets/scss/_variables.scss";
          @import "src/assets/scss/_mixins.scss";
          @import "src/assets/scss/_reset.scss";
          @import "src/assets/scss/_mediaQueries.scss";
          @import "src/assets/scss/font/index.scss";
        `,
      },
    },
  },
};
