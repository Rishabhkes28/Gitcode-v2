import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(theme === 'dark');
  }, [theme]);

  const handleToggleChange = (value) => {
    setEnabled(value);
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleToggleChange}
      className={classNames(
        enabled ? 'bg-green-500' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out'
      )}
    >
      <span
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      >
        <span
          className={classNames(
            enabled
              ? 'opacity-0 duration-100 ease-out'
              : 'opacity-100 duration-200 ease-in',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <SunIcon className="w-3 h-3 text-black" />
        </span>
        <span
          className={classNames(
            enabled
              ? 'opacity-100 duration-200 ease-in'
              : 'opacity-0 duration-100 ease-out',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <MoonIcon className="w-3 h-3 text-black" />
        </span>
      </span>
    </Switch>
  );
}
