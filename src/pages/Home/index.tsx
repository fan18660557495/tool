import React, { useState, useRef } from 'react';
import { Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './index.module.css';
import homeIcon1 from '../../assets/home-icon-1.webp';
import homeIcon2 from '../../assets/home-icon-2.webp';
import homeIcon3 from '../../assets/home-icon-3.webp';
import homeIcon4 from '../../assets/home-icon-4.webp';
import mainBg from '../../assets/main-bg.webp';

interface CardData {
  id: string;
  title: string;
  icon: string;
  onClick?: () => void;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const cardData: CardData[] = [
    {
      id: 'jiezhuang',
      title: '结转工具',
      icon: homeIcon1,
      onClick: () => navigate('/transfer-list')
    },
    {
      id: 'fentan',
      title: '分摊工具',
      icon: homeIcon2,
      onClick: () => navigate('/allocation-list')
    },
    {
      id: 'system',
      title: '系统管理',
      icon: homeIcon3,
      onClick: () => navigate('/system-management')
    },
    {
      id: 'account',
      title: '账户管理',
      icon: homeIcon4,
      onClick: () => navigate('/account-management')
    }
  ];

  const handleCardMouseEnter = (cardId: string) => {
    setHoveredCard(cardId);
  };

  const handleCardMouseLeave = () => {
    setHoveredCard(null);
  };

  const handleCardMouseMove = (e: React.MouseEvent, cardId: string) => {
    const card = cardRefs.current[cardId];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  const getCardStyle = (cardId: string) => {
    if (hoveredCard !== cardId) return {};

    return {
      background: `radial-gradient(300px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(22, 93, 255, 0.05) 0%, transparent 50%)`,
      borderColor: '#165DFF',
      boxShadow: '0 8px 24px rgba(22, 93, 255, 0.1)',
      transform: 'translateY(-2px)',
    };
  };

  return (
    <div className={styles.homeContainer}>
      {/* 顶部导航 */}
      <Header />
      
      {/* 背景装饰 */}
      <div 
        className={styles.backgroundDecoration}
        style={{ backgroundImage: `url(${mainBg})` }}
      />
      
      {/* 主体内容 */}
      <div className={styles.mainContent}>
        {/* 欢迎标题 */}
        <div className={styles.welcomeSection}>
          <div className={styles.welcomeText}>
            <span className={styles.welcomeTitle}>欢迎使用财务工具平台，即刻开启</span>
            <span className={styles.smartOffice}>智能办公</span>
          </div>
        </div>

        {/* 功能卡片区域 */}
        <div className={styles.cardsSection}>
          <Row gutter={[40, 40]}>
            {cardData.map((card) => (
              <Col key={card.id} xs={24} sm={12} md={12} lg={6}>
                <div
                  ref={(el) => (cardRefs.current[card.id] = el)}
                  className={styles.cardWrapper}
                  onMouseEnter={() => handleCardMouseEnter(card.id)}
                  onMouseLeave={handleCardMouseLeave}
                  onMouseMove={(e) => handleCardMouseMove(e, card.id)}
                  onClick={card.onClick}
                  style={getCardStyle(card.id)}
                >
                  <Card 
                    className={styles.functionCard}
                    bodyStyle={{ padding: '32px' }}
                  >
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{card.title}</h3>
                      <div className={styles.cardIcon}>
                        <img src={card.icon} alt={card.title} />
                      </div>
                    </div>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home; 