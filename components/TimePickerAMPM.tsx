'use client';

import { useState, useEffect } from 'react';

interface TimePickerAMPMProps {
  value: string; // 24-hour format like "09:00" or "17:00"
  onChange: (value: string) => void; // Returns 24-hour format
  disabled?: boolean;
}

export function TimePickerAMPM({ value, onChange, disabled = false }: TimePickerAMPMProps) {
  // Parse 24-hour format to 12-hour components
  const parse24Hour = (time: string): { hours12: number; minutes: number; period: 'AM' | 'PM' } => {
    const [hours24, minutes] = time.split(':').map(Number);
    const period: 'AM' | 'PM' = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 === 0 ? 12 : hours24 > 12 ? hours24 - 12 : hours24;
    return { hours12, minutes, period };
  };

  const { hours12: initialHour, minutes: initialMinute, period: initialPeriod } = parse24Hour(value);

  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);
  const [period, setPeriod] = useState<'AM' | 'PM'>(initialPeriod);

  // Update when value prop changes
  useEffect(() => {
    const { hours12, minutes, period } = parse24Hour(value);
    setHour(hours12);
    setMinute(minutes);
    setPeriod(period);
  }, [value]);

  // Convert to 24-hour format and call onChange
  const handleChange = (newHour: number, newMinute: number, newPeriod: 'AM' | 'PM') => {
    let hours24 = newHour;

    if (newPeriod === 'PM' && newHour !== 12) {
      hours24 = newHour + 12;
    } else if (newPeriod === 'AM' && newHour === 12) {
      hours24 = 0;
    }

    const formatted = `${hours24.toString().padStart(2, '0')}:${newMinute.toString().padStart(2, '0')}`;
    onChange(formatted);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newHour = parseInt(e.target.value) || 1;
    newHour = Math.max(1, Math.min(12, newHour));
    setHour(newHour);
    handleChange(newHour, minute, period);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMinute = parseInt(e.target.value) || 0;
    newMinute = Math.max(0, Math.min(59, newMinute));
    setMinute(newMinute);
    handleChange(hour, newMinute, period);
  };

  const handlePeriodChange = (newPeriod: 'AM' | 'PM') => {
    setPeriod(newPeriod);
    handleChange(hour, minute, newPeriod);
  };

  return (
    <div className="inline-flex items-center gap-2">
      {/* Hour */}
      <input
        type="number"
        value={hour}
        onChange={handleHourChange}
        min={1}
        max={12}
        disabled={disabled}
        className="w-12 px-2 py-1.5 border border-border-default rounded-[6px] text-[14px] font-medium text-text-primary text-center focus:border-primary-blue focus:outline-none"
      />

      <span className="text-[14px] font-medium text-text-secondary">:</span>

      {/* Minute */}
      <input
        type="number"
        value={minute.toString().padStart(2, '0')}
        onChange={handleMinuteChange}
        min={0}
        max={59}
        disabled={disabled}
        className="w-12 px-2 py-1.5 border border-border-default rounded-[6px] text-[14px] font-medium text-text-primary text-center focus:border-primary-blue focus:outline-none"
      />

      {/* AM/PM Toggle */}
      <div className="inline-flex border border-border-default rounded-[8px] overflow-hidden">
        <button
          type="button"
          onClick={() => handlePeriodChange('AM')}
          disabled={disabled}
          className={`px-3 py-1.5 text-[14px] font-medium transition-colors ${
            period === 'AM'
              ? 'bg-primary-blue text-white'
              : 'bg-white text-text-secondary hover:bg-bg-tertiary'
          }`}
        >
          AM
        </button>
        <button
          type="button"
          onClick={() => handlePeriodChange('PM')}
          disabled={disabled}
          className={`px-3 py-1.5 text-[14px] font-medium transition-colors border-l border-border-default ${
            period === 'PM'
              ? 'bg-primary-blue text-white'
              : 'bg-white text-text-secondary hover:bg-bg-tertiary'
          }`}
        >
          PM
        </button>
      </div>
    </div>
  );
}
