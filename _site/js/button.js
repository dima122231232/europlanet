module.exports = function (eleventyConfig) {
    eleventyConfig.addShortcode("btn", function (text, href = "", extraClass = "") {
        return `
<button class="btn btn--cta ${extraClass}">
    <a href="${href}" class="btn__link">
        <div class="btn__bg"></div>
        <div class="btn__text">
            <p class="btn__label">${text}</p>
            <p class="btn__label">${text}</p>
        </div>
    </a>
</button>`.trim();
    });
};
