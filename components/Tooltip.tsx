import { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="tooltip-wrapper">
      {children}
      <div className="tooltip-bubble">
        {content}
        <div className="tooltip-arrow" />
      </div>

      <style jsx>{`
        .tooltip-wrapper {
          position: relative;
          display: inline-flex;
        }

        .tooltip-bubble {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: #23262F;
          color: white;
          font-family: var(--font-poppins), sans-serif;
          font-size: 12px;
          line-height: 18px;
          padding: 8px 12px;
          border-radius: 6px;
          width: max-content;
          max-width: 240px;
          white-space: normal;
          z-index: 9999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 150ms ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .tooltip-wrapper:hover .tooltip-bubble {
          opacity: 1;
          pointer-events: auto;
        }

        .tooltip-arrow {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid #23262F;
        }
      `}</style>
    </div>
  );
}
