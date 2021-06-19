## **建立本地專案**

這邊例子是建立一個 `express` 專案

```bash
express --view ejs --css sass deploy-docker-express-heroku
```

## 創建 **Heroku app**

必須先註冊 `heroku` 帳號，且安裝 `heroku cli` (也可以在 heroku 網站操作)

- 登入

    ```
    heroku login
    ```

- 創建 `heroku app`

    ```bash
    heroku create [專案名稱]
    ```

## Dockerize App 容器化應用程式


打包 `image` 是以 `Dockerfile` 檔案為入口 (Dockerfile 詳細寫法 [🔗](https://philipzheng.gitbook.io/docker_practice/dockerfile/instructions))

- 建立 `Dockerfile`

    ```docker
    FROM node:12.21.0 # 使用什麼 image 環境

    WORKDIR /app # 工作的目錄

    COPY ./ ./ # 復製專案根目錄到 工作的目錄

    RUN npm install # 在當前 image 基底上執行的命令

    CMD node ./bin/www # 啟動容器時，執行的命令
    ```

### 測試容器化文件

```docker
docker build -t docker-express .
```

## 部署到 `Heroku`

我們已經確認 `image` 沒問題了，就可以把這個 `image` 推到 `heroku`

- `heroku` 容器登入

    ```bash
    heroku container:login
    ```

- 推送 `image` 到 `heroku` 容器中心

    ```bash
    heroku container:push web --app docker-express-app
    ```

- 打版號

    ```docker
    heroku container:release web --app docker-express-app
    ```

## 開啟 app


```bash
heroku open --app docker-express-app
```