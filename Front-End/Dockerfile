# 1단계: build
FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# 2단계: nginx로 serve
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]