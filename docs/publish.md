# 构建发布

构建发布目前只支持svn

其实是之前所在团队，没有在构建平台上打包发布，只是在本地打包后上传svn。流程比较繁琐，整合了一些脚本实现一键发布（这功能其实也并没多大用处）

提供的功能：

1. 选择svn目录
2. 构建
3. 保存svn目录，下次进入页面直接展示
4. 采用socket，展示构建进度

脚本：

打包

```
npm run build
```

切换到svn目录

```
cd /svn
```

遍历删除所有文件

```
svn rm xxx
```

提交删除

```
svn commit -m "delete"
```

拷贝dist文件

...


添加新文件


```
svn add . --force
```

提交

```
svn commit -m "add"
```