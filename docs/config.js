const langs = [
    { title: 'English', path: '/home', matchPath: /^\/(home|question|contact)/ }, 
    { title: '简体中文', path: '/zh-Hans/', matchPath: /^\/zh-Hans/ },
];

myNav = {
    default: [
        { 
            title: 'Home', path: '/home' // source: /path/to/thefile.md or source: /url/to/thefile.md, can be github file
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
    // root directory
    url: docute.isDev? '.' : 'http://193.112.241.232:8000',
    // mode of route
    routeMode: 'history', // or be 'hash'
    landing: {
        // source
        source: 'landing.html',
        // inline markdown
        // markdown: '# The landing page using inline markdown',
        // inline html
        // html: '<h2>The landing page using inline html</h2>',
        // or vue component
    },

    // config sidebar
    // sidebar: false, // hide the sidebar
    // disableSidebarToggle: true, // disable the sidebar toggle
    // toc of the sidebar
    // tocVisibleDepth: 3, // show the toc of level 3 
    // custom toc is also ok


    // nav: langs,
    nav: myNav,
    // config icons in the navigate bar
    // github twitter edit menu link search close info
    // custom icon is also ok
    icons: [{
        icon: 'github',
        label: 'Contribute on GitHub',
        link: 'https://github.com/dongyuanxin/onebook'
    }]

    // markdown setting: see the docs of marked
    /*
    marked: {
        smartypants: true
        // ...
    }
    */
   
    // tools for debug
    // debug: true
});