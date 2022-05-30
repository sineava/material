``` bash
# 目录结构图
|- ci 
  |- Dockerfile
  |- docker.sh
  |- index.mjs
  |- nginx.conf
|- package.json
```

- package.json
```json
{
  "scripts": {
    "ci": "npx zx ./ci/index.mjs"
  }
}
```

- Dockerfile
``` Dockerfile
FROM nginx:alpine
COPY ../dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 10086
```

- docker.sh
``` bash
#!/bin/sh
PORT=10086
IMAGE=tobacco
CONTAINER=tobacco

# step1
docker pull nginx:alpine
docker stop $CONTAINER
docker rm $CONTAINER
docker image rm $IMAGE:v1
# 请先生成dist在执行./deploy.sh
docker build -t $IMAGE:v1 .
# 镜像80映射到指定端口(指定name与tag避免重复生成)
docker run -d --name $CONTAINER -p $PORT:$PORT $IMAGE:v1

# step2
# 移除文件夹
rm -rf ./dist
rm ./Dockerfile
rm ./nginx.conf
rm ./docker.sh
```

- index.mjs
```js
#!/usr/bin/env zx
import { question } from 'zx'

const sure = await question(
  chalk.bold.red('请确认容器名/镜像/端口是否属于本项目(Y|N)?')
)
const build = await question(
  chalk.bold.blue('是否重新打包(Y|N)?')
)
if (sure.toUpperCase() === 'Y') {
  await $`cd ..`
  if (build.toUpperCase() === 'Y') {
    await $`vite build`
  }
  await $`scp -r ./dist ./docker/docker.sh ./docker/Dockerfile ./docker/nginx.conf root@175.24.45.198:/root`
  await $`ssh root@175.24.45.198 'cd /root;chmod 777 ./docker.sh;./docker.sh'`
}
```
- nginx.conf
```nginx
server { 
    listen       10086;

    location / {
        root /usr/share/nginx/html/;
        index  index.html;
        try_files $uri $uri/ /index.html;
    }

    location /prod-api/ {
        proxy_pass  http://175.24.45.198:9999/;
    }
}
```