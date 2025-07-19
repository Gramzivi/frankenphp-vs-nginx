import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 100, // virtual users
  duration: '10s',
};

export default function () {
  http.get('http://localhost:8080');
  sleep(0.1);
}
