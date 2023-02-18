function getAccessTime() {
  return new Date(Math.floor(Date.now() / 1000) + 60 * 30);
}

export default getAccessTime;
