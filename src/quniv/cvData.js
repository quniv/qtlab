export const cvData = {
  name: 'QUYET DOAN',
  title: 'DevSecOps Engineer',
  contact: {
    email: 'qitpydev@gmail.com',
    phone: '+84-868-260-254',
    location: 'Vietnam',
    linkedin: 'www.linkedin.com/in/qitpy',
    github: 'github.com/qitpydev',
  },

  summary: `DevOps Engineer with nearly 5 years of technology experience, including 3 years focused on DevOps and cloud infrastructure. Started as a software developer, bringing a developer-first mindset that bridges application delivery and operations. Primarily work with AWS, with hands-on experience in Azure and GCP. Contributed to 10+ projects by architecting CI/CD, improving reliability, optimizing cost, and integrating AI-driven workflows to accelerate deployment troubleshooting and operational automation. Growing toward DevSecOps with active focus on cloud security and secure delivery practices.`,

  skills: [
    {
      group: 'Strong Experience',
      items: [
        { label: 'AWS', detail: 'VPC, EKS, RDS, S3, CloudFront, EC2, ALB, WAF, IAM, Lambda, Step Function, ECS, Secrets Manager, Route53' },
        { label: 'Programming', detail: 'Python, JavaScript, Bash' },
        { label: 'CI/CD', detail: 'GitHub Actions, Bitbucket Pipeline, Azure DevOps Pipeline' },
        { label: 'Infrastructure as Code', detail: 'Terraform, ArgoCD' },
        { label: 'Monitoring', detail: 'Grafana, Prometheus, Loki, Uptime Kuma' },
        { label: 'Security Tools', detail: 'AWS WAF, Cloudflare WAF, SonarQube, Keycloak, Infisical Secrets, CrowdSec, Certbot, IAM' },
        { label: 'Database', detail: 'PostgreSQL, MySQL, MongoDB, Qdrant, ChromaDB' },
        { label: 'Self-hosted', detail: 'Nginx, Apache, WordPress, Docker Compose, Dockge, Portainer, Confluent Kafka' },
        { label: 'Other', detail: 'Kubernetes, Docker, AI-assisted engineering workflows, FastAPI, AWS Copilot CLI' },
      ]
    },
    {
      group: 'Familiar',
      items: [
        { label: 'Azure', detail: 'App Service, Azure OpenAI, API Management, Flexible PostgreSQL, VM, Monitor, EntraID, Container App, Azure Function, PlayFab' },
        { label: 'GCP', detail: 'Cloud Run, Cloud SQL, VM' },
        { label: 'Other', detail: 'Infisical Secrets, DigitalOcean, GitLab, Moodle, PHP, FluxCD, React Native, Apple Store, Google Play Console, Java Quarkus, Java Spring Boot, Airflow, Nginx, Apache, Laravel, Ansible, PM2, Multi EKS cluster on Production.' },
      ]
    },
  ],

  experience: [
    {
      title: 'DevOps Engineer',
      company: 'CMC Global Company Limited (HN)',
      period: 'Apr 2026 – Present',
      description: 'Current DevOps role focused on cloud infrastructure, delivery automation, and operational reliability',
      bullets: [
        'Leading 3 DevOps engineers on an on-premise to AWS EKS migration project',
        'Supporting project bidding with technical documentation and task breakdowns',
        'Designing the target architecture and GitHub/AWS delivery workflow',
        'Planning GitHub Enterprise Server (GHES) setup within project scope',
      ]
    },
    {
      title: 'DevOps Engineer',
      company: 'TCOM Corporation',
      period: 'Mar 2026 – Mar 2026 (1 month)',
      description: '',
      bullets: [
        'Set up an on-premise monitoring system using Prometheus, Grafana, Node Exporter, Netdata, and Postgres Exporter',
        'Designed a multi-layer security architecture for a self-hosted hardened Nginx proxy, including Anti-DDoS, rate limiting, GeoIP whitelisting, and CrowdSec Lua Bouncer',
        'Evaluated and adopted self-hosted documentation tools supporting Markdown (Outline, Docmost, MkDocs, BookStack, AppFlowy); adopted Docmost for organizational use',
        'Implemented automatic TLS certificate renewal for domains using Certbot',
        'Integrated AI-driven workflows to accelerate troubleshooting, documentation, and operational automation',
        'Configured Fluentd agents to forward logs from EC2 to CloudWatch and S3',
        'Gained hands-on experience with Elastic Beanstalk and AWS Support cases',
      ]
    },
    {
      title: 'DevOps Engineer',
      company: 'SmartDev LLC - Outsourcing',
      period: 'Jun 2023 – Mar 2026 (2 years 9 months)',
      description: '',
      bullets: [
        'Architected and managed cloud infrastructure for 10+ projects, mostly on AWS, with some work on Azure, GCP, DigitalOcean, and VPS',
        'Designed CI/CD pipelines using Bitbucket Pipeline, Azure DevOps, GitHub Actions, and GitLab CI for containerized services',
        'Built monitoring, logs, and alerts for websites, services, and databases using Grafana, Prometheus, Loki, Uptime Kuma',
        'Orchestrated infrastructure provisioning across cloud projects using Terraform',
        'Reduced cloud costs by finding the right resource sizes and setting up auto-scaling',
        'Bridged development and operations teams to resolve infrastructure issues and improve application performance',
        'Migrated PHP websites from AWS to DigitalOcean to reduce costs',
        'Applied Cloudflare WAF to protect a compromised vanilla PHP website on DigitalOcean',
        'Applied AWS WAF to protect a compromised WordPress website on EC2',
        'Worked with DevOps Team to design Disaster Recovery for EKS cluster using Velero',
        'Maintained multiple projects for years; provided short-term DevOps support and quick CI/CD setup for small projects',
        'Supported Pre-sale team to plan and design system documentation for small projects',
      ]
    },
    {
      title: 'DevOps Engineer',
      company: 'Beelabs Product Team',
      period: 'Jan 2025 – Jul 2025 (7 months)',
      description: 'Sole DevOps engineer supporting a team of 10 developers',
      bullets: [
        'Owned the end-to-end infrastructure strategy, delivery pipeline, and production readiness plan as the sole DevOps engineer',
        'Migrated self-hosted platform from Docker Containers on EC2 to AWS EKS for better scaling and production readiness',
        'Architected and maintained multiple environment EKS clusters and infrastructure using Terraform',
        'Applied Karpenter to save cost on Worker Nodes for non-production clusters and enable auto-scaling',
        'Applied ArgoCD to practice GitOps in team culture',
        'Applied GitHub Actions Reusable Workflow to optimize CI/CD pipelines across many microservices',
        'Applied Infisical Secrets for better developer experience with secret management in Kubernetes',
        'Applied Loki Stack for cluster log monitoring',
      ]
    },
    {
      title: 'Data Crawler Developer',
      company: 'UCTalent Product Team',
      period: 'Nov 2023 – Apr 2024 (5 months)',
      description: '',
      bullets: [
        'Crawled job data from sites using Scrapy',
        'Processed and mapped job data to better structure and saved into database',
      ]
    },
    {
      title: 'Software Developer',
      company: 'SmartDev LLC - Outsourcing',
      period: 'Jun 2021 – Jun 2023 (2 years)',
      description: '',
      bullets: [
        'Started as Java Back-end developer building Enterprise Internal Web Application with AI recommendation system for matching employees to projects',
        'Worked as Python Developer solo with US clients to build end-to-end automation tools using AWS ECS, Lambda, RDS, Atlas MongoDB, Airflow, FastAPI',
        'Developed Enterprise Internal Bot to automate NDA signing contracts and generate Job Description files',
        'Started DevOps role building Enterprise Internal microservices platform using AWS EKS, Terraform, FluxCD, Next.js, NestJS, Java',
      ]
    },
  ],

  education: 'Da Nang University of Technology — Information Technology, 2017–2021',

  additional: [
    'Languages: Vietnamese (native), English (working level)',
    'Currently learning: Cloud Security, Basic Security, applying AI-driven workflows at work',
    'AI workflows: Applying AI to reduce manual troubleshooting, improve documentation, and speed up operational tasks',
    'Interests: Security, MLOps, IoT, Humanoid Robotics',
  ],
};
