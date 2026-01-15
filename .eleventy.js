module.exports = function(eleventyConfig) {
  // Copiar assets (CSS, JS, imagens) para a pasta de output
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/uploads");

  // Copiar pasta admin (Decap CMS)
  eleventyConfig.addPassthroughCopy("admin");

  // Configurar watch para arquivos adicionais
  eleventyConfig.addWatchTarget("src/assets/");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
