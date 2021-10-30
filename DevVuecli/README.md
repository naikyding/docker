# 使用 docker 搭建 vue 開發環境
這個方法是使用 `docker` 來建立開發 `vue` 的環境(`image`)，且在 `container` 中建立 `vue cli` 專案，
再利用 `-v` 「本機資料夾」與「容器內部資料夾」雙向綁定，來達成「專案在本機」、「環境在 docker」的實現。

## 建立專案 `image` 鏡像

- 拉取 `node` 環境
  這是你打包 `image` 需要的環境，若沒有先拉取，打包時還是才拉取下來。

  ```js
  docker pull node:12.20.1-buster
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
  docker run -it --name [容器顯示名稱] -v $PWD/src:/app -p 8080:8080 -d [版本名稱]:[版號]
  ```
  命令說明：
  - `--rm` 執行完後移除。當要使用功能的時候開 container，功能處理完後移除 container
  - `-it` 通常需要跟 `container` 互動，因此會加這個選項
  - `-v $PWD:/source` 把本機目錄綁定到 container，$PWD 為執行指令時的當下目錄，`/source` 則是 container 裡的絕對路徑
  - `-w` /source 是進去 container 時，預設會在哪個路徑下執行指令

  雖然目前容器已經運行了，但目前還沒有什麼服務。

- 進入容器

  ```js
  docker exec -it vuecli-4 bash
  ```

- 安裝 vue cli (在容器內)

  - 確認版本 `vue -V`

  - 安裝 vue cli `vue create [project name]`
    在你安裝專案的同時，「本機」也會同步 `container` 的資料。

- 退出容器 `exit`
