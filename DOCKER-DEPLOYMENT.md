# Docker Deployment Guide

## Files Created

### Backend
- ✅ `insurance-backend-final/Dockerfile` - Multi-stage build for Spring Boot
- ✅ `insurance-backend-final/.dockerignore` - Exclude unnecessary files

### Frontend
- ✅ `insurance-frontend-angular/Dockerfile` - Multi-stage build for Angular
- ✅ `insurance-frontend-angular/nginx.conf` - Nginx configuration with API proxy
- ✅ `insurance-frontend-angular/.dockerignore` - Exclude unnecessary files

### Orchestration
- ✅ `docker-compose.yml` - Container orchestration
- ✅ `Jenkinsfile` - CI/CD pipeline

## Quick Start

### Option 1: Docker Compose (Recommended)
```bash
cd "h:/Guvi Final"
docker-compose up -d
```

Access:
- Frontend: http://localhost
- Backend: http://localhost:8080
- H2 Console: http://localhost:8080/h2-console

### Option 2: Build Manually

**Backend:**
```bash
cd insurance-backend-final
docker build -t insurance-backend .
docker run -p 8080:8080 insurance-backend
```

**Frontend:**
```bash
cd insurance-frontend-angular
docker build -t insurance-frontend .
docker run -p 80:80 insurance-frontend
```

## Docker Commands

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Rebuild
```bash
docker-compose up -d --build
```

### Check Status
```bash
docker-compose ps
```

## Jenkins Pipeline

### Prerequisites
1. Jenkins installed
2. Docker plugin installed
3. Docker Hub credentials configured

### Setup
1. Create new Pipeline job in Jenkins
2. Point to repository
3. Use `Jenkinsfile` from root
4. Configure Docker Hub credentials as `docker-hub-credentials`

### Pipeline Stages
1. **Checkout** - Clone repository
2. **Build Backend** - Maven build
3. **Test Backend** - Run tests
4. **Build Frontend** - npm build
5. **Build Docker Images** - Create containers
6. **Push to Registry** - Push to Docker Hub
7. **Deploy** - Deploy with docker-compose
8. **Health Check** - Verify deployment

## Environment Variables

### Backend
```yaml
SPRING_PROFILES_ACTIVE: prod
SPRING_DATASOURCE_URL: jdbc:h2:mem:insurance_db
SPRING_DATASOURCE_USERNAME: sa
SPRING_DATASOURCE_PASSWORD: password
```

### Frontend
Configured via nginx.conf to proxy API calls to backend

## Troubleshooting

### Backend not starting
```bash
docker logs insurance-backend
```

### Frontend not loading
```bash
docker logs insurance-frontend
```

### Network issues
```bash
docker network ls
docker network inspect insurance-network
```

### Clean everything
```bash
docker-compose down -v
docker system prune -a
```

## Production Deployment

### Update docker-compose.yml
```yaml
services:
  backend:
    image: your-registry/insurance-backend:latest
    restart: always
    
  frontend:
    image: your-registry/insurance-frontend:latest
    restart: always
```

### Use external database
```yaml
backend:
  environment:
    - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/insurance
    - SPRING_DATASOURCE_USERNAME=postgres
    - SPRING_DATASOURCE_PASSWORD=secure_password
```

## Health Checks

Backend health check runs every 30s:
```bash
curl http://localhost:8080/api/statistics/dashboard
```

## Scaling

Scale backend:
```bash
docker-compose up -d --scale backend=3
```

## Monitoring

View resource usage:
```bash
docker stats
```

---

**Status**: ✅ Ready for deployment
**Last Updated**: 2025-10-30
