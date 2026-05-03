# 🔗 Distributed URL Shortener

A **production-style URL Shortener** built with modern backend architecture, featuring **distributed ID generation, caching, load balancing, and analytics**.

This project is designed not just as a CRUD app, but as a **system design–oriented implementation** similar to real-world services like Bitly.

---

## 🚀 Features

* 🔗 Shorten long URLs
* ♻️ Idempotent URL creation (same URL → same short link)
* ⚡ Fast redirects using Redis caching
* 📊 Analytics (visit count, metadata)
* 🧠 Distributed ID generation using Zookeeper
* 🔁 Load balancing using Nginx
* 🐳 Fully Dockerized architecture
* 🎯 Single-page React frontend

---

## 🏗️ System Architecture

```
                   Client (React)
                        ↓
               Nginx (Load Balancer)

          ↓             ↓               ↓
 ┌───────────────┬───────────────┬───────────────┐
 │   Server 1    │   Server 2    │   Server 3    │    ---> Zookeeper (Distributed ID Service)
 └───────────────┴───────────────┴───────────────┘
          ↓             ↓               ↓
               Redis (Cache Layer)
                        ↓
             MongoDB Atlas (Database)

     
```

---

## 🧠 System Design Concepts Implemented

### 1. 🔑 Distributed ID Generation (Zookeeper)

* Avoids collisions across multiple servers
* Uses **range allocation strategy**
* Ensures scalability and uniqueness

---

### 2. ⚡ Caching Strategy (Redis)

#### Two-way caching:

* `hash → originalUrl` (for fast redirect)
* `originalUrl → hash` (for idempotency)

#### Cache-first approach:

```
Request → Redis → DB (fallback)
```

#### Benefits:

* Reduces DB load
* Improves latency significantly

---

### 3. 🔁 Idempotent URL Creation

* Same URL always returns same hash
* Achieved using:

  * DB unique constraint
  * Safe retry mechanism
  * Cache optimization

---

### 4. 📊 Analytics Tracking

* Tracks number of visits
* Uses **atomic DB updates (`$inc`)**
* Non-blocking updates for performance

---

### 5. ⚖️ Load Balancing (Nginx)

* Round-robin distribution across servers
* Passive health checks:

  * `max_fails`
  * `fail_timeout`
* Automatic failover

---

### 6. 🧩 Microservice-like Architecture

* Stateless backend servers
* Externalized dependencies:

  * MongoDB Atlas
  * Redis
  * Zookeeper

---

### 7. 🐳 Dockerized Infrastructure

* Multi-container setup:

  * Node servers
  * Redis
  * Zookeeper
  * Nginx
* Environment-based configuration
* Reproducible setup

---

## 📦 Tech Stack

### Backend

* Node.js + Express
* TypeScript
* MongoDB Atlas (Mongoose)

### Frontend

* React (Vite)
* Axios

### Configuration

* Docker & Docker Compose
* Nginx
* Redis
* Zookeeper

---

## ⚙️ Environment Variables

### Backend (`server/.env`)

```
PORT=5000
MONGO_URI=<your_mongodb_atlas_url>
REDIS_URL=
ZK_URL=
```

---

## 🚀 Getting Started

### 1. Clone repository

```
git clone <your-repo-url>
cd URL-Shortener
```
## ⚙️ Environment Variables

### Backend (`server/.env`)
```
PORT=5000
MONGO_URI=<your_mongodb_atlas_url>
REDIS_URL=
ZK_URL=
```
---
### Frontend (`client/.env`)

```
VITE_API_BASE_URL=
```
---

### 2. Run with Docker

```
docker-compose up --build
```

---

### 3. Access application

* 🌐 Frontend: http://localhost:5173
* 🌐 API via Nginx: http://localhost

---

## 📡 API Endpoints

### Create Short URL

```
POST /api/url
```

### Redirect

```
GET /:hash
```

### Analytics

```
GET /api/url/:hash/analytics
```

### Health Check

```
GET /health
```

---

## ⚡ Performance Optimizations

* Redis cache reduces DB hits
* Async visit tracking
* Connection reuse via Docker network
* Load balancing for horizontal scaling

---

## ⚠️ Trade-offs & Design Decisions

* ID gaps allowed (for scalability)
* DB as source of truth (not Redis)
* Passive health checks (Nginx OSS limitation)
* Cache TTL for memory control

---

## 🔮 Future Improvements

* Advanced analytics (IP, geo, timestamps)
* Rate limiting per user/IP
* Authentication system
* Kubernetes deployment
* Monitoring (Prometheus + Grafana)

---

## 🎯 Learning Outcomes

This project demonstrates:

* Distributed system design principles
* Scalability patterns
* Caching strategies
* Load balancing techniques
* Real-world backend architecture

---
