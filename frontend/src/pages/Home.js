import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from '../config/api';

const HomeContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: white;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const StatusSection = styled.section`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const StatusTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const StatusItem = styled.div`
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
`;

const StatusValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 8px;
`;

const StatusLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

function Home() {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await api.health();
        setHealthStatus(response.data);
      } catch (error) {
        console.error('Health check failed:', error);
        setHealthStatus({ status: 'ERROR', message: '後端服務連接失敗' });
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  const features = [
    {
      icon: '🐳',
      title: 'Docker Compose',
      description: '使用 Docker Compose 實現容器化部署，確保開發與生產環境一致性'
    },
    {
      icon: '⚛️',
      title: 'React 前端',
      description: '現代化的 React 應用，具備響應式設計和優秀的用戶體驗'
    },
    {
      icon: '🚀',
      title: 'Node.js 後端',
      description: '高性能的 Express.js API 服務，提供 RESTful 接口'
    },
    {
      icon: '🔧',
      title: '完全分離',
      description: '前後端代碼完全分離，便於團隊協作和獨立部署'
    }
  ];

  return (
    <HomeContainer>
      <Hero>
        <Title>全端測試網站</Title>
        <Subtitle>
          基於 Docker Compose 的現代化全端應用，實現前後端完全分離的架構設計
        </Subtitle>
      </Hero>

      <FeatureGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeatureGrid>

      <StatusSection>
        <StatusTitle>系統狀態</StatusTitle>
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <StatusGrid>
            <StatusItem>
              <StatusValue>
                {healthStatus?.status === 'OK' ? '✅' : '❌'}
              </StatusValue>
              <StatusLabel>後端服務</StatusLabel>
            </StatusItem>
            <StatusItem>
              <StatusValue>✅</StatusValue>
              <StatusLabel>前端服務</StatusLabel>
            </StatusItem>
            <StatusItem>
              <StatusValue>
                {healthStatus?.version || 'N/A'}
              </StatusValue>
              <StatusLabel>版本號</StatusLabel>
            </StatusItem>
            <StatusItem>
              <StatusValue>
                {healthStatus?.timestamp ? 
                  new Date(healthStatus.timestamp).toLocaleTimeString('zh-TW') : 
                  'N/A'
                }
              </StatusValue>
              <StatusLabel>最後更新</StatusLabel>
            </StatusItem>
          </StatusGrid>
        )}
      </StatusSection>
    </HomeContainer>
  );
}

export default Home;