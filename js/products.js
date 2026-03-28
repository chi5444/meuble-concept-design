import { supabase } from './supabase.js';

export async function fetchProducts(filters = {}) {
  let query = supabase.from('products').select('*');

  if (filters.category && filters.category !== 'all') {
    query = query.eq('category', filters.category);
  }
  if (filters.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }
  if (filters.inStock) {
    query = query.eq('in_stock', true);
  }

  const { data, error } = await query.order('id', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function fetchProductById(id) {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function createProduct(product) {
  const { data, error } = await supabase.from('products').insert([product]).select().single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}

export function renderProductCard(product) {
  const discount = product.old_price
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
    : null;

  const imageContent = product.image_url
    ? `<img src="${product.image_url}" alt="${product.title}" style="width:100%;height:100%;object-fit:cover;" loading="lazy" />`
    : `<span class="product-icon">${product.icon || '🛋️'}</span>`;

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-img-wrap">
        <div class="product-img ${product.image_url ? 'img-has-photo' : (product.img_class || 'img-default')}">
          ${imageContent}
        </div>
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        ${discount ? `<span class="product-discount">-${discount}%</span>` : ''}
        ${!product.in_stock ? `<div class="product-overlay"><span>Rupture de stock</span></div>` : ''}
      </div>
      <div class="product-info">
        <div class="product-category">${product.category || ''}</div>
        <h3 class="product-title">${product.title}</h3>
        ${product.region ? `<div class="product-region">${product.region}</div>` : ''}
        <div class="product-pricing">
          <span class="product-price">${product.price.toLocaleString('fr-TN')} DT</span>
          ${product.old_price ? `<span class="product-old-price">${product.old_price.toLocaleString('fr-TN')} DT</span>` : ''}
        </div>
        <div class="product-actions">
          <button class="btn-cart ${!product.in_stock ? 'disabled' : ''}" onclick="window.addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})" ${!product.in_stock ? 'disabled' : ''}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Ajouter au panier
          </button>
          <button class="btn-details" onclick="window.showProductDetails(${product.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}