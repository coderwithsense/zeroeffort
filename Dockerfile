# 1. Use base Node.js image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# 4. Copy rest of the app
COPY . .

# 5. Prisma: generate client (make sure postinstall covers this)
RUN npx prisma db push
RUN npx prisma generate

# 6. Build the Next.js app
RUN npm run build

# 7. Expose port and start
EXPOSE 3000
CMD ["npm", "start"]
