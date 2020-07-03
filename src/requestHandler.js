'use strict';

import fs from 'fs';

const _default = function handleRequest(req, res) {
  try {
    fs.writeFileSync('request.json', JSON.stringify(req));

    return res.sendStatus(200);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
};

export { _default as default };