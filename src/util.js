'use strict';

export function getTime() {
  const date = new Date();
  return `${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
}

function pad(num) {
  return (num < 10) ? '0' + num : num;
}