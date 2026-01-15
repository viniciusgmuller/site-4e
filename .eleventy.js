module.exports = function(eleventyConfig) {
  // Copiar assets (CSS, JS, imagens) para a pasta de output
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/uploads");

  // Copiar pasta admin (Decap CMS)
  eleventyConfig.addPassthroughCopy("admin");

  // Copiar páginas HTML da raiz
  eleventyConfig.addPassthroughCopy("*.html");
  eleventyConfig.addPassthroughCopy("contato.html");
  eleventyConfig.addPassthroughCopy("sobre.html");
  eleventyConfig.addPassthroughCopy("gestao-publica.html");
  eleventyConfig.addPassthroughCopy("gestao-crises.html");
  eleventyConfig.addPassthroughCopy("educacao-privada.html");
  eleventyConfig.addPassthroughCopy("educacao-corporativa.html");

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
