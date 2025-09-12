const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const Image = require("@11ty/eleventy-img");
const slugify = require("slugify");

module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  // Plugins
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  // Image optimization shortcode
  eleventyConfig.addShortcode("image", async function(src, alt, classes = "", sizes = "100vw") {
    const metadata = await Image(src, {
      widths: [300, 600, 900, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "_site/assets/images/",
      urlPath: "/assets/images/",
    });

    const imageAttributes = {
      alt,
      class: classes,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  // Responsive image shortcode
  eleventyConfig.addShortcode("responsiveImage", async function(src, alt, classes = "") {
    if (!src) {
      throw new Error(`Missing \`src\` on responsiveImage from: ${this.inputPath}`);
    }

    const metadata = await Image(src, {
      widths: [320, 640, 960, 1280],
      formats: ["webp", "jpeg"],
      outputDir: "_site/assets/images/",
      urlPath: "/assets/images/",
    });

    const imageAttributes = {
      alt,
      class: classes,
      sizes: "(min-width: 1024px) 1024px, 100vw",
      loading: "lazy",
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  // Filters
  eleventyConfig.addFilter("slug", (input) => {
    const options = {
      replacement: "-",
      remove: /[&,+()$~%.'":*?<>{}]/g,
      lower: true
    };
    return slugify(input, options);
  });

  eleventyConfig.addFilter("dateIso", (dateObj) => {
    return dateObj.toISOString();
  });

  eleventyConfig.addFilter("dateReadable", (dateObj) => {
    return dateObj.toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  eleventyConfig.addFilter("excerpt", (content) => {
    const excerpt = content.replace(/(<([^>]+)>)/gi, "");
    return excerpt.substr(0, 160) + (excerpt.length > 160 ? "..." : "");
  });

  // Collections
  eleventyConfig.addCollection("services", function(collectionApi) {
    return collectionApi.getFilteredByTag("service").sort((a, b) => {
      return a.data.order - b.data.order;
    });
  });

  eleventyConfig.addCollection("testimonials", function(collectionApi) {
    return collectionApi.getFilteredByTag("testimonial");
  });

  // Transforms
  if (process.env.NODE_ENV === "production") {
    const htmlmin = require("html-minifier");
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
      if (outputPath && outputPath.endsWith(".html")) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true
        });
        return minified;
      }
      return content;
    });
  }

  // Watch targets
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  return {
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};