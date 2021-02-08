FROM node:12.20.1-buster
ADD ./src /app
WORKDIR /app
ENV DEBCONF NOWARNING yes
RUN apt-get update -y && \
  apt-get upgrade -y && \
  apt-get install -y \
  build-essential -y \
  curl \
  nmap \
  git \
  nano \
  && rm -rf /var/lib/apt/lists/*
RUN npm install -g @vue/cli@4.4.6