# FrankenPHP vs Nginx + PHP-FPM

**Benchmarking FrankenPHP and classic Nginx + PHP-FPM stack**  
A simple test setup comparing raw performance, latency, and throughput using tools like `wrk`, `wrk2`, and `k6`.

---

![Docker](https://img.shields.io/badge/docker-compose-blue?logo=docker)
![PHP](https://img.shields.io/badge/php-8.4-blue?logo=php)

## What’s Inside?

This repo contains two minimal PHP environments:

- `frankenphp` – Docker setup using **FrankenPHP** with built-in Caddy server
- `nginx` – Classic **Nginx + PHP-FPM** setup using separate containers

Both environments serve the exact same `index.php`:
```php
<?php
echo "Hello from " . ($_SERVER['SERVER_SOFTWARE'] ?? 'unknown server');
```

---

## Tools Used for Testing

- [`wrk`](https://github.com/wg/wrk) – High-throughput benchmarking tool
- [`wrk2`](https://github.com/giltene/wrk2) – Constant request rate benchmarking
- [`k6`](https://k6.io/) – Simulates realistic virtual users

---

## Requirements

- Docker & Docker Compose installed
- Optional: `wrk`, `wrk2`, `k6` installed locally for testing

---

## How to Run

1. Clone the repo
   ```bash
   git clone https://github.com/Gramzivi/frankenphp-vs-nginx.git
   cd frankenphp-vs-nginx
   ```

2. Start containers
   ```bash
   docker-compose up -d --build
   ```

3. Test endpoints
    - PHP-FPM: [http://localhost:8080](http://localhost:8080)
    - FrankenPHP: [http://localhost:8081](http://localhost:8081)

4. Run benchmarks from host:
   ```bash
   wrk -t4 -c100 -d10s http://localhost:8080 # Nginx + PHP-FPM
   wrk -t4 -c100 -d10s http://localhost:8081 # FrankenPHP
   ```
   For wrk2:
   ```bash
   wrk2 -t4 -c100 -d10s -R 5000 http://localhost:8080 # Nginx + PHP-FPM
   wrk2 -t4 -c100 -d10s -R 5000 http://localhost:8081 # FrankenPHP
   ```
   For k6
   ```bash
   k6 run k6TestNginx.js # Nginx + PHP-FPM
   k6 run k6TestFrankenPHP.js # FrankenPHP
   ```

---

## Sample Results

Benchmarks were executed on an AWS EC2 instance (6 vCPU, 4 GB RAM).  
You can read the full article here:

[FrankenPHP vs PHP-FPM: Benchmarks, Surprises, and One Clear Winner](https://vulke.medium.com/frankenphp-vs-php-fpm-benchmarks-surprises-and-one-clear-winner-173231cb1ad5)

---

## Feedback & Contributions

Pull requests and suggestions welcome!  
Feel free to fork, play with configurations, or open issues for improvements.

---

## License

MIT License