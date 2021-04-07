### 服务器地址
- 106.75.122.252 3000

### 手动打包部署步骤
1. npm run build 打包项目
2. 将目录中的
    - .nuxt 
    - static 
    - nuxt.config.js 
    - package.json 
    - package-lock.json
    打包成压缩文件 realworld-nuxtjs.zip
3. 通过远程传输 将zip包放到服务器指定文件夹中 scp ./realworld-nuxtjs.zip root@xxx.xx.xx.xx
4. 在服务器中加压zip unzip realworld-nuxtjs.zip
5. 执行npm install下载第三方依赖包（未安装nodejs 需先下载Linux的nodejs）
6. 执行启动命令 npm run start
7. 使用pm2启动应用
    - 下载 npm i -g pm2
    - 启动 pm2 start npm -- start

### 自动化部署步骤
1. 在github中配置access_token
    - settings > Developer settings > Personal access tokens > Generate new token
2. 在github创建项目仓库
3. 配置部署脚本main.yml,步骤：
    - 下载源码
    - 打包构建
    - 发布Release
    - 上传构建结果Release
    - 部署到服务器
4. 在github项目仓库 settings > secrets 中配置HOST,PORT,USERNAME,PASSWORD,TOKEN
5. 开始执行发布命令
    - git add .
    - git commit -m '发布部署v0.1.0'
    - git tag v0.1.0 创建标签
    - git tag 查看标签
    - git push origin v0.1.0