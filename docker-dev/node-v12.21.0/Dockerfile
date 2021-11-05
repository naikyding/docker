FROM node:12.20.1-buster
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
RUN npm i -g create-nuxt-app