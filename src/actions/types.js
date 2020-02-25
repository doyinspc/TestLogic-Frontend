
require('dotenv').config({
    path: `../../.env.${process.env.NODE_ENV || 'development'}`,
  });
  //console.log(path);
  console.log(process.env.API_PATH);
export const API_PATH = process.env.API_PATH //'http://localhost:3001';
