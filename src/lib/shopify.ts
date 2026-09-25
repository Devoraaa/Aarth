// ─────────────────────────────────────────────────────────────────────────────
// AARTH - Shopify Storefront API Client
// Secure client-side requests directly from browser → Shopify
// The Public Storefront Access Token is designed for client-side use
// ─────────────────────────────────────────────────────────────────────────────

const API_VERSION = "2025-01";

export const SHOPIFY_DOMAIN =
  import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || "4pjgc0-kb.myshopify.com";
export const SHOPIFY_TOKEN =
  import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || "3076faa94eaedecff7c3fb2e048ccb3f";

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyPrice;
  compareAtPrice?: ShopifyPrice | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  priceRange: {
    minVariantPrice: ShopifyPrice;
  };
  compareAtPriceRange?: {
    minVariantPrice: ShopifyPrice;
  } | null;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
}

export interface CartLineItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      title: string;
      handle: string;
    };
    image: ShopifyImage | null;
    price: ShopifyPrice;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: ShopifyPrice;
    subtotalAmount: ShopifyPrice;
  };
  lines: CartLineItem[];
}

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    tags
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 6) {
      edges {
        node {
          url
          altText
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              image {
                url
                altText
              }
              product {
                id
                title
                handle
              }
            }
          }
        }
      }
    }
  }
`;

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const token = SHOPIFY_TOKEN;
  const domain = SHOPIFY_DOMAIN;

  if (!token) {
    throw new Error(
      "Shopify Storefront Token is not configured. Add VITE_SHOPIFY_STOREFRONT_TOKEN to .env"
    );
  }

  const endpoint = `https://${domain}/api/${API_VERSION}/graphql.json`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((e: any) => e.message).join(", "));
  }

  return json.data as T;
}

function normalizeProduct(raw: any): ShopifyProduct {
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description ?? "",
    descriptionHtml: raw.descriptionHtml ?? "",
    tags: raw.tags ?? [],
    priceRange: raw.priceRange,
    compareAtPriceRange: raw.compareAtPriceRange ?? null,
    images: (raw.images?.edges ?? []).map((e: any) => e.node),
    variants: (raw.variants?.edges ?? []).map((e: any) => e.node),
  };
}

function normalizeCart(raw: any): ShopifyCart {
  let checkoutUrl = raw.checkoutUrl;
  try {
    const url = new URL(checkoutUrl);
    // Ensure checkout domain matches myshopify domain
    url.hostname = SHOPIFY_DOMAIN;
    checkoutUrl = url.toString();
  } catch (err) {
    // Ignore invalid url
  }

  return {
    id: raw.id,
    checkoutUrl,
    totalQuantity: raw.totalQuantity ?? 0,
    cost: raw.cost,
    lines: (raw.lines?.edges ?? []).map((e: any) => e.node),
  };
}

// ─── Products API ─────────────────────────────────────────────────────────────

export async function getProducts(limit = 20): Promise<ShopifyProduct[]> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProducts($limit: Int!) {
      products(first: $limit, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ products: { edges: { node: any }[] } }>(
    query,
    { limit }
  );

  return (data.products?.edges ?? []).map((e) => normalizeProduct(e.node));
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProductByHandle($handle: String!) {
      product(handle: $handle) {
        ...ProductFields
      }
    }
  `;

  const data = await shopifyFetch<{ product: any | null }>(query, { handle });
  return data.product ? normalizeProduct(data.product) : null;
}

// ─── Cart API ─────────────────────────────────────────────────────────────────

const CART_STORAGE_KEY = "aarth_shopify_cart_id";

export function getStoredCartId(): string | null {
  return localStorage.getItem(CART_STORAGE_KEY);
}

export function setStoredCartId(id: string): void {
  localStorage.setItem(CART_STORAGE_KEY, id);
}

export function clearStoredCartId(): void {
  localStorage.removeItem(CART_STORAGE_KEY);
}

export async function cartCreate(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const mutation = `
    ${CART_FRAGMENT}
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartCreate: { cart: any; userErrors: any[] };
  }>(mutation, { input: { lines } });

  if (data.cartCreate.userErrors?.length) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  const cart = normalizeCart(data.cartCreate.cart);
  setStoredCartId(cart.id);
  return cart;
}

export async function cartLinesAdd(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const mutation = `
    ${CART_FRAGMENT}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesAdd: { cart: any; userErrors: any[] };
  }>(mutation, { cartId, lines });

  if (data.cartLinesAdd.userErrors?.length) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }

  return normalizeCart(data.cartLinesAdd.cart);
}

export async function cartLinesUpdate(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<ShopifyCart> {
  const mutation = `
    ${CART_FRAGMENT}
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: any; userErrors: any[] };
  }>(mutation, { cartId, lines });

  if (data.cartLinesUpdate.userErrors?.length) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }

  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function cartLinesRemove(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const mutation = `
    ${CART_FRAGMENT}
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesRemove: { cart: any; userErrors: any[] };
  }>(mutation, { cartId, lineIds });

  if (data.cartLinesRemove.userErrors?.length) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }

  return normalizeCart(data.cartLinesRemove.cart);
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const query = `
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFields
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ cart: any | null }>(query, { cartId });
    if (!data.cart) {
      clearStoredCartId();
      return null;
    }
    return normalizeCart(data.cart);
  } catch (err) {
    clearStoredCartId();
    return null;
  }
}
