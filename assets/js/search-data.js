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
        },{id: "post-tikz-gallery",
      
        title: "TikZ Gallery",
      
      description: "A collection of TikZ examples in my papers.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/tikz-gallery/";
        
      },
    },{id: "post-embedding-heatmaps-in-latex-tables",
      
        title: "Embedding Heatmaps in LaTeX Tables",
      
      description: "How to use TikZ to add dynamic heatmap shading to LaTeX table cells.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/latex-table-heatmap/";
        
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
          section: "News",},{id: "news-will-serve-as-an-ac-for-arr",
          title: 'Will serve as an AC for ARR.',
          description: "",
          section: "News",},{id: "news-our-paper-fact-level-confidence-calibration-and-self-correction-is-accepted-by-sigir-2025",
          title: 'Our paper Fact-Level Confidence Calibration and Self-Correction is accepted by SIGIR 2025.',
          description: "",
          section: "News",},{id: "news-two-papers-are-accepted-by-icml2025-about-model-editing-and-anomaly-detection",
          title: 'Two papers are accepted by ICML2025 about model editing and Anomaly Detection.',
          description: "",
          section: "News",},{id: "news-three-papers-are-accepted-by-acl2025-about-model-editing-llm-inductive-reasoning-and-watermarking",
          title: 'Three papers are accepted by ACL2025 about model editing, LLM inductive reasoning, and...',
          description: "",
          section: "News",},{id: "news-congratulations-to-wanli-on-receiving-the-best-paper-award-at-the-knowfm-acl25-workshop-a-well-deserved-recognition-of-his-excellent-research",
          title: 'Congratulations to Wanli on receiving the Best Paper Award at the KnowFM @...',
          description: "",
          section: "News",},{id: "news-three-papers-are-accepted-by-emnlp-2025-about-hallucination-uncertainty-estimation-backdoor-and-jailbreaking",
          title: 'Three papers are accepted by EMNLP 2025 about Hallucination/Uncertainty Estimation, Backdoor, and Jailbreaking....',
          description: "",
          section: "News",},{id: "news-one-paper-is-accepted-by-aaai-2026-demo-about-algorithm-auditing-congrats-to-zhenxing",
          title: 'One paper is accepted by AAAI 2026 Demo about algorithm auditing. Congrats to...',
          description: "",
          section: "News",},{id: "news-we-will-hold-the-2st-workshop-on-human-centered-recommender-systems-on-www-26-contributions-are-welcome",
          title: 'We will hold The 2st Workshop on Human-Centered Recommender Systems on WWW 26....',
          description: "",
          section: "News",},{id: "news-two-papers-are-accepted-by-webconf-2026-about-recsys-and-membership-inference-attack-congrats-to-danyang-and-hanqi",
          title: 'Two papers are accepted by WebConf 2026 about RecSys and Membership Inference Attack....',
          description: "",
          section: "News",},{id: "news-four-papers-are-accepted-by-iclr-2026-about-model-editing-agent-planing-recsys-and-rag-congrats-to-wanli-yilin-and-kaike-and-chenyu",
          title: 'Four papers are accepted by ICLR 2026 about Model Editing, Agent Planing, RecSys,...',
          description: "",
          section: "News",},{id: "news-one-paper-is-accepted-by-sigir-2026-about-robust-self-supervised-sequential-recommendation-congrats-to-kaike",
          title: 'One paper is accepted by SIGIR 2026 about Robust Self-supervised Sequential Recommendation. Congrats...',
          description: "",
          section: "News",},{id: "news-four-papers-are-accepted-by-acl-2026-about-llm-uncertainty-overthinking-and-jailbreaking-congrats-to-hexiang-shuangjie-zihao-and-zihan",
          title: 'Four papers are accepted by ACL 2026 about LLM uncertainty, overthinking, and jailbreaking....',
          description: "",
          section: "News",},{id: "news-will-serve-as-an-senior-area-chair-for-emnlp-2026",
          title: 'Will serve as an Senior Area Chair for EMNLP 2026.',
          description: "",
          section: "News",},{id: "news-one-paper-is-accepted-by-kdd-2026-about-interactive-recommendation-agent-congrats-to-jiakai",
          title: 'One paper is accepted by KDD 2026 about Interactive Recommendation Agent. Congrats to...',
          description: "",
          section: "News",},{id: "news-joined-the-editorial-board-of-acm-tors-as-an-associate-editor",
          title: 'Joined the Editorial Board of ACM TORS as an Associate Editor.',
          description: "",
          section: "News",},{id: "people-0ssr",
          title: '0ssr',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/0ssr/";
            },},{id: "people-0zhangshixuan",
          title: '0zhangshixuan',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/0zhangshixuan/";
            },},{id: "people-0zhjw",
          title: '0zhjw',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/0zhjw/";
            },},{id: "people-1chenweilun",
          title: '1chenweilun',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/1chenweilun/";
            },},{id: "people-1tangrui",
          title: '1tangrui',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/1tangrui/";
            },},{id: "people-1yaoyongzhou",
          title: '1yaoyongzhou',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/1yaoyongzhou/";
            },},{id: "people-2wanli",
          title: '2wanli',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/2wanli/";
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
            },},{id: "people-tanhexiang",
          title: 'Tanhexiang',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/tanhexiang/";
            },},{id: "people-wanghonglin",
          title: 'Wanghonglin',
          description: "",
          section: "People",handler: () => {
              window.location.href = "/people/wanghonglin/";
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
            },},{id: "workshop-hcrs-thewebconf-2026",
          title: 'HCRS@TheWebConf 2026',
          description: "The 2nd Workshop on Human-Centered Recommender Systems",
          section: "Workshop",handler: () => {
              window.location.href = "/workshop/3_workshop/";
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
