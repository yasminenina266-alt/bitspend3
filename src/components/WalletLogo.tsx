import React from 'react';

interface WalletLogoProps {
  walletId: string;
  className?: string;
}

export const ApplePayMark: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
  <svg
    viewBox="0 0 112 46"
    fill="none"
    className={className}
    role="img"
    aria-label="Apple Pay"
  >
    <rect x="0.75" y="0.75" width="110.5" height="44.5" rx="8" fill="#000000" stroke="#1F2937" strokeWidth="1.5" />
    {/* Official Apple silhouette */}
    <path
      d="M34.2 19.3c-.1-2.5 2-3.7 2.1-3.8-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-2-.9-3.2-.9-1.6 0-3.2 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3.1 2.5 1.2-.1 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.6-1-2.7-3.8Zm-2.4-7.2c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4Z"
      fill="#FFFFFF"
    />
    {/* Crisp Pay wordmark */}
    <text
      x="46"
      y="30"
      fill="#FFFFFF"
      fontFamily="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif"
      fontSize="20"
      fontWeight="600"
      letterSpacing="-0.4"
    >
      Pay
    </text>
  </svg>
);

export const GooglePayMark: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
  <svg
    viewBox="0 0 118 46"
    fill="none"
    className={className}
    role="img"
    aria-label="Google Pay"
  >
    <rect x="0.75" y="0.75" width="116.5" height="44.5" rx="8" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" />
    {/* Google 4-color G */}
    <path
      d="M35.8 23.2c0-.7-.06-1.4-.18-2.06H26v3.9h5.5c-.24 1.28-.96 2.36-2.04 3.08v2.56h3.3c1.93-1.78 3.04-4.4 3.04-7.48Z"
      fill="#4285F4"
    />
    <path
      d="M26 33.2c2.76 0 5.07-.91 6.76-2.47l-3.3-2.56c-.91.61-2.08.98-3.46.98-2.66 0-4.91-1.8-5.72-4.21h-3.4v2.64c1.68 3.34 5.13 5.62 9.12 5.62Z"
      fill="#34A853"
    />
    <path
      d="M20.28 24.94c-.2-.61-.32-1.26-.32-1.94s.12-1.33.32-1.94v-2.64h-3.4A10.17 10.17 0 0 0 15.8 23c0 1.64.39 3.2 1.08 4.58l3.4-2.64Z"
      fill="#FBBC04"
    />
    <path
      d="M26 16.85c1.5 0 2.85.52 3.91 1.53l2.93-2.93C31.06 13.79 28.75 12.8 26 12.8c-3.99 0-7.44 2.28-9.12 5.62l3.4 2.64c.81-2.41 3.06-4.21 5.72-4.21Z"
      fill="#EA4335"
    />
    <text
      x="44"
      y="29.5"
      fill="#3C4043"
      fontFamily="'Plus Jakarta Sans', -apple-system, sans-serif"
      fontSize="19"
      fontWeight="600"
      letterSpacing="-0.3"
    >
      Pay
    </text>
  </svg>
);

export const WalletLogo: React.FC<WalletLogoProps> = ({ walletId, className = 'w-6 h-6' }) => {
  switch (walletId) {
    case 'ledger':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#000000" />
          <path d="M7 7H13.2V9.3H9.3V13.2H7V7Z" fill="#FFFFFF" />
          <path d="M18.8 7H25V13.2H22.7V9.3H18.8V7Z" fill="#FFFFFF" />
          <path d="M7 18.8H9.3V22.7H13.2V25H7V18.8Z" fill="#FFFFFF" />
          <path d="M22.7 18.8H25V25H18.8V22.7H22.7V18.8Z" fill="#FFFFFF" />
          <path d="M13 12.2H15.3V17.7H19.8V20H13V12.2Z" fill="#FFFFFF" />
        </svg>
      );
    case 'phantom':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#AB9FF2" />
          <path
            d="M8.5 22.8C6.6 22.8 6 20.6 6.4 18.2C7.1 13.7 11.4 8.5 17.5 8.5C22.9 8.5 25.5 12.1 25.5 16.4C25.5 20.4 22.5 23.2 19.6 23.2C18.2 23.2 17.5 22.2 17.3 21.5C16.8 22.4 15.8 23.2 14.5 23.2C13.3 23.2 12.6 22.3 12.4 21.5C11.7 22.3 10.4 22.8 8.5 22.8Z"
            fill="#FFFFFF"
          />
          <ellipse cx="14.5" cy="14.8" rx="1.25" ry="1.8" fill="#3C315B" />
          <ellipse cx="19.3" cy="14.8" rx="1.25" ry="1.8" fill="#3C315B" />
        </svg>
      );
    case 'trust':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="trustGrad" x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0500FF" />
              <stop offset="100%" stopColor="#00E1FF" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="8" fill="#FFFFFF" />
          <path
            d="M16 4.5L7.5 7.9V15.1C7.5 21.3 11.1 26.2 16 27.8C20.9 26.2 24.5 21.3 24.5 15.1V7.9L16 4.5Z"
            fill="url(#trustGrad)"
          />
          <path
            d="M16 7.5L10.3 9.8V15.1C10.3 19.6 12.7 23.2 16 24.6C19.3 23.2 21.7 19.6 21.7 15.1V9.8L16 7.5Z"
            fill="#FFFFFF"
          />
          <path
            d="M16 9.6L12.1 11.2V15.1C12.1 18.3 13.7 21 16 22.1C18.3 21 19.9 18.3 19.9 15.1V11.2L16 9.6Z"
            fill="url(#trustGrad)"
          />
        </svg>
      );
    case 'metamask':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#FFF6EE" />
          <path d="M25.6 5.5L17.3 11.6L18.8 8L25.6 5.5Z" fill="#E17726" stroke="#E17726" strokeWidth="0.4" />
          <path d="M6.4 5.5L14.6 11.7L13.2 8L6.4 5.5Z" fill="#E27625" stroke="#E27625" strokeWidth="0.4" />
          <path d="M22.6 20.6L20.4 24L25.1 25.3L26.5 20.7L22.6 20.6Z" fill="#E27625" />
          <path d="M5.5 20.7L6.9 25.3L11.6 24L9.4 20.6L5.5 20.7Z" fill="#E27625" />
          <path d="M11.3 14.3L10 16.3L14.7 16.5L14.5 11.4L11.3 14.3Z" fill="#E27625" />
          <path d="M20.7 14.3L17.4 11.3L17.3 16.5L22 16.3L20.7 14.3Z" fill="#E27625" />
          <path d="M11.6 24L14.4 22.6L12 20.7L11.6 24Z" fill="#E27625" />
          <path d="M17.6 22.6L20.4 24L20 20.7L17.6 22.6Z" fill="#E27625" />
          <path d="M14.4 22.6L11.6 24L13.5 25.6L16 25.6L14.4 22.6Z" fill="#D5BFB2" />
          <path d="M17.6 22.6L16 25.6L18.5 25.6L20.4 24L17.6 22.6Z" fill="#D5BFB2" />
          <path d="M12.7 18.8L10 16.3L11.3 20.6L12.7 18.8Z" fill="#F5841F" />
          <path d="M19.3 18.8L20.7 20.6L22 16.3L19.3 18.8Z" fill="#F5841F" />
          <path d="M14.7 16.5L12.7 18.8L14.4 22.6L16 20.4L17.6 22.6L19.3 18.8L17.3 16.5H14.7Z" fill="#F5841F" />
        </svg>
      );
    case 'coinbase':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#0052FF" />
          <circle cx="16" cy="16" r="9.5" fill="#FFFFFF" />
          <rect x="12.7" y="12.7" width="6.6" height="6.6" rx="1.6" fill="#0052FF" />
        </svg>
      );
    case 'trezor':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#0F172A" />
          <path
            d="M12 11.5V9.8C12 7.6 13.8 5.8 16 5.8C18.2 5.8 20 7.6 20 9.8V11.5"
            stroke="#FFFFFF"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <path
            d="M9.5 12H22.5V21.5L16 26.2L9.5 21.5V12Z"
            fill="#FFFFFF"
          />
          <circle cx="16" cy="18" r="1.9" fill="#0F172A" />
        </svg>
      );
    case 'rainbow':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#174299" />
          <path d="M7 22C7 14.3 13.3 8 21 8H25" stroke="#FF494A" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M11 22C11 16.5 15.5 12 21 12H25" stroke="#FFA300" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M15 22C15 18.7 17.7 16 21 16H25" stroke="#0082F3" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case 'exodus':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#1F1938" />
          <path d="M25.2 9.5L17.5 5V10.4L21.7 13L18.1 16L21.7 19L17.5 21.6V27L25.2 22.5L20.5 16L25.2 9.5Z" fill="#7B5CFF" />
          <path d="M6.8 9.5L14.5 5V10.4L10.3 13L13.9 16L10.3 19L14.5 21.6V27L6.8 22.5L11.5 16L6.8 9.5Z" fill="#00B4FF" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#0A2540" />
          <rect x="7" y="10" width="18" height="12" rx="2.5" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="20.5" cy="16" r="1.5" fill="#FFFFFF" />
        </svg>
      );
  }
};
