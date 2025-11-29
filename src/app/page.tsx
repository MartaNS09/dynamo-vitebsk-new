// import { Header } from "@/components/layout/header/Header";
// import "./page.scss";

// export default function Home() {
//   return (
//     <>
//       <Header />
//       <main className="main-content">
//         <div className="container">
//           <div className="hero-section fade-in-up">
//             <h1>Динамо Витебск</h1>
//             <p className="lead">
//               Специализированная детско-юношеская школа олимпийского резерва
//             </p>
//             <div className="hero-card card">
//               <p>
//                 Сайт находится в разработке. Скоро здесь появится современная
//                 версия нашего сайта с полной информацией о школе, тренерах и
//                 достижениях!
//               </p>
//               <div className="hero-actions">
//                 <a href="#" className="button">
//                   Узнать больше
//                 </a>
//                 <a href="#" className="button button--secondary">
//                   Наши контакты
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

import { Header } from "@/components/layout/header/Header";
import "./page.scss";

export default function Home() {
  return (
    <>
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="hero-section fade-in-up">
            <h1>Динамо Витебск</h1>
            <p className="lead">
              Специализированная детско-юношеская школа олимпийского резерва
            </p>
            <div className="hero-card card">
              <p>
                Сайт находится в разработке. Скоро здесь появится современная
                версия нашего сайта с полной информацией о школе, тренерах и
                достижениях!
              </p>
              <div className="hero-actions">
                <a href="#" className="button">
                  Узнать больше
                </a>
                <a href="#" className="button button--secondary">
                  Наши контакты
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
