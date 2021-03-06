import axios from 'axios';

export async function getAllDptThreads() {
  if (sessionStorage.getItem('dptThreads')) {
    try {
      return JSON.parse(sessionStorage.getItem('dptThreads'));
    } catch (e) {
      sessionStorage.removeItem('dptThreads');
      return {};
    }
  }

  const threads = await axios.get(`${apiURL}/api/threads`);
  return threads.data.sort(
    (a, b) => a.threadInfo.unixtime < b.threadInfo.unixtime
  );
}

export async function getTotalDptStatistics() {
  if (sessionStorage.getItem('dptStatsTotal')) {
    try {
      return JSON.parse(sessionStorage.getItem('dptStatsTotal'));
    } catch (e) {
      return {};
    }
  }

  const allStats = await axios.get(`${apiURL}/api/stats`);
  return allStats.data;
}

export async function getActiveDptThreads() {
  if (sessionStorage.getItem('activeDptThreads')) {
    try {
      return JSON.parse(sessionStorage.getItem('activeDptThreads'));
    } catch (e) {
      sessionStorage.removeItem('activeDptThreads');
      return {};
    }
  }

  const threads = await axios.get(`${apiURL}/api/threads`);

  console.log(apiURL);
  return threads.data
    .filter(thread => thread.threadInfo.isActive === 1)
    .sort((a, b) => a.threadInfo.unixtime < b.threadInfo.unixtime);
}

// Get most recent thread
export function getLatestDptThread(dptThreads) {
  // max unixtime will be most recent
  let maxUnixTime = 0;
  let mostRecentThread = null;

  dptThreads.data.forEach(thread => {
    if (thread.threadInfo.unixtime > maxUnixTime) {
      maxUnixTime = thread.threadInfo.unixtime;
      mostRecentThread = thread;
    }
  });
  return mostRecentThread;
}

async function getBase64(threadID) {
  const response = await axios.get(`${apiURL}/api/img/${threadID}`, {
    responseType: 'arraybuffer'
  });

  return 'data:image/jpg;base64,'.concat(
    Buffer.from(response.data, 'binary').toString('base64')
  );
}

export async function getThreadInfo(threadInfo) {
  threadInfo.imgBase64 = await getBase64(threadInfo.threadID);
  return threadInfo;
}

export async function getLanguageCounts() {}
