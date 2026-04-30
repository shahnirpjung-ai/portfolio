import { Helmet } from 'react-helmet-async';

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nirp Jung Shah",
  "jobTitle": "Business Developer & Digital Marketing Strategist",
  "url": "https://nirp.com.np",
  "email": "shahnirpjung@gmail.com",
  "telephone": "+977-9863031308",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kathmandu",
    "addressCountry": "NP"
  },
  "sameAs": [
    "https://linkedin.com/in/shahnirpjung",
    "https://github.com/shahnirpjung-ai"
  ],
  "knowsAbout": [
    "Business Development",
    "Digital Marketing",
    "SEO",
    "Google Ads",
    "Meta Ads",
    "AI Automation",
    "n8n",
    "Project Management"
  ],
  "alumniOf": "Anna University"
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Nirp Jung Shah — Business Development & Digital Marketing",
  "url": "https://nirp.com.np",
  "description": "Business development, digital marketing, and AI automation services for NGOs, startups, banks, and businesses across Nepal.",
  "areaServed": "Nepal",
  "founder": "Nirp Jung Shah",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kathmandu",
    "addressCountry": "NP"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Development & Partnerships" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing & SEO" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Marketing Automation" } }
    ]
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you work with international NGOs entering Nepal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. I regularly help INGOs and international organisations understand Nepal's regulatory environment, identify local SWC-registered partners, and build their digital presence for the Nepali market."
      }
    },
    {
      "@type": "Question",
      "name": "Do you work in Nepali or English?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both. I work fluently in Nepali and English, bridging communication between local organisations and international donors or partners."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly will I see results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BD partnerships can start activating within weeks. SEO compounds over 3-6 months. Paid ads can show results within 2 weeks. I set honest timelines from day one."
      }
    },
    {
      "@type": "Question",
      "name": "What is included in the Growth Retainer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Growth Retainer includes business development outreach, proposal support, SEO optimisation, 2 blog posts per month, social media strategy, and monthly performance reporting. Available from NPR 60,000 per month."
      }
    }
  ]
};

export default function SchemaMarkup() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(professionalServiceSchema)}</script>
    </Helmet>
  );
}

export function FAQSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  );
}
