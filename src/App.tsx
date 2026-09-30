/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products");
      setLoading(false);
      return res;
    };

    getProducts()
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch products");
        }
      })
      .then((data) => {
        setProducts(data.products);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="bg-amber-50 h-screen w-screen overflow-hidden overflow-y-auto p-10 flex justify-center">
      {loading ? (
        <div className="bg-white p-4 rounded animate-pulse size-full md:size-1/2 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-1/2">
          {products?.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg border border-gray-100"
            >
              <div className="flex justify-center mb-4 h-40">
                <img src={product.thumbnail} alt={product.title} />
              </div>
              <p className="text-lg font-bold text-gray-800">{product.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// products?.map((product) => (
//   <div key={product.id}>
//     <h1>{product.title}</h1>
//     <p>{product.description}</p>
//     <p>Price: ${product.price}</p>
//   </div>
// ))
export default App;
