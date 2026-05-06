# -----------------------------
# Stage 1: Build frontend
# -----------------------------
FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY ./client/package*.json ./

RUN npm install

COPY ./client .

ENV VITE_API_BASE_URL=/api/url

RUN npm run build


# -----------------------------
# Stage 2: Nginx production image
# -----------------------------
FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=frontend-builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]