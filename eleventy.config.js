const htmlmin = require('html-minifier');
const format = require('date-fns/format');
const formatDistance = require('date-fns/formatDistance');

const experienceData = require('./data/experience.json');
const projectsData = require('./data/projects.json');
const educationData = require('./data/education.json');

module.exports = (eleventyConfig) => {
  eleventyConfig.addCollection('experience', () =>
    [
      ...experienceData.data.map((experience) => {
        let duration;

        const startDate = experience.positions.length > 0
          ? experience.positions[0].start_date
          : null;

        const endDate = experience.positions.length > 0
          ? experience.positions[experience.positions.length - 1].end_date
          : null;

        if (startDate && endDate) {
          duration = formatDistance(new Date(endDate), new Date(startDate));
          duration = `${duration} (from ${format(new Date(startDate), 'MMM yyyy')})`;
        } else if (startDate) {
          duration = `since ${format(new Date(startDate), 'MMM yyyy')}`;
        }

        const positions = [...experience.positions].reverse().map((position) => ({
          ...position,
          formatted_start_date: format(new Date(position.start_date), 'yyyy-MM'),
          formatted_end_date: position.end_date
            ? format(new Date(position.end_date), 'yyyy-MM')
            : null,
        }));

        return { ...experience, positions, duration, start_date: startDate, end_date: endDate };
      }),
    ].reverse()
  );

  eleventyConfig.addCollection('work_experience', () =>
    [
      ...experienceData.data
        .filter((experience) => !experience.side_activity)
        .map((experience) => {
          let duration;

          const startDate = experience.positions.length > 0
            ? experience.positions[0].start_date
            : null;

          const endDate = experience.positions.length > 0
            ? experience.positions[experience.positions.length - 1].end_date
            : null;

          if (startDate && endDate) {
            duration = formatDistance(new Date(endDate), new Date(startDate));
            duration = `${duration} (from ${format(new Date(startDate), 'MMM yyyy')})`;
          } else if (startDate) {
            duration = `since ${format(new Date(startDate), 'MMM yyyy')}`;
          }

          const positions = [...experience.positions].reverse().map((position) => ({
            ...position,
            formatted_start_date: format(new Date(position.start_date), 'yyyy-MM'),
            formatted_end_date: position.end_date
              ? format(new Date(position.end_date), 'yyyy-MM')
              : null,
          }));

          return { ...experience, positions, duration, start_date: startDate, end_date: endDate };
        }),
    ].reverse()
  );

  eleventyConfig.addCollection('projects', () => [...projectsData.data].reverse().slice(0, 4));

  eleventyConfig.addCollection('education', () =>
    [
      ...educationData.data.map((education) => {
        let duration;

        if (education.start_date && education.end_date) {
          duration = formatDistance(new Date(education.end_date), new Date(education.start_date));
          duration = `${duration} (from ${format(new Date(education.start_date), 'MMM yyyy')})`;
        } else if (education.start_date) {
          duration = `since ${format(new Date(education.start_date), 'MMM yyyy')}`;
        }

        return { ...education, duration };
      }),
    ].reverse()
  );

  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/static');

  eleventyConfig.addLiquidFilter("date", (date, dateFormat) => {
    return format(new Date(date), dateFormat);
  });

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
