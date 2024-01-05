module.exports = {
    title: 'Code Diary',
    description: '技术笔记、编程心得分享',
    theme: 'vuepress-theme-yilia-plus',//切换主题
    base: '/learn-ceiling/',
    head: [
			[
				"meta",
				{
					name:"referrer",
					content:"no-referrer"
				}
			],
			['link', {rel: 'icon', href: '/hand.jpg'}]
    ],
    //base: '/',
    locales: {
        '/': {
            lang: 'zh-CN'//时间中文格式
        }
    },
    themeConfig: {
        sidebarDepth: 4,
        // 子侧边栏
        subSidebar: true,
        nav: [
            {text: 'Index', link: '/'},
            {
                text: 'Learn',
                items: [
                    {
                        text: 'Microservice',
                        link: '/handbook/Learn/Microservice/01-初识微服务'
                    },
                    {
                        text: 'RabbitMQ',
                        link: '/handbook/Learn/RabbitMQ/1.RabbitMQ-简介及安装'
                    },
                    {
                        text: 'Redis',
                        link: '/handbook/Learn/Redis/0-Redis-Basic'
                    },
					{
                        text: 'MySQL',
                        link: '/handbook/Learn/SQL/SQL案例'
                    },
                    {
                        text: '前端快速入门',
                        link: '/handbook/Learn/前端快速入门/01-HTML-CSS'
                    },
                    {
                        text: 'Linux',
                        link: '/handbook/Learn/Linux/01-Linux入门'
                    }
                ]
            },
            {
                text: 'Project',
                items: [
                    {
                        text: '社区精品汇',
                        link: '/handbook/Learn/RabbitMQ/1.RabbitMQ-简介及安装'
                    }
                ]
            },
            {
                text: 'Interview',
                items: [
                    {text: '查漏补缺', link: '/handbook/Interview/00-查漏补缺.md'},
                    {text: 'Java基础', link: '/handbook/Interview/01-Java基础'},
                    {text: 'Redis', link: '/handbook/Interview/02-Redis'},
                    {text: 'MySQL', link: '/handbook/Interview/03-MySQL'},
                    {text: 'Java框架', link: '/handbook/Interview/04-Java框架'},
                    {text: '微服务', link: '/handbook/Interview/05-微服务'},
                    {text: '消息中间件', link: '/handbook/Interview/06-消息中间件'},
					{text: 'Java集合', link: '/handbook/Interview/07-Java集合'},
					{text: 'Java并发', link: '/handbook/Interview/08-Java并发'},
					{text: 'JVM', link: '/handbook/Interview/09-JVM'},
					{text: 'Linux', link: '/handbook/Interview/10-Linux'},
					{text: 'Hadoop', link: '/handbook/Interview/11-Hadoop'},
					{text: 'Hive', link: '/handbook/Interview/12-Hive'},
					{text: 'Spark', link: '/handbook/Interview/13-Spark'},
					{text: '数据采集工具', link: '/handbook/Interview/16-数据采集工具'}

                ]
            },
            {
                text: 'lxy25122-blog',
                items: [
                    {text: 'Github', link: 'https://github.com/lxy25122'},
                    {text: 'Gitee', link: 'https://gitee.com/tjlxy'}
                ]
            }
        ],
        sidebar: [
            //'auto',//开启右侧标题栏
            {
                title: '学前必读',
                path: '/',
                collapsable: false, // 不折叠
                // children: [
                //     {title: "学前必读", path: "/"}
                // ]
            },
            {
                title: "Learn",
                // path: '/handbook/Learn/RabbitMQ/1.RabbitMQ-简介及安装',
                // collapsable: false, // 不折叠
                collapsable: true, // 折叠
                children: [
                    {
                        title: 'Microservice',//添加一层子标题
                        collapsable: true, // 折叠
                        children: [
                            {title: '初识微服务', path: '/handbook/Learn/Microservice/01-初识微服务'},
                            {title: 'Eureka注册中心', path: '/handbook/Learn/Microservice/02-Eureka注册中心'},
                            {title: 'Ribbon负载均衡', path: '/handbook/Learn/Microservice/03-Ribbon负载均衡'},
                            {title: 'Nacos注册中心', path: '/handbook/Learn/Microservice/04-Nacos注册中心'},
                            {title: 'Nacos配置管理', path: '/handbook/Learn/Microservice/05-Nacos配置管理'},
                            {title: 'Feign远程调用', path: '/handbook/Learn/Microservice/06-Feign远程调用'},
                            {title: 'Gateway服务网关', path: '/handbook/Learn/Microservice/07-Gateway服务网关'},
                            {title: 'Docker-介绍及安装', path: '/handbook/Learn/Microservice/08-Docker-介绍及安装'},
                            {title: 'Docker-基础', path: '/handbook/Learn/Microservice/09-Docker-基础'},
                            {title: 'Docker-项目部署', path: '/handbook/Learn/Microservice/10-Docker-项目部署'},
                            {title: 'RabbitMQ-快速入门', path: '/handbook/Learn/Microservice/11-RabbitMQ-快速入门'},
                            {title: 'RabbitMQ-SpringAMQP', path: '/handbook/Learn/Microservice/12-RabbitMQ-SpringAMQP'}

                        ]
                    },
                    {
                        title: 'RabbitMQ',//添加一层子标题
                        collapsable: true, // 折叠
                        children: [
                            {title: '简介及安装', path: '/handbook/Learn/RabbitMQ/1.RabbitMQ-简介及安装'},
                            {title: '生产者和消费者', path: '/handbook/Learn/RabbitMQ/2.RabbitMQ-生产者和消费者'},
                            {title: '抽取工具类', path: '/handbook/Learn/RabbitMQ/3.RabbitMQ-抽取工具类'},
                            {title: '轮询分发消息', path: '/handbook/Learn/RabbitMQ/4.RabbitMQ-轮询分发消息'},
                            {title: '消息应答', path: '/handbook/Learn/RabbitMQ/5.RabbitMQ-消息应答'},
                            {title: '持久化', path: '/handbook/Learn/RabbitMQ/6.RabbitMQ-持久化'},
                            {title: '不公平分发&预取值', path: '/handbook/Learn/RabbitMQ/7.RabbitMQ-不公平分发&预取值'},
                            {title: '发布确认', path: '/handbook/Learn/RabbitMQ/8.RabbitMQ-发布确认'},
                            {title: '交换机', path: '/handbook/Learn/RabbitMQ/9.RabbitMQ-交换机'},
                            {title: '死信队列', path: '/handbook/Learn/RabbitMQ/10.RabbitMQ-死信队列'},
                            {title: '延迟队列', path: '/handbook/Learn/RabbitMQ/11.RabbitMQ-延迟队列'}

                        ]
                    },
                    {
                        title: 'Redis',//添加一层子标题
                        collapsable: true, // 折叠
                        children: [
                            {title: 'Redis-Basic', path: '/handbook/Learn/Redis/0-Redis-Basic'},
                        ]
                    },
                    {
                        title: 'SQL',//添加一层子标题
                        collapsable: true, // 折叠
                        children: [
                            {title: 'MySQL-语法', path: '/handbook/Learn/SQL/SQL案例'},
                            {title: 'MySQL-Exercise', path: '/handbook/Learn/SQL/MySQL-Exe'}
                        ]
                    },
                    {
                        title: '前端快速入门',//添加一层子标题
                        collapsable: true, // 折叠
                        children: [
                            {title: '01-HTML-CSS', path: '/handbook/Learn/前端快速入门/01-HTML-CSS'},
                            {title: '02-JavaScript', path: '/handbook/Learn/前端快速入门/02-JavaScript'},
                            {title: '03-Vue', path: '/handbook/Learn/前端快速入门/03-Vue'}
                        ]
                    },
                    {
                        title: 'Linux',//添加一层子标题
                        collapsable: true, // 折叠
                        children: [
                            {title: '01-Linux入门', path: '/handbook/Learn/Linux/01-Linux入门'},
                            {title: '02-VI、VIM 编辑器-√', path: '/handbook/Learn/Linux/02-VI、VIM 编辑器-√'},
                            {title: '03-网络配置-√', path: '/handbook/Learn/Linux/03-网络配置-√'},
                            {title: '04-系统管理', path: '/handbook/Learn/Linux/04-系统管理'},
                            {title: '05-常用基本命令-√', path: '/handbook/Learn/Linux/05-常用基本命令-√'},
                            {title: '06-软件包管理', path: '/handbook/Learn/Linux/06-软件包管理'},
                            {title: '07-克隆虚拟机', path: '/handbook/Learn/Linux/07-克隆虚拟机'},
                            {title: '08-Shell', path: '/handbook/Learn/Linux/08-Shell'},
                        ]
                    },
                ],
            },
            {
                title: "Project",
                // path: '/handbook/Learn/RabbitMQ/1.RabbitMQ-简介及安装',
                // collapsable: false, // 不折叠
                children: [
                    {
                        title: '社区精品汇',//添加一层子标题
                        collapsable: true, // 折叠
                        children: [
                            {title: '项目概述', path: '/handbook/Learn/RabbitMQ/1.RabbitMQ-简介及安装'},
                            // {title: '生产者和消费者', path: '/handbook/Learn/RabbitMQ/2.RabbitMQ-生产者和消费者'},
                            // {title: '抽取工具类', path: '/handbook/Learn/RabbitMQ/3.RabbitMQ-抽取工具类'},
                            // {title: '轮询分发消息', path: '/handbook/Learn/RabbitMQ/4.RabbitMQ-轮询分发消息'},
                            // {title: '消息应答', path: '/handbook/Learn/RabbitMQ/5.RabbitMQ-消息应答'},
                            // {title: '持久化', path: '/handbook/Learn/RabbitMQ/6.RabbitMQ-持久化'},
                            // {title: '不公平分发&预取值', path: '/handbook/Learn/RabbitMQ/7.RabbitMQ-不公平分发&预取值'},
                            // {title: '发布确认', path: '/handbook/Learn/RabbitMQ/8.RabbitMQ-发布确认'},
                            // {title: '交换机', path: '/handbook/Learn/RabbitMQ/9.RabbitMQ-交换机'},
                            // {title: '死信队列', path: '/handbook/Learn/RabbitMQ/10.RabbitMQ-死信队列'},
                            // {title: '延迟队列', path: '/handbook/Learn/RabbitMQ/11.RabbitMQ-延迟队列'}

                        ]
                    },
                ],
            },

            {
                title: "Interview",
                // path: '/handbook/Interview/01-Java基础',
                // collapsable: false, // 不折叠
                children: [
                    {title: "查漏补缺", collapsable: true,path: "/handbook/Interview/00-查漏补缺"},
                    {title: "Java基础", collapsable: true,path: "/handbook/Interview/01-Java基础"},
                    {title: 'Redis', path: "/handbook/Interview/02-Redis"},
                    {title: "MySQL", path: "/handbook/Interview/03-MySQL"},
					{title: "Java框架", path: "/handbook/Interview/04-Java框架"},
					{title: "微服务", path: "/handbook/Interview/05-微服务"},
					{title: "消息中间件", path: "/handbook/Interview/06-消息中间件"},
					{title: "Java集合", path: "/handbook/Interview/07-Java集合"},
					{title: "Java并发", path: "/handbook/Interview/08-Java并发"},
					{title: "JVM", path: "/handbook/Interview/09-JVM"},
					{title: "Linux", path: "/handbook/Interview/10-Linux"},
					{title: "Hadoop", path: "/handbook/Interview/11-Hadoop"},
					{title: "Hive", path: "/handbook/Interview/12-Hive"},
					{title: "Spark", path: "/handbook/Interview/13-Spark"},
					{title: "数据采集工具", path: "/handbook/Interview/16-数据采集工具"}
                ],
            },


        ],

        /* vuepress-theme-yilia-plus 配置 */
        yilia_plus: {
            // github-corner(关闭请设置为false)
            github: {
                url: "https://github.com/25122lxy/"
            },
            footer: {
                // 网站成立年份(若填入年份小于当前年份，则显示为 2018-2019 类似的格式)
                since: 2023,
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
