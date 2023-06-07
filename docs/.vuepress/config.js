module.exports = {
	//publicPath: './', 
	//base: 'E:/Work/YiTongBao/Code/learn-ceiling/docs/.vuepress/dist/',
	title: 'learning-ceiling',
	description: 'learning-ceiling',
	theme: 'reco',//切换主题
	base: '/learn-ceiling/',
	//base: '/',
	locales: {
		'/': {
			lang: 'zh-CN'//时间中文格式
			}
	},
    themeConfig: {
		// 子侧边栏
		subSidebar: true,
        nav: [
            { text: '首页', link: '/' },
				{ 
                text: 'lxy25122-blog', 
                items: [
                    { text: 'Github', link: 'https://github.com/lxy25122' },
                    { text: 'Gitee', link: 'https://gitee.com/tjlxy' }
						]
				}
			],
        sidebar: [
			//'auto',//开启右侧标题栏
            {
                title: '欢迎学习',
                path: '/',
                collapsable: false, // 不折叠
                children: [
                    { title: "学前必读", path: "/" }
                ]
            },
            {
              title: "基础学习",
              path: '/handbook/01-Java基础',
              collapsable: false, // 不折叠
              children: [
                { title: "Java基础", path: "/handbook/01-Java基础" },
                { title: "Redis", path: "/handbook/02-Redis" }
              ],
            }
          ]
		  
    },
	
}