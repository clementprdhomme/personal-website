const htmlmin = require('html-minifier');
const format = require('date-fns/format');
const formatDistance = require('date-fns/formatDistance');

const experienceData = require('./data/experience.json');
const projectsData = require('./data/projects.json');

module.exports = (eleventyConfig) => {
  eleventyConfig.addCollection('experience', () =>
    [
      ...experienceData.data.map((experience) => {
        let duration;

        if (experience.start_date && experience.end_date) {
          duration = formatDistance(new Date(experience.end_date), new Date(experience.start_date));
          duration = `${duration} (from ${format(new Date(experience.start_date), 'MMM yyyy')})`;
        } else if (experience.start_date) {
          duration = `since ${format(new Date(experience.start_date), 'MMM yyyy')}`;
        }

        return { ...experience, duration };
      }),
    ].reverse()
  );

  eleventyConfig.addCollection('projects', () => [...projectsData.data].reverse().slice(0, 4));

  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/static');

  if (process.env.ELEVENTY_ENV === 'production') {
    eleventyConfig.addTransform('compressHTML', function (content, outputPath) {
      if (outputPath.endsWith('.html')) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
        });
        return minified;
      }
      return content;
    });
  }

  return {
    dir: {
      input: 'src',
      output: 'dist',
      layouts: 'layouts',
    },
    templateFormats: ['html', 'md', 'css'],
  };
};
