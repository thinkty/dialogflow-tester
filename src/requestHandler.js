'use strict';

import fs from 'fs';

const intDir = 'webhookRequestLogs';
let counter = 0;

const _default = function handleRequest(req, res) {
  try {

    const request = {
      headers: req.headers,
      params: req.params,
      query: req.query,
      body: req.body,
    };

    console.log(request);

    fs.writeFileSync(`${intDir}/intent-${counter++}.json`, JSON.stringify(request));

    return res.sendStatus(200);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
};

export { _default as default };