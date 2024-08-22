import Script from "next/script";

export const ymKey = 98134762;

export const YandexMetrika = () => {
  return (
    <Script id="metrika-counter" strategy="afterInteractive">
      {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(${ymKey}, "init", {
            defer: true,
            clickmap:false,
            trackLinks:false,
            accurateTrackBounce:false,
            webvisor:false
      });`}
    </Script>
  );
};
