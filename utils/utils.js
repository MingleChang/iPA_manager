const fs = require('fs');
const path = require('path');
const IPAparser = require('app-info-parser/src/ipa');
const config = require('./config');
const database = require('../database');
const ipa = database.ipa;

class Utils {

    static folderExist(folderPath) {
        try {
            const stats = fs.statSync(folderPath);
            return stats.isDirectory();
        }catch(err) {
            return false;
        }
    }

    static createFolder(folderPath) {
        if(this.folderExist(folderPath)) {
            return true;
        }else {
            if (this.createFolder(path.dirname(folderPath))) {
                try {
                    fs.mkdirSync(folderPath);
                    return true;
                }catch (err) {
                    return false;
                }
            }else {
                return false;
            }
        }
    }
    //读取iPA文件信息
    static async readIpaFileInfo(file) {
        const parser = new IPAparser(file.path);
        const result = await parser.parse();
        return result;
    }
    //读取iPA文件信息，生成对应manifest.plist，将iPA和plist文件放到指定目录下
    static async saveIpaFile(file) {
        const ipaInfo = await this.readIpaFileInfo(file);
        const bundleId = ipaInfo.CFBundleIdentifier;
        const bundleVersion = ipaInfo.CFBundleShortVersionString;
        const buildVersion = ipaInfo.CFBundleVersion;
        const bundleName = ipaInfo.CFBundleName;
        const displayName = ipaInfo.CFBundleDisplayName;
        const publicPath = path.join(__dirname, '../public');
        const folderPath = path.join('ipa', bundleId, bundleVersion, buildVersion);
        const dirPath = path.join(publicPath, folderPath);
        const ipaPath = path.join(folderPath, file.name);
        this.createFolder(dirPath);
        fs.copyFileSync(file.path, path.join(dirPath, file.name));

        return {'bundleId':bundleId,
                'displayName':displayName,
                'bundleName':bundleName,
                'version':bundleVersion,
                'buildVersion':buildVersion,
                'ipaPath': ipaPath
                };
    }

    static async saveInfo(info) {
        try {
            let result = await ipa.findOne({
                where: {
                    bundleId: info.bundleId,
                    version: info.version,
                    buildVersion: info.buildVersion
                }
            });
            if (!result) {
                console.log('创建');
                result = await ipa.create(info);
            }else {
                await result.update(info);
            }
        }catch (err) {
        }
    }

    static async selectIpaGroup() {
        try {
            let results = await ipa.findAll({
                group: 'bundleId'
            });
            return results;
        }catch (err) {
            return null;
        }
    }

    static async selectIpaBundleId(bundleId) {
        try {
            let results = await ipa.findAll({
                where: {
                    bundleId: bundleId
                }
            });
            return results;
        }catch (err) {
            return null;
        }
    }
    static async selectIpaById(ipaId) {
        try {
            let result = await ipa.findOne({
                where: {
                    id: ipaId
                }
            });
            console.log('result:' + result);
            return result;
        }catch (err) {
            return null;
        }
    }

    static httpBaseUrl() {
        
        const baseUrl = 'http://' + config.host;
        return baseUrl;
    }

    static httpsBaseUrl() {
        const baseUrl = 'https://' + config.host;
            return baseUrl;
    }

    static getManifestPlistWithIpa(ipaFile) {
        const ipaPath = ipaFile.ipaPath;
        const bundleId = ipaFile.bundleId;
        const bundleVersion = ipaFile.version;
        const bundleName = ipaFile.bundleName;
        const baseUrl = this.httpsBaseUrl();
        const ipaUrl =  baseUrl + '/' + ipaPath;
        const plistTempPath = path.join(__dirname, '../public/plist/manifest_temp.plist');
        const plistTemp = fs.readFileSync(plistTempPath, 'utf-8');
        const plist = plistTemp.replace('{{url}}', ipaUrl).replace('{{bundleId}}', bundleId).replace('{{bundleVersion}}', bundleVersion).replace('{{bundleName}}', bundleName);
        console.log(plist);
        return plist;
    }
}

module.exports = Utils;