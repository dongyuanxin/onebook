const langs = [
    { title: 'English', path: '/home', matchPath: /^\/(home|question|contact)/ }, 
    { title: '简体中文', path: '/zh-Hans/', matchPath: /^\/zh-Hans/ },
];

myNav = {
    default: [
        { 
            title: 'Home', path: '/home'
        },
        { 
            title: 'FAQ', path: '/question' 
        },
        {
            title: 'Contact us', path: '/contact'
        },
        { 
            title: 'Language', type: 'dropdown', items: langs 
        },
    ],
    'zh-Hans': [
        { 
            title: '首页', path: '/zh-Hans/' 
        },
        { 
            title: '常见问题', path: '/zh-Hans/question' 
        },
        {
            title: '联系我们', path: '/zh-Hans/contact'
        },
        { 
            title: '语言', type: 'dropdown', items: langs 
        }
    ]
};

docute.isDev = false;

docute.init({
    url: docute.isDev? '.' : 'http://193.112.241.232:8000',
    routeMode: 'history', // or be 'hash'
    landing: {
        source: 'landing.html',
    },
    nav: myNav,
    icons: [{
        icon: 'github',
        label: 'Contribute on GitHub',
        link: 'https://github.com/dongyuanxin/onebook'
    }]
});