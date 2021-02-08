# 使用 docker 搭建 vue cli 專案

## 建立專案 `image` 鏡像

- 拉取 `node` 環境

  ```js
  ocker pull node:12.20.1-buster
  ```

- 設置原代碼管理資料夾 (這邊是預設 `src` )

  ```js
  mkdir src
  ```

- 設置 `Dockerfile` 鏡像打包文件

  ```yml
  FROM node:12.20.1-buster   # 要使用的 Docker image 名稱
  ADD ./src /app             # 將本地的 src 複製到 Docker image 的 app 資料夾之下
  WORKDIR /app               # 指定 docker 執行起來時候的預設目錄位置
  ENV DEBCONF NOWARNING yes  # 用來設定本地環境變數
  RUN apt-get update -y && \ # 放 Linux 指令，用來執行安裝和設定這個 Image 需要的東西
    apt-get upgrade -y && \
    apt-get install -y \
    build-essential -y \
     curl \
     nmap \
     git \
     nano \
    && rm -rf /var/lib/apt/lists/* # 移除所有 指定路徑的檔案 (一旦容器生成後，就移除)
  RUN npm install -g @vue/cli@4.4.6  # 安裝 vue cli 開發工具
  ```

## 操作 `image`

- 打包專案 `image`

  ```js
  docker build -t [鏡像文件名稱]:[版本號] .
  ```

- 運行成 `container`

  ```js
  docker run -it --name vuecli-4 -v `pwd`/src:/app -p 8080:8080 -d naiky/vuecli:v1.2
  ```

  雖然目前容器已經運行了，但目前還沒有什麼服務。

- 進入容器

  ```js
  docker exec -it vuecli-4 bash
  ```

- 安裝 vue cli (在容器內)

  - 確認版本 `vue -V`

  - 安裝 vue cli `vue create [project name]`

- 退出容器 `exit`
