# iPA_manager
一个iOS的app内测分发系统，类似于蒲公英和fir.im的功能，可以搭建在公司内网用于内部测试和分发

## 安装

### 1.安装环境
如果本机没有安装Node.js需先安装Node.js, 可前往[Node.js官网](https://nodejs.org/en/)下载Node.js进行安装
### 2.下载并安装
clone本项目到本地，进入项目根目录运行`npm install`安装依赖库
### 3.修改配置
打开`/utils/config.js`文件，将`host`的值改为本机的ip地址(如有域名可使用域名)，port和ports若已被占用可修改为其他端口
### 4.自建SSL证书
由于苹果ipa的ota需要https方式，故在内网环境下建议使用自建证书的进行https认证
执行下面命令：
```
sudo openssl genrsa -des3 -out app.key 1024b  
sudo openssl req -new -key app.key -out app.csr  
sudo openssl rsa -in app.key -out server.key  
sudo openssl req -new -x509 -days 3650 -key server.key -out server.crt  
```
PS：在需要输入`Common Name (eg, fully qualified host name) []:`处请输入之前host的值(ip或域名)

命令执行完后将生成的文件`server.crt`和`server.key`把目录`/public/cert`下的两个文件进行替换
### 5.运行
在项目根目录下运行`npm start`
项目启动，成功

## 使用
### 1.上传ipa文件
可通过两种方式上传：  
* 浏览器打开地址http://ip:port/upload 进行ipa文件上传（没美化界面）
* 使用接口http://ip:port/upload 进行上传，该接口使用post请求以form-data格式上传
    POSTMAN模拟调用接口如下图：
    ![postman](https://raw.githubusercontent.com/MingleChang/img/master/2019/03/15/4.png)

### 2.安装ipa文件
iOS设备需和项目运行设备在同一网络环境
在iOS设备使用浏览器打开`http://ip:port`,如之前已有上传ipa文件可见如下界面：
![postman](https://raw.githubusercontent.com/MingleChang/img/master/2019/03/15/1.png)
此界面根据bundleId进行划分列表

PS:由于我们的SSL证书是自建证书不受系统信任，故第一次需要下载证书，请点击安装证书进行安装并设为信任

点击你需要下载的ipa的bundleId的行进入下一界面：
![postman](https://raw.githubusercontent.com/MingleChang/img/master/2019/03/15/2.png)

然后点击你需要下载的ipa的对应版本后面的`download`，弹出如下提示：
![postman](https://raw.githubusercontent.com/MingleChang/img/master/2019/03/15/3.png)

点击安装，然后退回系统主页面，即可看到下载进度
