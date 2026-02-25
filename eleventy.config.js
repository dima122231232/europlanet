const btn = require("./src/includes/shortcodes/button");

module.exports = function (eleventyConfig) {
  /* ----------------- Passthrough ----------------- */
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/pages");
  eleventyConfig.addPassthroughCopy("src/js");

  eleventyConfig.addPassthroughCopy({
    "node_modules/lenis/dist": "vendor/lenis",
  });

  /* ----------------- Watch ----------------- */
  eleventyConfig.addWatchTarget("src/css");
  eleventyConfig.addWatchTarget("src/pages");

  /* ----------------- Shortcodes ----------------- */
  eleventyConfig.addShortcode("btn", btn);

  /* ----------------- Filters ----------------- */
  /* ----------------- Collections ----------------- */
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("./src/posts/**/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("postsByLang", (collectionApi) => {
    const posts = collectionApi
      .getFilteredByGlob("./src/posts/**/*.md")
      .sort((a, b) => b.date - a.date);

    return posts.reduce((acc, post) => {
      const lang = post.data.lang || "en";
      (acc[lang] ||= []).push(post);
      return acc;
    }, {});
  });

  /* ----------------- Return Config ----------------- */
  return {
    dir: {
      input: "src",
      includes: "includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};