const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-js");
const htmlmin = require("html-minifier");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Data Deep Merge
  eleventyConfig.setDataDeepMerge(true);

  // Layout Aliases
  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("home", "layouts/home.njk");

  // Date Filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("machineDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  // Minification Filters
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("jsmin", function (code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }
    return minified.code;
  });

  eleventyConfig.addFilter("split", function (str, separator) {
    return str.split(separator);
  });

  // HTML Minification Transform
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  // Custom Collections
  eleventyConfig.addCollection("services", (collection) => {
    return collection.getFilteredByGlob("services/*.md");
  });

  // Add data files
  eleventyConfig.addGlobalData(
    "socials",
    require("./_data/footer-data/social-media.json").socials,
  );
  eleventyConfig.addGlobalData(
    "useful_links",
    require("./_data/footer-data/navigation.json").useful_links,
  );
  eleventyConfig.addGlobalData(
    "what_we_do",
    require("./_data/footer-data/navigation.json").what_we_do,
  );
  eleventyConfig.addGlobalData(
    "gallery",
    require("./_data/footer-data/gallery.json").gallery,
  );

  // Update the asset handling to ensure correct paths
  eleventyConfig.addPassthroughCopy({
    "_includes/assets/css/vendor/bootstrap.bundle.min.js":
      "assets/js/vendor/bootstrap.bundle.min.js",
    "_includes/assets/css/vendor/bootstrap.min.css":
      "assets/css/vendor/bootstrap.min.css",
    "_includes/assets/css/plugins": "assets/css/plugins",
    "_includes/assets/js/plugins": "assets/js/plugins",
    "_includes/assets/js/vendor": "assets/js/vendor",
    "_includes/assets/js/main.js": "assets/js/main.js",
    "_includes/assets/css": "assets/css", //TODO: add all css routes like the js ones
    "_includes/assets/images": "assets/images",
    "_includes/assets/fonts": "assets/fonts",
    "static/img": "img",
    admin: "admin",
  });

  // Add specific watch targets for the assets
  eleventyConfig.addWatchTarget("./_includes/assets/");

  // Add Date filter
  eleventyConfig.addFilter("year", function () {
    return new Date().getFullYear();
  });

  // Watch Targets
  // eleventyConfig.addWatchTarget("./_includes/assets/css/");
  // eleventyConfig.addWatchTarget("./_includes/assets/js/");

  // Markdown Library Setup
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: false,
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Ignore email templates
  eleventyConfig.ignores.add("admin/email-templates/");

  // 11ty Configuration
  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    pathPrefix: "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
