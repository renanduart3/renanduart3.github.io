import { PortfolioData, TranslationStrings, Language } from './types';

export const DEFAULT_PORTFOLIO: PortfolioData = {
  profile: {
    name: 'Renan Duarte',
    title: 'Analista desenvolvedor .NET | C# | TS | Python | Azure | AWS | Docker | Solucoes com IA aplicada',
    about: 'Perfil De Personalidade MBTI: ATIVISTA (ENFP-A). E-Talent: Facilitador. CEFR English Level: B2. Linguagens: C#, Python, Typescript, VB .NET. Backend: .NET (6/8/Framework), ASP.NET Web APIs, FastAPI (Python). Frontend: React.js e Angular. Bancos de dados: SQL Server, PostgreSQL, MySQL, MongoDB. Mensageria: RabbitMQ, Apache Kafka. Cloud/DevOps: Azure (incluindo Azure DevOps), AWS, GCP, Docker, GitHub Actions. Data/Automacao (IA/Agentes): Pandas, Numpy, n8n, Agno, Semantic Kernel, integracoes com LLMs.',
    email: 'renan110306@gmail.com',
    location: 'Contagem, Minas Gerais, Brasil',
    linkedin: 'https://www.linkedin.com/in/renanduart3',
    github: 'https://github.com/renanduart3',
    instagram: 'https://www.instagram.com/@renan',
    twitter: 'https://www.x.com/elon',
    languages: [
      { name: 'Portugues', level: 'Native or Bilingual' },
      { name: 'Ingles', level: 'Professional Working (B2)' }
    ],
    hobbies: [
      'Movies',
      'Games',
      'Dev',
      '✝️'
    ],
    skills: [
      'Razor Pages',
      'Software Architecture',
      'Distributed Systems',
      'C#',
      'Python',
      'Typescript',
      'VB .NET',
      '.NET 6/8',
      'ASP.NET Web APIs',
      'FastAPI',
      'React.js',
      'Angular',
      'SQL Server',
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'RabbitMQ',
      'Apache Kafka',
      'Azure DevOps',
      'AWS',
      'Docker',
      'GitHub Actions'
    ]
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Icaro Tech',
      position: 'Desenvolvedor FullStack .NET',
      period: 'dezembro de 2025 - Present',
      description: [
        'Atuacao em projeto no Brasil com foco em desenvolvimento full stack com .NET.'
      ]
    },
    {
      id: 'exp-2',
      company: 'NAVA - Technology for Business',
      position: 'Desenvolvedor III',
      period: 'maio de 2024 - agosto de 2025',
      description: [
        'Atuacao na manutencao de sistemas de gerenciamento de credito.',
        'Participacao em projetos de microfrontend com React e .NET 8.',
        'Entregas em esteiras automatizadas no Azure DevOps.'
      ]
    },
    {
      id: 'exp-3',
      company: 'Pontificia Universidade Catolica de Minas Gerais',
      position: 'Analista Desenvolvedor .NET',
      period: 'outubro de 2022 - maio de 2024',
      description: [
        'Atuacao como analista desenvolvedor .NET em Belo Horizonte.'
      ]
    },
    {
      id: 'exp-4',
      company: 'act digital',
      position: 'Desenvolvedor .NET',
      period: 'julho de 2022 - outubro de 2022',
      description: [
        'Atuacao como desenvolvedor .NET em projeto no Brasil.'
      ]
    },
    {
      id: 'exp-5',
      company: 'Meta',
      position: 'Desenvolvedor .NET',
      period: 'junho de 2021 - julho de 2022',
      description: [
        'Atuacao em equipe de desenvolvimento com melhorias no sistema legado.',
        'Implementacao de novos servicos integrados a arquitetura existente.'
      ]
    },
    {
      id: 'exp-6',
      company: 'Grupo SADA',
      position: 'Analista Desenvolvedor .NET',
      period: 'junho de 2019 - junho de 2021',
      description: [
        'Suporte e desenvolvimento de aplicacoes .NET, Windows Forms, Web API e Report Server.'
      ]
    },
    {
      id: 'exp-7',
      company: 'Accenture',
      position: 'Analista de sistema',
      period: 'fevereiro de 2018 - maio de 2019',
      description: [
        'Desenvolvimento de especificacoes funcionais e analise de pontos de funcao.',
        'Desenvolvimento de solucoes parciais para sistema CRISC empresarial com linguagem natural da Software AG.'
      ]
    },
    {
      id: 'exp-8',
      company: 'MAXINST - Consulting and Technology Ltda.',
      position: 'Analista de sistema - Trainee',
      period: 'outubro de 2017 - janeiro de 2018',
      description: [
        'Consultor IBM MAXIMO (versoes 7.1 e 7.5).'
      ]
    },
    {
      id: 'exp-9',
      company: 'Wave Lojas Virtuais',
      position: 'Desenvolvedor WEB .NET',
      period: 'novembro de 2016 - agosto de 2017',
      description: [
        'Desenvolvimento de lojas virtuais com VB .NET (CSS, JS e HTML5) integradas com gateways de pagamento.'
      ]
    },
    {
      id: 'exp-10',
      company: 'Cofermeta',
      position: 'Tecnico em informatica',
      period: 'maio de 2014 - junho de 2015',
      description: [
        'Configuracao de estacoes de rede e gerenciamento de dominio (Active Directory, Windows Server 2008 R2).',
        'Suporte ERP TOTVS/Protheus e produtos Office365.'
      ]
    },
    {
      id: 'exp-11',
      company: 'FIXTI',
      position: 'Operador de servidor Jr.',
      period: 'agosto de 2011 - abril de 2013',
      description: [
        'Suporte N1 para infraestrutura de hardware em operacao de Data Center.',
        'Monitoramento de ambientes de producao e rotinas de backup com robos IBM Hydra Series, Sun Storageteck SL8500 e Quantum DXI 8500.'
      ]
    }
  ],
  projects: [],
  education: [
    {
      id: 'edu-1',
      institution: 'Centro Universitario UNA',
      degree: "Associate's degree, Analise de Sistemas de Computacao",
      period: '2014 - 2017'
    },
    {
      id: 'edu-2',
      institution: 'Pontificia Universidade Catolica de Minas Gerais',
      degree: 'Pos-Graduacao em Arquitetura de Software Distribuido, Tecnologia da Informacao',
      period: '2018 - 2019'
    }
  ],
  certificates: [
    {
      id: 'cert-1',
      name: 'Google AI',
      issuer: 'Google',
      date: '',
      link: ''
    },
    {
      id: 'cert-2',
      name: 'PSMI - Scrum Master',
      issuer: 'Scrum',
      date: '',
      link: ''
    },
    {
      id: 'cert-3',
      name: 'Advanced C#: Object-Oriented Programming',
      issuer: '',
      date: '',
      link: ''
    },
    {
      id: 'cert-4',
      name: 'Azure Service Bus',
      issuer: 'Microsoft',
      date: '',
      link: ''
    },
    {
      id: 'cert-5',
      name: 'Deploying ASP.NET Core Applications',
      issuer: 'Microsoft',
      date: '',
      link: ''
    }
  ],
  articles: []
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
