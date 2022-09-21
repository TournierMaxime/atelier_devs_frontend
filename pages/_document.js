//Imports
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html style={{ scrollBehavior: "smooth" }}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta description="Passionné par les nouvelles technologies. Mes premières expériences en tant que développeur remontent à 2008. Je me suis formé en autodidacte sur le 'site du zéro' qui est devenu OpenClassRooms. D'abord en apprenant HTML et CSS. Puis c'est en 2016 que j'ai appris PHP et MySQL. Cet apprentissage m'a permis de créer mon premier site internet personnel. En 2021 j'ai décidé de me former pour devenir développeur/intégrateur web notamment sur Javascript, ReactJS et NodeJS." />
      </Head>
      <body className="body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
