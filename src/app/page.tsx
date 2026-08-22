import { WelcomePage } from "@/components/WelcomePage";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata, absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/constants/seo";

export const metadata = createPageMetadata({
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  path: "/",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}/#website`,
      url: absoluteUrl("/"),
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "uk-UA",
      potentialAction: {
        "@type": "ReadAction",
        target: absoluteUrl("/nmt"),
      },
    },
    {
      "@type": "WebApplication",
      "@id": `${absoluteUrl("/")}/#app`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: absoluteUrl("/"),
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      inLanguage: "uk-UA",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "UAH",
      },
      about: {
        "@type": "Thing",
        name: "Національний мультипредметний тест з математики",
      },
      educationalUse: "самопідготовка",
      learningResourceType: "тренажер тестів",
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "студент",
      },
      featureList: [
        "10 повних варіантів НМТ-2026",
        "Оцінювання 32 тестові бали та рейтинг 100–200",
        "Практика за 6 темами",
        "Режим Ultimate до 20 завдань",
        "Довідник формул",
      ],
    },
    {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
      description: SITE_TAGLINE,
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <WelcomePage />
    </>
  );
}
