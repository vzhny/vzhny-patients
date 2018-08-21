const byName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

const byLastVisit = (a, b) => {
  if (a.lastVisit < b.lastVisit) {
    return -1;
  }
  if (a.lastVisit > b.lastVisit) {
    return 1;
  }
  return 0;
};

const byNumberOfSessions = (a, b) => {
  if (a.numberOfSessions < b.numberOfSessions) {
    return -1;
  }
  if (a.numberOfSessions > b.numberOfSessions) {
    return 1;
  }
  return 0;
};

module.exports = { byName, byLastVisit, byNumberOfSessions };
