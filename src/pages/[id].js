import { useRouter } from "next/router";
import products from "../../data/products"; 

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Find the product by id
  const product = products.find((p) => p.id === parseInt(id));

  // If product is not found, show a message
  if (!product) {
    return <div className="text-center mt-10 text-red-500">Product not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto text-center">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-auto object-cover mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-gray-900 font-bold text-lg">{product.price}€</p>
      </div>
    </div>
  );
};

export default ProductPage;
