/* eslint-disable */
import * as axios from 'axios';

const options = {};
// The server-side needs a full url to works
if (process.SERVER_BUILD) {
  options.baseURL = `https://${process.env.HOST || 'localhost'}:${process.env.PORT || 3001}`;
  options.headers = { "Authorization": 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hdHQiLCJhZ2UiOjI5LCJpYXQiOjE1MDA2NTEyMDV9.nXqOQPKnKRF68v5RZ-lAwbz3IYtxi28hIeAkKTPHX8M' };
}

export default axios.create(options);
