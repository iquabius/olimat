// import warning from 'warning';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import cookie from 'cookie';

export function titleize(string) {
  // warning(
  //   typeof string === 'string' && string.length > 0,
  //   'titleize(string) expects a non empty string argument.',
  // );

  return string
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function pageToTitle(page) {
  if (page.title) {
    return page.title;
  }

  const name = page.pathname.replace(/.*\//, '');

  if (page.pathname.indexOf('/api') === 0) {
    return upperFirst(camelCase(name));
  }

  return titleize(name);
}

export const parseCookies = (req, options = {}) =>
  cookie.parse(req ? req.headers.cookie || '' : document.cookie, options);
