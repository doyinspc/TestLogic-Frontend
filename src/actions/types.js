
require('dotenv').config({
  path: `./../../env-files/${process.env.NODE_ENV || 'development'}.env`,
});
console.log(process.env);
export const API_PATH = process.env.REACT_APP_API_PATH;
