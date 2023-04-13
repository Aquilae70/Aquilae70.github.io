---
title: How to Build My Hexo Blog
tags:
  - Hexo
  - Blog
  - NexT theme
  - Github Pages
categories:
  - Guidance
lang: en
comments: true
excerpt: This is a simple guidance about how to build my hexo blog.
date: 2023-02-07 13:55:48
updated: 2023-04-13 15:45:00
---

This is a simple guidance about how to build my hexo blog. It's easier to find more better tutorial on the website.

## Create Repo

1. Go to Github website and create a repo called `{username}.github.io`.
2. Using npx and hexo-cli initial blog folder `npx hexo init {username}.github.io`, `cd` into folder and delete landscape theme related files.
3. Delete node_nodules `rm -r node_modules` and `npm install`.
4. Add repo to github origin.
   1. `git init`, `git add .`, `git commit`
   2. `git remote add origin git@github.com:kristine7q/kristine7q.github.io.git`
   3. `git push origin main`

## Add NexT Theme

1. Install [NexT](https://theme-next.js.org/docs/getting-started/), `npm install hexo-theme-next --save`
2. Using Alternate Theme Config `cp node_modules/hexo-theme-next/_config.yml _config.next.yml`
3. customize the config file.

## Post a New Article

1. set npm run script: `{"new": "hexo new"}`
2. `npm run new {title}`

## Use Github Page to Deploy

1. Create a new workflows in .github holder.
2. According to [github action](https://docs.github.com/en/actions/quickstart), set correct jobs and steps, or copy official document pages.yml file.
3. Blog can be deployed automatically.

## Buy a Domain Name

1. Go to IONOS, choose and buy a interested domain name.
2. Github > Setting > Pages, change custom domain.
