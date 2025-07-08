import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      <svg
        className="back-icon"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 1024 1024"
      >
        <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z" />
      </svg>
      <span className="back-text">Back</span>

      <style jsx="true">{`
        .back-button {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 44px; /* Minimum touch target size */
          width: 300px;
          padding: 0.5rem 0.75rem;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-weight: 500;
          color: #374151;
          font-size: 0.875rem;
          letter-spacing: 0.025em;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          outline: none;
          position: relative;
          overflow: hidden;
        }

        .back-icon {
          width: 14px;
          height: 14px;
          margin-right: 0.375rem;
          fill: #6b7280;
          transition: all 0.3s ease-in-out;
          flex-shrink: 0;
        }

        .back-text {
          white-space: nowrap;
          transition: all 0.2s ease-in-out;
        }

        .back-button:hover {
          background: #f9fafb;
          border-color: #d1d5db;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transform: translateY(-1px);
        }

        .back-button:hover .back-icon {
          fill: #374151;
          transform: translateX(-2px);
        }

        .back-button:active {
          transform: translateY(0);
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        .back-button:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
          border-color: #3b82f6;
        }

        /* Small Mobile (320px - 479px) */
        @media (max-width: 479px) {
          .back-button {
            min-height: 40px;
            min-width: 100px;
            padding: 0.375rem 0.5rem;
            font-size: 0.75rem;
            border-radius: 4px;
          }

          .back-icon {
            width: 12px;
            height: 12px;
            margin-right: 0.25rem;
          }

          .back-button:hover {
            transform: none; /* Disable hover transform on small screens */
          }

          .back-button:hover .back-icon {
            transform: translateX(-1px);
          }
        }

        /* Mobile (480px - 639px) */
        @media (min-width: 480px) and (max-width: 639px) {
          .back-button {
            min-height: 42px;
            min-width: 75px;
            padding: 0.4rem 0.6rem;
            font-size: 0.8rem;
            border-radius: 5px;
          }

          .back-icon {
            width: 13px;
            height: 13px;
            margin-right: 0.3rem;
          }
        }

        /* Tablet (640px - 767px) */
        @media (min-width: 640px) and (max-width: 767px) {
          .back-button {
            min-height: 44px;
            min-width: 80px;
            padding: 0.5rem 0.75rem;
            font-size: 0.875rem;
          }

          .back-icon {
            width: 14px;
            height: 14px;
            margin-right: 0.375rem;
          }
        }

        /* Desktop (768px - 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .back-button {
            min-height: 46px;
            min-width: 85px;
            padding: 0.5rem 0.875rem;
            font-size: 0.9rem;
          }

          .back-icon {
            width: 15px;
            height: 15px;
            margin-right: 0.4rem;
          }
        }

        /* Large Desktop (1024px+) */
        @media (min-width: 1024px) {
          .back-button {
            min-height: 48px;
            min-width: 90px;
            padding: 0.625rem 1rem;
            font-size: 0.95rem;
          }

          .back-icon {
            width: 16px;
            height: 16px;
            margin-right: 0.5rem;
          }

          .back-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }

          .back-button:hover .back-icon {
            transform: translateX(-3px);
          }
        }

        /* High DPI Displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .back-button {
            border-width: 0.5px;
          }
        }

        /* Touch Devices */
        @media (hover: none) and (pointer: coarse) {
          .back-button {
            min-height: 44px; /* Ensure minimum touch target */
            min-width: 44px;
          }

          .back-button:hover {
            transform: none;
            background: #fff;
            border-color: #e5e7eb;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }

          .back-button:hover .back-icon {
            transform: none;
            fill: #6b7280;
          }

          .back-button:active {
            background: #f3f4f6;
            transform: scale(0.98);
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .back-button,
          .back-icon,
          .back-text {
            transition: none;
          }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
          .back-button {
            background: #1f2937;
            border-color: #374151;
            color: #f9fafb;
          }

          .back-icon {
            fill: #9ca3af;
          }

          .back-button:hover {
            background: #374151;
            border-color: #4b5563;
          }

          .back-button:hover .back-icon {
            fill: #f9fafb;
          }

          .back-button:focus {
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
            border-color: #3b82f6;
          }
        }
      `}</style>
    </button>
  );
};

export default BackButton;
