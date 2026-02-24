module.exports = {
    tags: ["post"],
    layout: "layouts/post.html",

    // Optional defaults (can be overridden per-post in front matter)
    authorName: "Sri Iyem",
    authorAvatar: "/img/blog/avtor.jpg",

    eleventyComputed: {
        lang: (data) => {
            if (data.lang) return data.lang;

            // Try to infer lang from folder: /posts/<lang>/<file>
            const stem = data.page && data.page.filePathStem ? data.page.filePathStem : "";
            const parts = stem.split("/").filter(Boolean);
            const idx = parts.indexOf("posts");
            if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];

            return (data.locales && data.locales.default) ? data.locales.default : "en";
        },

        slug: (data) => data.slug || (data.page ? data.page.fileSlug : ""),

        permalink: (data) => {
            const lang = data.lang || (data.locales && data.locales.default) || "en";
            const slug = data.slug || (data.page ? data.page.fileSlug : "");
            const def = (data.locales && data.locales.default) ? data.locales.default : "en";
            const prefix = lang === def ? "" : `/${lang}`;
            return `${prefix}/posts/${slug}/`;
        }
    }
};
