// // export default function Loading() {
// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         minHeight: "60vh",
// //         background: "var(--bg-primary)",
// //       }}
// //     >
// //       <div style={{ textAlign: "center" }}>
// //         <div
// //           style={{
// //             width: "50px",
// //             height: "50px",
// //             border: "3px solid var(--border-light)",
// //             borderTop: "3px solid var(--dynamo-blue)",
// //             borderRadius: "50%",
// //             animation: "spin 1s linear infinite",
// //             margin: "0 auto 1.5rem",
// //           }}
// //         ></div>
// //         <p
// //           style={{
// //             color: "var(--text-secondary)",
// //             fontSize: "1rem",
// //             fontWeight: 500,
// //           }}
// //         >
// //           Подготавливаем спортивные секции...
// //         </p>
// //         <style>{`
// //           @keyframes spin {
// //             0% { transform: rotate(0deg); }
// //             100% { transform: rotate(360deg); }
// //           }
// //         `}</style>
// //       </div>
// //     </div>
// //   );
// // }
// /src/app/sports/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        {/* Скелетон для фильтров */}
        <div className="h-10 bg-gray-200 rounded w-1/4 mb-8"></div>

        {/* Скелетон для карточек */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-4 h-96">
              <div className="h-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
