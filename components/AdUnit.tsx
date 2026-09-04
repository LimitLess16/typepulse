import Script from "next/script";

export function AdUnit() {
  return (
    <div className="mx-auto my-8 flex min-h-[250px] w-full max-w-[300px] items-center justify-center overflow-hidden">
      <Script id="typepulse-ad-options" strategy="afterInteractive">
        {`
          var atOptions = {
            key: "e72a0f0780d1ea34e14f14e7a1916329",
            format: "iframe",
            height: 250,
            width: 300,
            params: {}
          };
        `}
      </Script>
      <Script
        id="typepulse-ad-network"
        src="https://www.highrevenueformat.com/e72a0f0780d1ea34e14f14e7a1916329/invoke.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
