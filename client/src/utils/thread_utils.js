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

  const threads = await axios.get('http://localhost:8000/api/threads');
  return threads.data;
}

export async function getTotalDptStatistics() {
  if (sessionStorage.getItem('dptStatsTotal')) {
    try {
      return JSON.parse(sessionStorage.getItem('dptStatsTotal'));
    } catch (e) {
      return {};
    }
  }

  const allStats = await axios.get('http://localhost:8000/api/stats');
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

  const threads = await axios.get('http://localhost:8000/api/threads');
  return threads.data.filter(thread => thread.threadInfo.isActive === 1);
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
  const response = await axios.get(
    `http://localhost:8000/api/img/${threadID}`,
    {
      responseType: 'arraybuffer'
    }
  );

  return 'data:image/jpg;base64,'.concat(
    Buffer.from(response.data, 'binary').toString('base64')
  );
}

export async function getThreadInfo(threadInfo) {
  threadInfo.imgBase64 = await getBase64(threadInfo.threadID);
  return threadInfo;
}

export async function getLanguageCounts() {}
