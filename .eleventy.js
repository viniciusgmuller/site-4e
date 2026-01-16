module.exports = function(eleventyConfig) {
  // Filtro para padStart (formatar números com zeros à esquerda)
  eleventyConfig.addFilter("padStart", function(value, length, char) {
    return String(value).padStart(length, char || '0');
  });

  // Copiar assets (CSS, JS, imagens) para a pasta de output
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/uploads");

  // Copiar pasta admin (Decap CMS)
  eleventyConfig.addPassthroughCopy("admin");

  // Copiar config.yml para raiz (DecapCMS busca na raiz)
  eleventyConfig.addPassthroughCopy("src/config.yml");

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
