import { ReactNode, useState } from 'react';
import classNames from 'classnames';

interface CardWithTabsProps {
  tabs: { label: string; content: ReactNode }[];
  className?: string;
}

const CardWithTabs = ({ tabs, className }: CardWithTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={classNames('bg-background-alt dark:bg-background-dark-alt rounded-md shadow-lg p-4', className)}>
      {/* Header with Tabs */}
      <div className="flex border-b-2 border-accent">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={classNames(
              'text-sm font-semibold px-4 py-2 transition-colors duration-200 relative',
              {
                'text-accent border-t-2 border-l-2 border-r-2 border-t-[#006666] border-l-gray-200 border-r-gray-200 bg-white rounded-t-md -mb-[2px]':
                  activeTab === index,
                'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-100 border-b-2 border-transparent hover:border-accent ':
                  activeTab !== index,
              }
            )}
            style={{
              borderBottomColor: activeTab === index ? 'transparent' : undefined,
            }}
            type='button'
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6  rounded-b-md">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default CardWithTabs;
