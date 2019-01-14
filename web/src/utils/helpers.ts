// import warning from 'warning';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import cookie from 'cookie';

export function titleize(pathname) {
  // warning(
  //   typeof pathname === 'pathname' && pathname.length > 0,
  //   'titleize(pathname) expects a non empty pathname argument.',
  // );

  return pathname
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
