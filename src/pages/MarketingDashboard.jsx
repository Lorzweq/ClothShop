import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default function MarketingDashboard() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image_url: "",
    sale_discount: 0, // Adding sale discount field
  });

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.error(error);
    else setItems(data);
  }

  async function addItem(e) {
    e.preventDefault();
  
    // Ensure price and sale discount are numbers
    const price = parseFloat(formData.price);
    const saleDiscount = parseFloat(formData.sale_discount);
  
    if (isNaN(price)) {
      console.error("Invalid price value");
      return;
    }
  
    // Calculate sale price if a discount exists
    const salePrice = saleDiscount
      ? price * (1 - saleDiscount / 100)
      : price;
  
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name: formData.name,
          description: formData.description,
          category: formData.category,
          price: price,
          stock: formData.stock,
          image_url: formData.image_url,
          sale_price: salePrice, // Store sale price
        },
      ]);
  
    if (error) {
      console.error("Error adding item:", error.message);
    } else {
      fetchItems();
    }
  }
  

  async function updateItemPrice(id, newSalePrice) {
    const { data, error } = await supabase
      .from("products")
      .update({ sale_price: newSalePrice })
      .match({ id });

    if (error) {
      console.error("Error updating sale price:", error.message);
    } else {
      fetchItems();
    }
  }

  async function deleteItem(id) {
    await supabase.from("products").delete().match({ id });
    fetchItems();
  }

  const updateSalePrice = async (productId, newPrice) => {
    try {
      const price = parseFloat(newPrice);
      if (isNaN(price)) {
        throw new Error("Invalid price value");
      }
  
      const { data, error } = await supabase
        .from('products')
        .update({ sale_price: price })
        .eq('id', productId);
  
      if (error) {
        throw new Error(`Error updating price: ${error.message}`);
      }
  
      console.log('Price updated successfully:', data);
    } catch (error) {
      console.error("Error updating sale price:", error.message);
    }
  };
  
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Marketing Dashboard</h1>
      <form onSubmit={addItem} className="mt-4 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Name"
          className="border p-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Category"
          className="border p-2"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Stock"
          className="border p-2"
          value={formData.stock}
          onChange={(e) =>
            setFormData({ ...formData, stock: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border p-2"
          value={formData.image_url}
          onChange={(e) =>
            setFormData({ ...formData, image_url: e.target.value })
          }
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Item
        </button>
      </form>

      <table className="w-full mt-6 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Sale Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.category}</td>
              <td className="border p-2">{item.price}€</td>
              <td className="border p-2">{item.sale_price}€</td>
              <td className="border p-2">{item.stock}</td>
              <td className="border p-2">
              <button
                onClick={() => {
                  const discount = prompt("Enter discount percentage:");
                  if (discount) {
                    updateSalePrice(item.id, item.price * (1 - parseFloat(discount) / 100));
                  }
                }}
                className="bg-yellow-500 text-white px-2 py-1"
              >
                Apply Discount
              </button>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
