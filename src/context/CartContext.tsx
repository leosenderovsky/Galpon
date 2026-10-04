import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product, formatARS, PRODUCTS } from '../products';
import { BRAND } from '../brand.config';

export interface CartItem {
  id: string; // `${productId}-${size}-${color}`
  productId: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
}

export type DeliveryMethod = 'envio' | 'retiro' | 'expreso';

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  deliveryMethod: DeliveryMethod;
  deliveryMethodLabel: string;
  street: string;
  floor: string;
  postalCode: string;
  city: string;
  notes: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;

  // Modals & Drawers state
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeProductModal: Product | null;
  setActiveProductModal: (product: Product | null) => void;
  isSizeGuideModalOpen: boolean;
  setIsSizeGuideModalOpen: (open: boolean) => void;
  selectedCategoryForGuide: string;
  setSelectedCategoryForGuide: (cat: string) => void;

  // Checkout form details
  customerDetails: CustomerDetails;
  updateCustomerDetails: (details: Partial<CustomerDetails>) => void;

  // Totals & Calculations
  totalItems: number;
  subtotal: number;
  comboDiscount: number;
  total: number;
  wholesaleThreshold: number;
  amountToWholesale: number;
  isWholesaleQualified: boolean;

  // WhatsApp generation
  generateWhatsAppMessage: () => string;
  confirmOrderAndSendWhatsApp: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const brandStorageSlug = BRAND.name
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');
const cartStorageKey = `${brandStorageSlug}_cart`;
const customerStorageKey = `${brandStorageSlug}_customer`;

const getInitialCartItems = (): CartItem[] => BRAND.demo.prefillCart
  ? PRODUCTS.slice(0, 3).map(product => {
    const size = product.sizes[0];
    const color = product.colors[0].name;
    return {
      id: `${product.id}-${size}-${color}`,
      productId: product.id,
      product,
      size,
      color,
      quantity: 1,
      unitPrice: product.price
    };
  })
  : [];

const getInitialCustomerDetails = (): CustomerDetails => ({
  ...(BRAND.demo.prefillCart
    ? BRAND.demo.customer
    : {
      fullName: '',
      phone: '',
      email: '',
      street: '',
      postalCode: '',
      notes: ''
    }),
  deliveryMethod: 'envio',
  deliveryMethodLabel: 'Envío a Domicilio (Correo Argentino / Andreani)',
  floor: '',
  city: BRAND.address.city
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(cartStorageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return getInitialCartItems();
  });

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(() => {
    try {
      const saved = localStorage.getItem(customerStorageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return getInitialCustomerDetails();
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] = useState(false);
  const [selectedCategoryForGuide, setSelectedCategoryForGuide] = useState<string>('camperas');

  useEffect(() => {
    try {
      localStorage.setItem(cartStorageKey, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(customerStorageKey, JSON.stringify(customerDetails));
    } catch {
      // ignore
    }
  }, [customerDetails]);

  const updateCustomerDetails = (details: Partial<CustomerDetails>) => {
    setCustomerDetails(prev => ({ ...prev, ...details }));
  };

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    const itemId = `${product.id}-${size}-${color}`;
    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === itemId);
      if (existing) {
        return prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: itemId,
          productId: product.id,
          product,
          size,
          color,
          quantity,
          unitPrice: product.price
        }
      ];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculations
  const wholesaleThreshold = BRAND.b2b.cartWholesaleTarget;

  const { totalItems, subtotal } = useMemo(() => {
    let count = 0;
    let sum = 0;
    for (const item of items) {
      count += item.quantity;
      // Si la cantidad de este ítem alcanza el umbral mayorista del producto, usar wholesalePrice
      const effectivePrice =
        item.quantity >= item.product.wholesaleMinUnits
          ? item.product.wholesalePrice
          : item.product.price;
      sum += effectivePrice * item.quantity;
    }
    return { totalItems: count, subtotal: sum };
  }, [items]);

  // Descuento por compra en combo según la configuración de la marca.
  const comboDiscount = useMemo(() => {
    if (totalItems >= BRAND.b2b.comboMinItems) {
      return Math.round(subtotal * (BRAND.b2b.comboDiscountPercent / 100));
    }
    return 0;
  }, [totalItems, subtotal]);

  const total = Math.max(0, subtotal - comboDiscount);

  const amountToWholesale = Math.max(0, wholesaleThreshold - subtotal);
  const isWholesaleQualified = amountToWholesale === 0;

  // Build the formatted WhatsApp message
  const generateWhatsAppMessage = () => {
    const isRetiro = customerDetails.deliveryMethod === 'retiro';
    
    let addressLine = isRetiro
      ? `${BRAND.address.pickupLabel} (${BRAND.address.full})`
      : `${customerDetails.street}${customerDetails.floor ? ', ' + customerDetails.floor : ''}${customerDetails.postalCode ? ' (CP ' + customerDetails.postalCode + ')' : ''}${customerDetails.city ? ', ' + customerDetails.city : ''}`;

    if (!addressLine.trim()) {
      addressLine = 'A coordinar por WhatsApp';
    }

    const itemsSummary = items.map(item => {
      return `- ${item.quantity}x ${item.product.name} (Talle ${item.size}, ${item.color}) [${formatARS(item.unitPrice * item.quantity)}]`;
    }).join('\n');

    const discountLine = comboDiscount > 0
      ? `\nDescuento Combo desde ${BRAND.b2b.comboMinItems} prendas (${BRAND.b2b.comboDiscountPercent}% OFF): -${formatARS(comboDiscount)}`
      : '';

    const lines = [
      `Hola ${BRAND.name}! 👋 Quiero confirmar mi pedido:`,
      itemsSummary || '- (Sin productos seleccionados)',
      '───────────────────',
      `Subtotal: ${formatARS(subtotal)}${discountLine}`,
      `Total Estimado: ${formatARS(total)}`,
      `Cliente: ${customerDetails.fullName || 'No especificado'}`,
      `Tel: ${customerDetails.phone || 'No especificado'}`,
      customerDetails.email ? `Email: ${customerDetails.email}` : '',
      `Modalidad: ${customerDetails.deliveryMethodLabel}`,
      `Destino: ${addressLine}`,
      `Notas: ${customerDetails.notes || 'Sin notas adicionales.'}`,
      '───────────────────',
      '¿Tienen stock disponible para coordinar pago y despacho?'
    ].filter(Boolean);

    return lines.join('\n');
  };

  const confirmOrderAndSendWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${BRAND.whatsapp.rawNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeProductModal,
        setActiveProductModal,
        isSizeGuideModalOpen,
        setIsSizeGuideModalOpen,
        selectedCategoryForGuide,
        setSelectedCategoryForGuide,
        customerDetails,
        updateCustomerDetails,
        totalItems,
        subtotal,
        comboDiscount,
        total,
        wholesaleThreshold,
        amountToWholesale,
        isWholesaleQualified,
        generateWhatsAppMessage,
        confirmOrderAndSendWhatsApp
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
