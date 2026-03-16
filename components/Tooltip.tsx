'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  delay?: number;
}

export function Tooltip({ content, children, delay = 150 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    const id = setTimeout(() => {
      // Check if tooltip would be cut off at top of viewport
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const spaceAbove = rect.top;
        const spaceBelow = window.innerHeight - rect.bottom;

        // If less than 100px above, show below instead
        if (spaceAbove < 100 && spaceBelow > 100) {
          setPosition('bottom');
        } else {
          setPosition('top');
        }
      }
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  return (
    <div
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 pointer-events-none ${
            position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
          style={{
            zIndex: 1000,
            maxWidth: '260px'
          }}
        >
          <div
            className="bg-[#23262F] text-white text-[12px] leading-[18px] rounded-[6px] py-2 px-3 shadow-lg"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            {content}
            {/* Arrow pointing to trigger */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 ${
                position === 'top'
                  ? 'top-full border-t-[#23262F]'
                  : 'bottom-full border-b-[#23262F]'
              }`}
              style={{
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                ...(position === 'top'
                  ? { borderTop: '6px solid #23262F' }
                  : { borderBottom: '6px solid #23262F' }
                )
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
