import supabase from './supabaseClient.js';
import fs from 'fs';

const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));

const insertProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .insert(products);

  if (error) {
    console.error('Error inserting products:', error);
  } else {
    console.log('Products inserted successfully:', data);
  }
};

insertProducts();