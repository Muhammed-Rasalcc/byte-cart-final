export const getBaseUrl = () => {
    return import.meta.env.VITE_API_BASE_URL || "https://byte-cart-backend.vercel.app";
};