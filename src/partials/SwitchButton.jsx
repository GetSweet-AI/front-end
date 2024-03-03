import { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function SwitchButton({ enabled, setEnabled }) {
  return (
    <div className="flex items-center justify-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-blue-900' : 'bg-gray-200'
          } relative inline-flex flex-shrink-0 w-12 h-6 border-2 border-transparent rounded-full cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-6' : 'translate-x-0'
            } pointer-events-none inline-block w-5 h-5 rounded-full bg-white shadow-sm ring-1 ring-blue-500 transition-transform duration-200 ease-in-out`}
        />
      </Switch>
      <span className="sr-only">
        {enabled ? 'Enabled' : 'Disabled'}
      </span>
    </div>
  );
}
