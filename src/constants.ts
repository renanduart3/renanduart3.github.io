import { PortfolioData, TranslationStrings, Language } from './types';

export const EMPTY_PORTFOLIO: PortfolioData = {
  profile: {
    name: 'Seu Nome',
    title: 'Seu cargo ou especialidade',
    about: 'Resumo profissional será preenchido pela IA local.',
    email: 'seu-email@exemplo.com',
    location: 'Sua cidade, seu país',
    linkedin: '',
    github: '',
    instagram: '',
    twitter: '',
    languages: [],
    hobbies: [],
    skills: []
  },
  experience: [
    {
      id: 'exp-placeholder',
      company: 'Empresa em destaque',
      position: 'Seu próximo cargo',
      period: '2025 - presente',
      description: [
        'A IA local pode substituir esta experiência com dados reais do seu currículo.',
        'Use este espaço para destacar impacto, tecnologias e resultados.'
      ]
    }
  ],
  projects: [
    {
      id: 'proj-placeholder',
      slug: 'projeto-placeholder',
      title: 'Projeto em andamento',
      description: 'Adicione um projeto real aqui ou desative a seção no constants.ts.',
      tech: ['React', '.NET', 'Azure'],
      image: '/projects/placeholder.jpg',
      type: 'internal'
    }
  ],
  education: [
    {
      id: 'edu-placeholder',
      institution: 'Sua instituição de ensino',
      degree: 'Sua formação principal',
      period: 'Ano - Ano'
    }
  ],
  certificates: [
    {
      id: 'cert-placeholder',
      name: 'Sua certificação principal',
      issuer: 'Sua instituição emissora',
      date: 'Data',
      link: ''
    }
  ],
  articles: [
    {
      id: 'article-placeholder',
      slug: 'article-placeholder',
      title: 'Seu artigo publicado',
      description: 'Adicione um artigo interno ou externo, ou desligue a seção no constants.ts.',
      date: 'Data',
      link: '',
      content: '# Artigo de exemplo\n\nSubstitua este conteúdo pela sua publicação.',
      type: 'internal'
    }
  ],
  sections: {
    projects: true,
    articles: true
  }
};

export const DEFAULT_PORTFOLIO: PortfolioData = {
  profile: {
    name: 'Renan Duarte',
    title: 'Analista desenvolvedor .NET | C# | TS | Python | Azure | AWS | Docker | Soluções com IA aplicada',
    about: 'Desenvolvedor Full Stack .NET/React com foco em arquitetura distribuída, microserviços e soluções com IA. Experiência em Azure, AWS, Docker, Kubernetes. MBTI: ATIVISTA (ENFP-A).',
    email: 'renan110306@gmail.com',
    location: 'Contagem, Minas Gerais, Brasil',
    linkedin: 'https://www.linkedin.com/in/renanduart3',
    github: 'https://github.com/renanduart3',
    instagram: '@renanduart3',
    twitter: '',
    languages: [
      { name: 'Português', level: 'Native' },
      { name: 'Inglês', level: 'B2' }
    ],
    hobbies: [
      'Cinema',
      'Futebol',
      'Games',
      '✝️'
    ],
    skills: [
      'C#',
      '.NET 6/8',
      'ASP.NET Web APIs',
      'Python',
      'TypeScript',
      'React.js',
      'Angular',
      'Razor Pages',
      'FastAPI',
      'SQL Server',
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'RabbitMQ',
      'Apache Kafka',
      'Azure',
      'Azure DevOps',
      'AWS',
      'GCP',
      'Docker',
      'GitHub Actions',
      'Software Architecture',
      'Distributed Systems',
      'Pandas',
      'Numpy',
      'n8n',
      'Semantic Kernel'
    ]
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Icaro Tech',
      position: 'Desenvolvedor FullStack .NET',
      position_en: 'FullStack .NET Developer',
      period: 'dezembro de 2025 - Present',
      period_en: 'December 2025 - Present',
      description: [
        'Atuação em projeto no Brasil com foco em desenvolvimento full stack com .NET.'
      ],
      description_en: [
        'Working on a project in Brazil focused on full stack development with .NET.'
      ]
    },
    {
      id: 'exp-2',
      company: 'NAVA - Technology for Business',
      position: 'Desenvolvedor III',
      position_en: 'Developer III',
      period: 'maio de 2024 - agosto de 2025',
      period_en: 'May 2024 - August 2025',
      description: [
        'Atuação na manutenção de sistemas de gerenciamento de crédito.',
        'Participação em projetos de microfrontend com React e .NET 8.',
        'Entregas em esteiras automatizadas no Azure DevOps.'
      ],
      description_en: [
        'Worked on maintenance of credit management systems.',
        'Participated in micro-frontend projects with React and .NET 8.',
        'Delivered in automated pipelines on Azure DevOps.'
      ]
    },
    {
      id: 'exp-3',
      company: 'Pontificia Universidade Católica de Minas Gerais',
      position: 'Analista Desenvolvedor .NET',
      position_en: 'Developer Analyst, .NET',
      period: 'outubro de 2022 - maio de 2024',
      period_en: 'October 2022 - May 2024',
      description: [
        'Atuação como analista desenvolvedor .NET em Belo Horizonte.'
      ],
      description_en: [
        'Worked as a .NET Developer Analyst in Belo Horizonte.'
      ]
    },
    {
      id: 'exp-4',
      company: 'ACT Digital',
      position: 'Desenvolvedor .NET',
      period: 'julho de 2022 - outubro de 2022',
      description: [
        'Atuação como desenvolvedor .NET em projeto no Brasil.'
      ]
    },
    {
      id: 'exp-5',
      company: 'Meta',
      position: 'Desenvolvedor .NET',
      position_en: '.NET Developer',
      period: 'junho de 2021 - julho de 2022',
      period_en: 'June 2021 - July 2022',
      description: [
        'Atuação em equipe de desenvolvimento com melhorias no sistema legado.',
        'Implementação de novos serviços integrados à arquitetura existente.'
      ],
      description_en: [
        'Worked in development team with improvements to legacy system.',
        'Implemented new services integrated into existing architecture.'
      ]
    },
    {
      id: 'exp-6',
      company: 'Grupo SADA',
      position: 'Analista Desenvolvedor .NET',
      position_en: 'Developer Analyst, .NET',
      period: 'junho de 2019 - junho de 2021',
      period_en: 'June 2019 - June 2021',
      description: [
        'Suporte e desenvolvimento de aplicações .NET, Windows Forms, Web API e Report Server.'
      ],
      description_en: [
        'Support and development of .NET applications, Windows Forms, Web API and Report Server.'
      ]
    },
    {
      id: 'exp-7',
      company: 'Accenture',
      position: 'Analista de sistema',
      position_en: 'System Analyst',
      period: 'fevereiro de 2018 - maio de 2019',
      period_en: 'February 2018 - May 2019',
      description: [
        'Desenvolvimento de especificações funcionais e análise de pontos de função.',
        'Desenvolvimento de soluções parciais para sistema CRISC empresarial com linguagem natural da Software AG.'
      ],
      description_en: [
        'Development of functional specifications and function point analysis.',
        'Development of partial solutions for enterprise CRISC system with Software AG natural language.'
      ]
    },
    {
      id: 'exp-8',
      company: 'MAXINST - Consulting and Technology Ltda.',
      position: 'Analista de sistema - Trainee',
      position_en: 'System Analyst - Trainee',
      period: 'outubro de 2017 - janeiro de 2018',
      period_en: 'October 2017 - January 2018',
      description: [
        'Consultor IBM MAXIMO (versões 7.1 e 7.5).'
      ],
      description_en: [
        'IBM MAXIMO Consultant (versions 7.1 and 7.5).'
      ]
    },
    {
      id: 'exp-9',
      company: 'Wave Lojas Virtuais',
      position: 'Desenvolvedor WEB .NET',
      position_en: '.NET Web Developer',
      period: 'novembro de 2016 - agosto de 2017',
      period_en: 'November 2016 - August 2017',
      description: [
        'Desenvolvimento de lojas virtuais com VB .NET (CSS, JS e HTML5) integradas com gateways de pagamento.'
      ],
      description_en: [
        'Development of virtual stores with VB .NET (CSS, JS and HTML5) integrated with payment gateways.'
      ]
    },
    {
      id: 'exp-10',
      company: 'Cofermeta',
      position: 'Técnico em informatica',
      position_en: 'IT Technician',
      period: 'maio de 2014 - junho de 2015',
      period_en: 'May 2014 - June 2015',
      description: [
        'Configuração de estações de rede e gerenciamento de domínio (Active Directory, Windows Server 2008 R2).',
        'Suporte ERP TOTVS/Protheus e produtos Office365.'
      ],
      description_en: [
        'Network workstation configuration and domain management (Active Directory, Windows Server 2008 R2).',
        'Support for TOTVS/Protheus ERP and Office365 products.'
      ]
    },
    {
      id: 'exp-11',
      company: 'FIXTI',
      position: 'Operador de servidor Jr.',
      position_en: 'Server Operator Jr.',
      period: 'agosto de 2011 - abril de 2013',
      period_en: 'August 2011 - April 2013',
      description: [
        'Suporte N1 para infraestrutura de hardware em operação de Data Center.',
        'Monitoramento de ambientes de produção e rotinas de backup com robôs IBM Hydra Series, Sun Storageteck SL8500 e Quantum DXI 8500.'
      ],
      description_en: [
        'N1 support for hardware infrastructure in Data Center operations.',
        'Monitoring of production environments and backup routines with IBM Hydra Series, Sun Storageteck SL8500 and Quantum DXI 8500 robots.'
      ]
    }
  ],
  projects: [],
  education: [
    {
      id: 'edu-1',
      institution: 'Centro Universitário UNA',
      institution_en: 'UNA University Center',
      degree: "Associate's degree, Análise de Sistemas de Computação",
      degree_en: "Associate's degree in Computer Systems Analysis",
      period: '2014 - 2017'
    },
    {
      id: 'edu-2',
      institution: 'Pontificia Universidade Católica de Minas Gerais',
      institution_en: 'Pontifical Catholic University of Minas Gerais',
      degree: 'Pós-Graduação em Arquitetura de Software Distribuído, Tecnologia da Informação',
      degree_en: 'Post-Graduation in Distributed Software Architecture, Information Technology',
      period: '2018 - 2019'
    }
  ],
  certificates: [
    {
      id: 'cert-1',
      name: 'Google AI',
      name_en: 'Google AI',
      issuer: 'Google',
      issuer_en: 'Google',
      date: '',
      link: ''
    },
    {
      id: 'cert-2',
      name: 'PSMI - Scrum Master',
      name_en: 'PSMI - Scrum Master',
      issuer: 'Scrum',
      issuer_en: 'Scrum',
      date: '',
      link: ''
    },
    {
      id: 'cert-3',
      name: 'Advanced C#: Object-Oriented Programming',
      name_en: 'Advanced C#: Object-Oriented Programming',
      issuer: '',
      issuer_en: '',
      date: '',
      link: ''
    },
    {
      id: 'cert-4',
      name: 'Azure Service Bus',
      name_en: 'Azure Service Bus',
      issuer: 'Microsoft',
      issuer_en: 'Microsoft',
      date: '',
      link: ''
    },
    {
      id: 'cert-5',
      name: 'Deploying ASP.NET Core Applications',
      name_en: 'Deploying ASP.NET Core Applications',
      issuer: 'Microsoft',
      issuer_en: 'Microsoft',
      date: '',
      link: ''
    }
  ],
  articles: [],
  sections: {
    projects: true,
    articles: true
  }
};

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  pt: {
    about: 'Sobre Mim',
    experience: 'Experiência',
    projects: 'Projetos',
    education: 'Formação',
    certificates: 'Certificado / Cursos',
    articles: 'Artigos Publicados',
    languages: 'Idiomas',
    hobbies: 'Hobbies',
    skills: 'Skills / Competências',
    downloadCV: 'Baixar CV (ATS)',
    importProfile: 'Importar Perfil',
    importDescription: 'Faça upload do seu currículo ou use o LinkedIn para preencher seu portfólio.',
    attachments: 'Arquivos Anexados',
    page: 'Página',
    of: 'de',
    socials: 'Redes Sociais',
    platforms: 'Plataformas',
    readMore: 'Ler Artigo',
    back: 'Voltar'
  },
  en: {
    about: 'About Me',
    experience: 'Work Experience',
    projects: 'Projects',
    education: 'Education',
    certificates: 'Certificates & Courses',
    articles: 'Published Articles',
    languages: 'Languages',
    hobbies: 'Hobbies',
    skills: 'Core Competencies',
    downloadCV: 'Download CV (ATS)',
    importProfile: 'Import Profile',
    importDescription: 'Upload your CV or use LinkedIn to populate your portfolio.',
    attachments: 'Attached Files',
    page: 'Page',
    of: 'of',
    socials: 'Social Networks',
    platforms: 'Platforms',
    readMore: 'Read Article',
    back: 'Back'
  }
};
