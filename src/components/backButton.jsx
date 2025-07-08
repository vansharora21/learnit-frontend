import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ href = "/" }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (href === "/") {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  return (
    <a 
      href={href}
      className="back-button" 
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <svg
        className="back-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      <span className="back-text">Back</span>

      <style jsx="true">{`
        .back-button {
          /* Layout & Positioning */
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          text-decoration: none; /* Remove default link underline */
          
          /* Sizing */
          min-height: 44px;
          min-width: 100px;
          padding: 12px 20px;
          
          /* Typography */
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.025em;
          line-height: 1.2;
          
          /* Colors & Appearance */
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          color: #334155;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          
          /* Effects */
          box-shadow: 
            0 1px 3px 0 rgba(0, 0, 0, 0.1),
            0 1px 2px 0 rgba(0, 0, 0, 0.06),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
          
          /* Interactions */
          cursor: pointer;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .back-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
        }

        .back-icon {
          width: 16px;
          height: 16px;
          margin-right: 8px;
          color: #64748b;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
          z-index: 1;
        }

        .back-text {
          white-space: nowrap;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
        }

        /* Hover Effects */
        .back-button:hover {
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          border-color: #cbd5e1;
          transform: translateY(-2px);
          box-shadow: 
            0 8px 25px -5px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
          text-decoration: none; /* Ensure no underline on hover */
        }

        .back-button:hover::before {
          opacity: 1;
        }

        .back-button:hover .back-icon {
          color: #3b82f6;
          transform: translateX(-3px) scale(1.1);
        }

        .back-button:hover .back-text {
          color: #1e293b;
        }

        /* Active State */
        .back-button:active {
          transform: translateY(-1px) scale(0.98);
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        /* Focus State */
        .back-button:focus {
          box-shadow: 
            0 0 0 3px rgba(59, 130, 246, 0.3),
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border-color: #3b82f6;
          text-decoration: none; /* Remove focus outline underline */
        }

        /* Visited State */
        .back-button:visited {
          color: #334155;
        }

        /* Disabled State */
        .back-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        .back-button:disabled:hover {
          transform: none;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        }

        /* Mobile Responsive */
        @media (max-width: 640px) {
          .back-button {
            min-height: 40px;
            min-width: 80px;
            padding: 10px 16px;
            font-size: 13px;
            border-radius: 10px;
          }

          .back-icon {
            width: 14px;
            height: 14px;
            margin-right: 6px;
          }

          .back-button:hover {
            transform: translateY(-1px);
          }

          .back-button:hover .back-icon {
            transform: translateX(-2px) scale(1.05);
          }
        }

        /* Tablet */
        @media (min-width: 641px) and (max-width: 1024px) {
          .back-button {
            min-height: 42px;
            padding: 11px 18px;
            font-size: 13.5px;
            border-radius: 11px;
          }

          .back-icon {
            width: 15px;
            height: 15px;
            margin-right: 7px;
          }
        }

        /* Large Desktop */
        @media (min-width: 1025px) {
          .back-button {
            min-height: 46px;
            padding: 13px 22px;
            font-size: 15px;
            border-radius: 13px;
          }

          .back-icon {
            width: 17px;
            height: 17px;
            margin-right: 9px;
          }

          .back-button:hover {
            transform: translateY(-3px);
            box-shadow: 
              0 12px 30px -8px rgba(0, 0, 0, 0.15),
              0 6px 8px -2px rgba(0, 0, 0, 0.08),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
          }

          .back-button:hover .back-icon {
            transform: translateX(-4px) scale(1.15);
          }
        }

        /* Touch Devices */
        @media (hover: none) and (pointer: coarse) {
          .back-button {
            min-height: 44px;
            min-width: 44px;
          }

          .back-button:hover {
            transform: none;
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            border-color: #e2e8f0;
            box-shadow: 
              0 1px 3px 0 rgba(0, 0, 0, 0.1),
              0 1px 2px 0 rgba(0, 0, 0, 0.06);
          }

          .back-button:hover .back-icon {
            transform: none;
            color: #64748b;
          }

          .back-button:active {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            transform: scale(0.95);
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .back-button,
          .back-button::before,
          .back-icon,
          .back-text {
            transition: none;
          }
        }

        /* Dark Mode */
        @media (prefers-color-scheme: dark) {
          .back-button {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border-color: #334155;
            color: #e2e8f0;
            box-shadow: 
              0 1px 3px 0 rgba(0, 0, 0, 0.3),
              0 1px 2px 0 rgba(0, 0, 0, 0.2),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
          }

          .back-button::before {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%);
          }

          .back-icon {
            color: #94a3b8;
          }

          .back-button:hover {
            background: linear-gradient(135deg, #334155 0%, #1e293b 100%);
            border-color: #475569;
            box-shadow: 
              0 8px 25px -5px rgba(0, 0, 0, 0.4),
              0 4px 6px -2px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
          }

          .back-button:hover .back-icon {
            color: #60a5fa;
          }

          .back-button:hover .back-text {
            color: #f1f5f9;
          }

          .back-button:focus {
            box-shadow: 
              0 0 0 3px rgba(59, 130, 246, 0.4),
              0 4px 6px -1px rgba(0, 0, 0, 0.3),
              0 2px 4px -1px rgba(0, 0, 0, 0.2);
            border-color: #3b82f6;
          }

          .back-button:visited {
            color: #e2e8f0;
          }
        }

        /* High Contrast Mode */
        @media (prefers-contrast: high) {
          .back-button {
            border-width: 2px;
            border-color: #000;
            background: #fff;
            color: #000;
          }

          .back-button:hover {
            background: #f0f0f0;
            border-color: #000;
          }

          .back-button:focus {
            outline: 3px solid #000;
            outline-offset: 2px;
          }
        }
      `}</style>
    </a>
  );
};

export default BackButton;
