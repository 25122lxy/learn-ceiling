module.exports = {
    title: 'Code Diary',
    description: '技术笔记、编程心得分享',
    theme: 'vuepress-theme-yilia-plus',//切换主题
    base: '/learn-ceiling/',
    head: [
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
                        text: 'RabbitMQ',
                        link: '/handbook/Learn/RabbitMQ/1.RabbitMQ-简介及安装'
                        // collapsible: true, // 添加可折叠属性
                        // items: [
                        //     {text: '简介及安装', link: '/handbook/Learn/RabbitMQ/1.RabbitMQ-简介及安装'},
                        //     {text: '生产者和消费者', link: '/handbook/Learn/RabbitMQ/2.RabbitMQ-生产者和消费者'},
                        //     {text: '抽取工具类', link: '/handbook/Learn/RabbitMQ/3.RabbitMQ-抽取工具类'},
                        //     {text: '轮询分发消息', link: '/handbook/Learn/RabbitMQ/4.RabbitMQ-轮询分发消息'},
                        //     {text: '消息应答', link: '/handbook/Learn/RabbitMQ/5.RabbitMQ-消息应答'},
                        //     {text: '持久化', link: '/handbook/Learn/RabbitMQ/6.RabbitMQ-持久化'},
                        //     {text: '不公平分发&预取值', link: '/handbook/Learn/RabbitMQ/7.RabbitMQ-不公平分发&预取值'},
                        //     {text: '发布确认', link: '/handbook/Learn/RabbitMQ/8.RabbitMQ-发布确认'},
                        //     {text: '交换机', link: '/handbook/Learn/RabbitMQ/9.RabbitMQ-交换机'},
                        //     {text: '死信队列', link: '/handbook/Learn/RabbitMQ/10.RabbitMQ-死信队列'},
                        //     {text: '延迟队列', link: '/handbook/Learn/RabbitMQ/11.RabbitMQ-延迟队列'}
                        //
                        // ],

                    },
                ]
            },

            {
                text: 'Interview',
                items: [
                    {text: 'Java基础', link: '/handbook/Interview/01-Java基础'},
                    {text: 'Redis', link: '/handbook/Interview/02-Redis'},
                    {text: 'MySQL', link: '/handbook/Interview/03-MySQL'},
					{text: 'Java框架', link: '/handbook/Interview/04-Java框架'}
                ]
            },
            {text: 'Project', link: '/Project'},
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
                title: "Interview",
                // path: '/handbook/Interview/01-Java基础',
                // collapsable: false, // 不折叠
                children: [
                    {title: "Java基础", collapsable: true,path: "/handbook/Interview/01-Java基础"},
                    {title: 'Redis', path: "/handbook/Interview/02-Redis"},
                    {title: "MySQL", path: "/handbook/Interview/03-MySQL"},
					{title: "Java框架", path: "/handbook/Interview/04-Java框架"}
                ],
            },
            {
                title: "Learn",
                // path: '/handbook/Learn/RabbitMQ/1.RabbitMQ-简介及安装',
                // collapsable: false, // 不折叠
                children: [
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
