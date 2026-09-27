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

// --- Customer API ---

export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  // We generate a secure random password since Shopify requires it for customer creation via Storefront API.
  // This allows us to add them to the marketing list natively.
  const randomPassword = Math.random().toString(36).slice(-10) + "A1!xZ";

  try {
    const data = await shopifyFetch<{
      customerCreate: { customer: any; customerUserErrors: any[] };
    }>(mutation, {
      input: {
        email,
        password: randomPassword,
        acceptsMarketing: true
      }
    });

    if (data.customerCreate.customerUserErrors?.length) {
      const err = data.customerCreate.customerUserErrors[0];
      // If email already exists, they might already be subscribed or have an account.
      if (err.code === "TAKEN" || err.message.toLowerCase().includes("taken")) {
        return { success: true, message: "Your mark is already in our ledger." };
      }
      throw new Error(err.message);
    }

    return { success: true, message: "Your directive has been sealed. Welcome to the archive." };
  } catch (err: any) {
    return { success: false, message: err.message || "A disruption occurred in the network." };
  }
}

export async function loginCustomer(email: string, password: string) {
  const mutation = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          message
        }
      }
    }
  `;
  const data = await shopifyFetch<any>(mutation, { input: { email, password } });
  const errors = data.customerAccessTokenCreate.customerUserErrors;
  if (errors?.length) throw new Error(errors[0].message);
  return data.customerAccessTokenCreate.customerAccessToken.accessToken;
}

export async function registerCustomer(email: string, password: string, firstName: string, lastName: string) {
  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
        }
        customerUserErrors {
          message
        }
      }
    }
  `;
  const data = await shopifyFetch<any>(mutation, { input: { email, password, firstName, lastName } });
  const errors = data.customerCreate.customerUserErrors;
  if (errors?.length) throw new Error(errors[0].message);
  return true;
}

export async function getCustomerData(accessToken: string) {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        orders(first: 10) {
          edges {
            node {
              orderNumber
              processedAt
              totalPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch<any>(query, { customerAccessToken: accessToken });
  if (!data.customer) throw new Error("Invalid token");
  return data.customer;
}

export async function updateCartBuyerIdentity(cartId: string, customerAccessToken: string): Promise<ShopifyCart | null> {
  const mutation = `
    ${CART_FRAGMENT}
    mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
      cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
        cart {
          ...CartFields
        }
        userErrors {
          message
        }
      }
    }
  `;
  try {
    const data = await shopifyFetch<any>(mutation, {
      cartId,
      buyerIdentity: { customerAccessToken }
    });
    if (data.cartBuyerIdentityUpdate.cart) {
      return normalizeCart(data.cartBuyerIdentityUpdate.cart);
    }
  } catch(e) {}
  return null;
}

export async function getHeroSettings() {
  const query = `
    query getHeroBanner {
      metaobject(handle: {handle: "main-hero-banner", type: "hero_banner"}) {
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image {
                url
              }
            }
            ... on Video {
              sources {
                url
              }
            }
            ... on GenericFile {
              url
            }
          }
          references(first: 1) {
            edges {
              node {
                ... on MediaImage {
                  image {
                    url
                  }
                }
                ... on Video {
                  sources {
                    url
                  }
                }
                ... on GenericFile {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;
  try {
    const data = await shopifyFetch<any>(query);
    if (!data.metaobject) return null;

    let desktopUrl = null;
    let mobileUrl = null;
    let videoUrl = null;

    data.metaobject.fields.forEach((field: any) => {
      const url = field.reference?.image?.url || 
                  field.reference?.sources?.[0]?.url || 
                  field.reference?.url || 
                  field.references?.edges?.[0]?.node?.image?.url ||
                  field.references?.edges?.[0]?.node?.sources?.[0]?.url ||
                  field.references?.edges?.[0]?.node?.url ||
                  (field.value && (field.value.startsWith('http') || field.value.startsWith('/')) ? field.value : null);

      if (field.key === 'desktop_image') desktopUrl = url;
      if (field.key === 'mobile_image') mobileUrl = url;
      if (field.key === 'video_url' || field.key === 'reel_url' || field.key === 'video') videoUrl = url;
    });

    return { desktopUrl, mobileUrl, videoUrl };
  } catch (err) {
    return null;
  }
}

export async function getVideoSettings(): Promise<{ videoUrl: string | null; contactVideoUrl: string | null }> {
  const query = `
    query getVideoReel {
      videoMetaobject: metaobject(handle: {handle: "main-video-reel", type: "video_reel"}) {
        fields {
          key
          value
          reference {
            ... on Video {
              sources {
                url
              }
            }
            ... on GenericFile {
              url
            }
          }
        }
      }
      heroMetaobject: metaobject(handle: {handle: "main-hero-banner", type: "hero_banner"}) {
        fields {
          key
          value
          reference {
            ... on Video {
              sources {
                url
              }
            }
            ... on GenericFile {
              url
            }
          }
        }
      }
    }
  `;
  try {
    const data = await shopifyFetch<any>(query);
    let videoUrl: string | null = null;
    let contactVideoUrl: string | null = null;

    if (data.videoMetaobject?.fields) {
      data.videoMetaobject.fields.forEach((f: any) => {
        const url = f.reference?.sources?.[0]?.url || f.reference?.url || (f.value && (f.value.startsWith('http') || f.value.startsWith('/')) ? f.value : null);
        if (f.key === 'video_url' || f.key === 'video' || f.key === 'reel_url') {
          videoUrl = url;
        }
        if (f.key === 'contact_video_url' || f.key === 'contact_video') {
          contactVideoUrl = url;
        }
      });
    }

    if (!videoUrl && data.heroMetaobject?.fields) {
      data.heroMetaobject.fields.forEach((f: any) => {
        const url = f.reference?.sources?.[0]?.url || f.reference?.url || (f.value && (f.value.startsWith('http') || f.value.startsWith('/')) ? f.value : null);
        if (f.key === 'video_url' || f.key === 'video' || f.key === 'reel_url') {
          videoUrl = url;
        }
      });
    }

    return { videoUrl, contactVideoUrl: contactVideoUrl || videoUrl };
  } catch (err) {
    return { videoUrl: null, contactVideoUrl: null };
  }
}

export async function getCollectionDetails(handle?: string): Promise<{ title: string; description?: string } | null> {
  const query = `
    query getCollections {
      metaobject(handle: {handle: "main-collection-settings", type: "collection_settings"}) {
        fields {
          key
          value
        }
      }
      collections(first: 5) {
        edges {
          node {
            id
            title
            description
            handle
          }
        }
      }
    }
  `;
  try {
    const data = await shopifyFetch<any>(query);
    // 1. Metaobject custom override
    if (data.metaobject?.fields) {
      const titleField = data.metaobject.fields.find((f: any) => f.key === 'title' || f.key === 'name');
      const descField = data.metaobject.fields.find((f: any) => f.key === 'description' || f.key === 'subtitle');
      if (titleField?.value) {
        return { title: titleField.value, description: descField?.value };
      }
    }

    // 2. Active Shopify collection title
    if (data.collections?.edges?.length > 0) {
      const edge = data.collections.edges.find((e: any) => 
        handle ? e.node.handle === handle : (e.node.handle !== "frontpage" && e.node.title)
      ) || data.collections.edges[0];

      if (edge?.node?.title) {
        return {
          title: edge.node.title,
          description: edge.node.description || undefined
        };
      }
    }
  } catch (err) {
    console.warn("Could not fetch collection details from Shopify:", err);
  }
  return null;
}

