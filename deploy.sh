#!/usr/bin/env sh
 
# ȷ���ű��׳������Ĵ���
set -e
 
# ���ɾ�̬�ļ�
npm run docs:build
 
# �������ɵ��ļ���
cd docs/.vuepress/dist
 
git init
git add -A
git commit -m 'deploy'
 
# ��������� https://<USERNAME>.github.io/<REPO>
#git push -f git@github.com:25122lxy/learn-ceiling.git master:gh-pages
git push -u origin main
 
cd -