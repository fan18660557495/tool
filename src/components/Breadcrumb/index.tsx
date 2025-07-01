import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

interface BreadcrumbItem {
  title: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className={styles.breadcrumb}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <div className={`${styles.breadcrumbItem} ${index === items.length - 1 ? styles.current : ''}`}>
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            {item.href ? (
              <Link to={item.href} className={styles.link}>
                {item.title}
              </Link>
            ) : (
              <span className={styles.text}>{item.title}</span>
            )}
          </div>
          {index < items.length - 1 && (
            <span className={styles.separator}>/</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb; 