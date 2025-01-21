// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "Home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-pubs",
          title: "Pubs",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-students",
          title: "Students",
          description: "members of the lab or group",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "nav-service",
          title: "Service",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/service/";
          },
        },{id: "nav-workshop",
          title: "Workshop",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/workshop/";
          },
        },{id: "post-a-post-with-image-galleries",
      
        title: "a post with image galleries",
      
      description: "this is what included image galleries could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/photo-gallery/";
        
      },
    },{id: "post-a-post-with-code",
      
        title: "a post with code",
      
      description: "an example of a blog post with some code",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2015/code/";
        
      },
    },{id: "post-a-post-with-images",
      
        title: "a post with images",
      
      description: "this is what included images could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2015/images/";
        
      },
    },{id: "post-a-post-with-formatting-and-links",
      
        title: "a post with formatting and links",
      
      description: "march &amp; april, looking forward to summer",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2015/formatting-and-links/";
        
      },
    },{id: "mem-webconf-2024",
          title: 'WebConf 2024',
          description: "this is what included images could look like",
          section: "Mem",handler: () => {
              window.location.href = "/mem/2024/webconf/";
            },},{id: "news-our-paper-unlink-to-unlearn-simplifying-edge-unlearning-in-gnns-is-accepted-by-webconf2024-congrats-to-jiajun",
          title: 'Our paper Unlink to Unlearn: Simplifying Edge Unlearning in GNNs is accepted by...',
          description: "",
          section: "News",},{id: "news-three-papers-are-accepted-by-acl2024-about-model-editing-bias-in-knowledge-conflict-and-confidence-alignment-congrats-to-hexiang-wanli-and-shuchang",
          title: 'Three papers are accepted by ACL2024 about model editing, bias in knowledge conflict,...',
          description: "",
          section: "News",},{id: "news-three-papers-are-accepted-by-recsys2024-about-safety-in-recommender-system-and-contrastive-leanring-in-gnn-based-recommendation-congrats-to-yuezihan-kaike-and-yunfan",
          title: 'Three papers are accepted by RecSys2024 about safety in recommender system and contrastive...',
          description: "",
          section: "News",},{id: "news-will-serve-as-an-standing-reviewer-for-tacl",
          title: 'Will serve as an standing reviewer for TACL.',
          description: "",
          section: "News",},{id: "news-our-paper-the-fall-of-rome-is-accepted-by-emnlp2024-finding-congrats-to-wanli",
          title: 'Our paper The Fall of ROME is accepted by EMNLP2024 finding. Congrats to...',
          description: "",
          section: "News",},{id: "news-will-serve-as-spc-for-webconf-short-ijcai-and-sigir",
          title: 'Will serve as SPC for WebConf(Short), IJCAI and SIGIR.',
          description: "",
          section: "News",},{id: "news-we-will-hold-the-1st-workshop-on-human-centered-recommender-systems-on-www-25-contributions-are-welcome",
          title: 'We will hold The 1st Workshop on Human-Centered Recommender Systems on WWW 25....',
          description: "",
          section: "News",},{id: "news-our-paper-personalized-denoising-implicit-feedback-for-robust-recommender-system-is-accepted-by-webconf2025-congrats-to-kaike",
          title: 'Our paper Personalized Denoising Implicit Feedback for Robust Recommender System is accepted by...',
          description: "",
          section: "News",},{id: "people-chenzhenxing",
          title: 'Chenzhenxing',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/chenzhenxing/";
            },},{id: "people-haowenli",
          title: 'Haowenli',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/haowenli/";
            },},{id: "people-jiajun",
          title: 'Jiajun',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/jiajun/";
            },},{id: "people-pujiayue",
          title: 'Pujiayue',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/pujiayue/";
            },},{id: "people-shaliu",
          title: 'Shaliu',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/shaliu/";
            },},{id: "people-tangrui",
          title: 'Tangrui',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/tangrui/";
            },},{id: "people-tanhexiang",
          title: 'Tanhexiang',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/tanhexiang/";
            },},{id: "people-wanli",
          title: 'Wanli',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/wanli/";
            },},{id: "people-xunliu",
          title: 'Xunliu',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/xunliu/";
            },},{id: "people-zongdanyang",
          title: 'Zongdanyang',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/zongdanyang/";
            },},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{id: "workshop-nlp4rec-2020",
          title: 'NLP4REC 2020',
          description: "The WSDM 2020 Workshop on Natural Language Processing for Recommendations",
          section: "Workshop",handler: () => {
              window.location.href = "/workshop/1_workshop/";
            },},{id: "workshop-hcrs-thewebconf-2025",
          title: 'HCRS@TheWebConf 2025',
          description: "The 1st Workshop on Human-Centered Recommender Systems",
          section: "Workshop",handler: () => {
              window.location.href = "/workshop/2_workshop/";
            },},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
