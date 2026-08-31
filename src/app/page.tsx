import ExistentialMachine from "@/components/ExistentialMachine";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Bureau of Cosmic Insignificance",
    description:
      "Enter your age and receive an official existential dread report from the Bureau of Cosmic Insignificance.",
    applicationCategory: "Entertainment",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExistentialMachine />
    </>
  );
}
