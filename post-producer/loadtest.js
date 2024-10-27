import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // number of virtual users
  duration: '60s', // test duration
};

export default function () {
  const url = 'http://localhost:3000/producer/create-post';
  const payload = JSON.stringify({
    title: 'Test Post Title',
    content: 'This is the content of the test post.',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1); // pause for 1 second between iterations
}
