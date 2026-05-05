import { PortfolioData } from '../types';

const escapeMarkdown = (value: string) => value.replace(/[\\`*_{}[\]()#+\-.!|>]/g, '\\$&');

export function generateATSHtml(data: PortfolioData, lang: 'pt' | 'en'): string {
  const isPt = lang === 'pt';
  
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.profile.name} — CV</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;700&family=DM+Sans:ital,wght@0,100..1000;1,100..1000&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: 'DM Sans', sans-serif; font-size: 11px; line-height: 1.5; color: #1a1a2e; background: #ffffff; padding: 0; margin: 0; }
  .page { width: 100%; max-width: 210mm; margin: 0 auto; padding: 40px; }
  .header { margin-bottom: 16px; }
  .header h1 { font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; color: #1a1a2e; letter-spacing: -0.02em; margin-bottom: 4px; }
  .header-gradient { height: 2px; background: linear-gradient(to right, hsl(187, 74%, 32%), hsl(270, 70%, 45%)); border-radius: 1px; margin-bottom: 8px; }
  .contact-row { display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: 10px; color: #555; }
  .contact-row a { color: #555; text-decoration: none; }
  .contact-row .separator { color: #ccc; }
  .section { margin-bottom: 14px; }
  .section-title { font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: hsl(187, 74%, 32%); border-bottom: 1px solid #e5e5e5; padding-bottom: 3px; margin-bottom: 8px; }
  .summary-text { font-size: 11px; line-height: 1.6; color: #333; }
  .competencies-grid { display: flex; flex-wrap: wrap; gap: 6px; }
  .competency-tag { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500; color: hsl(187, 74%, 28%); background: hsl(187, 40%, 95%); padding: 3px 10px; border-radius: 3px; border: 1px solid hsl(187, 40%, 88%); }
  .job { margin-bottom: 12px; }
  .job-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
  .job-company { font-family: 'Space Grotesk', sans-serif; font-size: 12px; font-weight: 600; color: hsl(270, 70%, 45%); }
  .job-period { font-size: 10px; color: #777; white-space: nowrap; }
  .job-role { font-size: 11px; font-weight: 500; color: #444; margin-bottom: 4px; }
  .job-location { font-size: 10px; color: #888; }
  .job ul { padding-left: 16px; margin-top: 4px; }
  .job li { font-size: 10.5px; line-height: 1.5; color: #333; margin-bottom: 2px; }
  .edu-item { margin-bottom: 6px; }
  .edu-header { display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: start; }
  .edu-title { font-weight: 600; font-size: 11px; color: #333; line-height: 1.5; }
  .edu-org { color: hsl(270, 70%, 45%); font-weight: 500; display: block; margin-top: 2px; }
  .edu-year { font-size: 10px; color: #777; }
  .cert-item { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
  .cert-title { font-size: 10.5px; font-weight: 500; color: #333; }
  .cert-org { color: hsl(270, 70%, 45%); }
  .skills-grid { display: flex; flex-wrap: wrap; gap: 4px 12px; }
  .skill-item { font-size: 10.5px; color: #444; }
  .skill-category { font-weight: 600; color: #333; font-size: 10.5px; }
  @media print { .page { padding: 0; } }
  .avoid-break { break-inside: avoid; }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <h1>${data.profile.name}</h1>
    <div class="header-gradient"></div>
    <div class="contact-row">
      <span>${data.profile.email}</span>
      <span class="separator">|</span>
      <span>${data.profile.location}</span>
      ${data.profile.linkedin ? `<span class="separator">|</span><a href="${data.profile.linkedin}">${data.profile.linkedin.replace('https://', '')}</a>` : ''}
      ${data.profile.github ? `<span class="separator">|</span><a href="${data.profile.github}">${data.profile.github.replace('https://', '')}</a>` : ''}
    </div>
  </div>

  <div class="section">
    <div class="section-title">${isPt ? 'Resumo Profissional' : 'Professional Summary'}</div>
    <div class="summary-text">${data.profile.about}</div>
  </div>

  <div class="section">
    <div class="section-title">${isPt ? 'Competências Principais' : 'Core Competencies'}</div>
    <div class="competencies-grid">
      ${data.profile.skills.map(s => `<span class="competency-tag">${s}</span>`).join('')}
    </div>
  </div>

  <div class="section">
    <div class="section-title">${isPt ? 'Experiência Profissional' : 'Work Experience'}</div>
    ${data.experience.map(exp => `
      <div class="job avoid-break">
        <div class="job-header">
          <span class="job-company">${exp.company}</span>
          <span class="job-period">${exp.period}${exp.period_en && !isPt ? ` (${exp.period_en})` : ''}</span>
        </div>
        <div class="job-role">${isPt ? exp.position : (exp.position_en || exp.position)}</div>
        <ul>
          ${(isPt ? exp.description : (exp.description_en || exp.description)).map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>
    `).join('')}
  </div>

  <div class="section avoid-break">
    <div class="section-title">${isPt ? 'Formação Acadêmica' : 'Education'}</div>
    ${data.education.map(edu => `
      <div class="edu-item">
        <div class="edu-header">
          <div>
            <div class="edu-title">${isPt ? edu.degree : (edu.degree_en || edu.degree)}</div>
            <div class="edu-org">${isPt ? edu.institution : (edu.institution_en || edu.institution)}</div>
          </div>
          <span class="edu-year">${edu.period}</span>
        </div>
      </div>
    `).join('')}
  </div>

  <div class="section avoid-break">
    <div class="section-title">${isPt ? 'Certificações' : 'Certifications'}</div>
    ${data.certificates.map(cert => `
      <div class="cert-item">
        <span class="cert-title">${isPt ? cert.name : (cert.name_en || cert.name)} — <span class="cert-org">${isPt ? cert.issuer : (cert.issuer_en || cert.issuer)}</span></span>
        <span class="cert-year">${cert.date}</span>
      </div>
    `).join('')}
  </div>

  <div class="section avoid-break">
    <div class="section-title">${isPt ? 'Idiomas & Hobbies' : 'Languages & Hobbies'}</div>
    <div class="skills-grid">
      <div class="skill-item"><span class="skill-category">${isPt ? 'Idiomas:' : 'Languages:'}</span> ${data.profile.languages.map(l => `${l.name} (${l.level})`).join(', ')}</div>
      <div class="skill-item"><span class="skill-category">${isPt ? 'Hobbies:' : 'Hobbies:'}</span> ${data.profile.hobbies.join(', ')}</div>
    </div>
  </div>
</div>
</body>
</html>`;
}

export function generateATSMarkdown(data: PortfolioData, lang: 'pt' | 'en'): string {
  const isPt = lang === 'pt';
  const profileName = data.profile.name || 'Professional Profile';
  const links = [
    data.profile.linkedin ? `[LinkedIn](${data.profile.linkedin})` : '',
    data.profile.github ? `[GitHub](${data.profile.github})` : ''
  ].filter(Boolean).join(' | ');

  return `# ${escapeMarkdown(profileName)}

${escapeMarkdown(data.profile.email || '')}${data.profile.location ? ` | ${escapeMarkdown(data.profile.location)}` : ''}${links ? ` | ${links}` : ''}

## ${isPt ? 'Resumo Profissional' : 'Professional Summary'}

${data.profile.about || ''}

## ${isPt ? 'Competências Principais' : 'Core Competencies'}

${data.profile.skills.length ? data.profile.skills.map((skill) => `- ${escapeMarkdown(skill)}`).join('\n') : '-'}

## ${isPt ? 'Experiência Profissional' : 'Work Experience'}

${data.experience.length ? data.experience.map((exp) => `### ${escapeMarkdown(exp.company)}

**${isPt ? exp.position : (exp.position_en || exp.position)}** | ${isPt ? exp.period : (exp.period_en || exp.period)}

${(isPt ? exp.description : (exp.description_en || exp.description)).length ? (isPt ? exp.description : (exp.description_en || exp.description)).map((item) => `- ${escapeMarkdown(item)}`).join('\n') : '-'}
`).join('\n') : '-'}

## ${isPt ? 'Formação Acadêmica' : 'Education'}

${data.education.length ? data.education.map((edu) => `- **${isPt ? edu.degree : (edu.degree_en || edu.degree)}** — ${isPt ? edu.institution : (edu.institution_en || edu.institution)} (${escapeMarkdown(edu.period)})`).join('\n') : '-'}

## ${isPt ? 'Certificações' : 'Certifications'}

${data.certificates.length ? data.certificates.map((cert) => `- **${isPt ? cert.name : (cert.name_en || cert.name)}** — ${isPt ? cert.issuer : (cert.issuer_en || cert.issuer)} ${cert.date ? `(${escapeMarkdown(cert.date)})` : ''}`).join('\n') : '-'}

## ${isPt ? 'Idiomas & Hobbies' : 'Languages & Hobbies'}

- **${isPt ? 'Idiomas' : 'Languages'}:** ${data.profile.languages.length ? data.profile.languages.map((language) => `${escapeMarkdown(language.name)} (${escapeMarkdown(language.level)})`).join(', ') : '-'}
- **${isPt ? 'Hobbies' : 'Hobbies'}:** ${data.profile.hobbies.length ? data.profile.hobbies.map((hobby) => escapeMarkdown(hobby)).join(', ') : '-'}
`;
}
