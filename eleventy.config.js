const btn = require("./src/includes/shortcodes/button");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/pages");
    eleventyConfig.addPassthroughCopy("src/js");

    eleventyConfig.addPassthroughCopy({ "node_modules/lenis/dist": "vendor/lenis" });

    eleventyConfig.addWatchTarget("src/css");
    eleventyConfig.addWatchTarget("src/pages");

    eleventyConfig.addShortcode("btn", btn);

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
