module.exports = {
	//publicPath: './', 
	//base: 'E:/Work/YiTongBao/Code/learn-ceiling/docs/.vuepress/dist/',
	title: 'learning-ceiling',
	description: 'learning-ceiling',
	theme: 'vuepress-theme-yilia-plus',//切换主题
	base: '/learn-ceiling/',
	//base: '/',
	locales: {
		'/': {
			lang: 'zh-CN'//时间中文格式
			}
	},
    themeConfig: {
		 sidebarDepth: 3,
		// 子侧边栏
		subSidebar: true,
        nav: [
				{ text: 'Index', link: '/' },
				{ text: 'Learn', link: '/handbook/01-Java基础' },
				{
					text: 'Interview',
					items: [
						{text: 'Java', link: '/handbook/Interview/01-Java基础'},
						{text: 'Redis', link: '/handbook/Interview/02-Redis'},
						{text: 'MySQL', link: '/handbook/Interview/03-MySQL'}
					]
				},
				{ text: 'Project', link: '/Project' },
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
                title: "Interview",
                path: '/handbook/01-Java基础',
                collapsable: false, // 不折叠
                children: [
                    {title: "Java基础", path: "/handbook/Interview/01-Java基础"},
                    {title: "Redis", path: "/handbook/Interview/02-Redis"},
                    {title: "MySQL", path: "/handbook/Interview/03-MySQL"}
                ],
            }
            
          ],
		  
	/* vuepress-theme-yilia-plus 配置 */
	yilia_plus: {
		// github-corner(关闭请设置为false)
		github: {
			url: "https://github.com/25122lxy/"
		},
		footer: {
			// 网站成立年份(若填入年份小于当前年份，则显示为 2018-2019 类似的格式)
			since: 20,
			// 网站作者(关闭请设置为false)
			author: '<a href="https://github.com/25122lxy/" target="_blank">lxy25122</a>',
			// 访问量统计功能(不蒜子)
			busuanzi: {
				// 是否启用(关闭请设置为false)
				enable: false
			}
		}
	}
		  
    },
	plugins: [
    [
      'vuepress-plugin-helper-live2d', {
        // 是否开启控制台日志打印(default: false)
        log: false,
        live2d: {
          // 是否启用(关闭请设置为false)(default: true)
          enable: true,
          // 模型名称(default: hibiki)>>>取值请参考：
          // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
          model: 'hibiki',
          display: {
            position: "right", // 显示位置：left/right(default: 'right')
            width: 135, // 模型的长度(default: 135)
            height: 300, // 模型的高度(default: 300)
            hOffset: 65, //  水平偏移(default: 65)
            vOffset: 0, //  垂直偏移(default: 0)
          },
          mobile: {
            show: false // 是否在移动设备上显示(default: false)
          },
          react: {
            opacity: 0.8 // 模型透明度(default: 0.8)
          }
        }
      }
	 ],
	['cursor-effects']
	]
}