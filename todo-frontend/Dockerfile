FROM node:19.9-alpine 
WORKDIR /app
COPY . .
RUN npm ci 
RUN npm run build
ENV NODE_ENV production
