function getRefreshTime() {
  return new Date(Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 31);
}

export default getRefreshTime;
