import axios from 'axios';

export async function getDptThreads() {
  if (localStorage.getItem('dptThreads')) {
    try {
      return JSON.parse(localStorage.getItem('dptThreads'));
    } catch (e) {
      localStorage.removeItem('dptThreads');
      return {};
    }
  }

  return await axios.get('http://localhost:8000/api/threads');
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

async function getBase64() {
  const response = await axios.get('http://localhost:8000/api/img/73762946', {
    responseType: 'arraybuffer'
  });

  return 'data:image/jpg;base64,'.concat(
    Buffer.from(response.data, 'binary').toString('base64')
  );
}

export async function getThreadInfo(threadInfo) {
  threadInfo.imgBase64 = await getBase64();
  return threadInfo;
}

export async function getLanguageCounts() {}
