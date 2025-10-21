import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 40px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8rem;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
`;

const Description = styled.p`
  color: #666;
  line-height: 1.8;
  margin-bottom: 20px;
  font-size: 1.1rem;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 30px 0;
`;

const TechCard = styled.div`
  background: #f8f9fa;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }
`;

const TechIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 15px;
`;

const TechName = styled.h3`
  color: #333;
  margin-bottom: 10px;
  font-size: 1.3rem;
`;

const TechDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const FeatureItem = styled.li`
  color: #666;
  margin-bottom: 12px;
  padding-left: 30px;
  position: relative;
  line-height: 1.6;

  &:before {
    content: '✅';
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const ContactInfo = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  margin-top: 30px;
`;

const ContactTitle = styled.h3`
  margin-bottom: 15px;
  font-size: 1.5rem;
`;

const ContactText = styled.p`
  margin-bottom: 10px;
  opacity: 0.9;
`;

const GitHubLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 10px 20px;
  border: 2px solid white;
  border-radius: 8px;
  display: inline-block;
  margin-top: 15px;
  transition: all 0.2s ease;

  &:hover {
    background: white;
    color: #667eea;
  }
`;

function About() {
  const technologies = [
    {
      icon: '⚛️',
      name: 'React 18',
      description: '現代化的前端框架，提供組件化開發和優秀的性能'
    },
    {
      icon: '🚀',
      name: 'Node.js',
      description: '高性能的 JavaScript 運行環境，用於構建後端 API'
    },
    {
      icon: '🐳',
      name: 'Docker',
      description: '容器化技術，確保開發和生產環境的一致性'
    },
    {
      icon: '🔧',
      name: 'Express.js',
      description: '輕量級的 Node.js Web 框架，用於構建 RESTful API'
    },
    {
      icon: '💅',
      name: 'Styled Components',
      description: 'CSS-in-JS 解決方案，提供動態樣式和主題支持'
    },
    {
      icon: '🌐',
      name: 'Nginx',
      description: '高性能的反向代理服務器，用於負載均衡和靜態文件服務'
    }
  ];

  return (
    <AboutContainer>
      <PageTitle>關於我們</PageTitle>
      
      <ContentCard>
        <SectionTitle>專案介紹</SectionTitle>
        <Description>
          這是一個基於 Docker Compose 的現代化全端測試網站，展示了前後端完全分離的架構設計。
          本專案採用最新的 Web 開發技術棧，包括 React 18 前端框架和 Node.js 後端服務，
          通過 Docker 容器化技術實現了開發環境與部署環境的完全一致性。
        </Description>
        
        <Description>
          專案的核心理念是提供一個可擴展、易維護的全端應用架構模板，
          適合用於學習現代 Web 開發技術、快速原型開發，以及作為生產環境應用的基礎架構。
        </Description>
      </ContentCard>

      <ContentCard>
        <SectionTitle>技術棧</SectionTitle>
        <TechGrid>
          {technologies.map((tech, index) => (
            <TechCard key={index}>
              <TechIcon>{tech.icon}</TechIcon>
              <TechName>{tech.name}</TechName>
              <TechDescription>{tech.description}</TechDescription>
            </TechCard>
          ))}
        </TechGrid>
      </ContentCard>

      <ContentCard>
        <SectionTitle>專案特色</SectionTitle>
        <FeatureList>
          <FeatureItem>
            <strong>完全分離架構：</strong>前端和後端代碼完全獨立，便於團隊協作和獨立部署
          </FeatureItem>
          <FeatureItem>
            <strong>容器化部署：</strong>使用 Docker Compose 實現一鍵部署，確保環境一致性
          </FeatureItem>
          <FeatureItem>
            <strong>現代化 UI：</strong>響應式設計，支持多種設備和屏幕尺寸
          </FeatureItem>
          <FeatureItem>
            <strong>RESTful API：</strong>標準化的 API 設計，支持 CRUD 操作
          </FeatureItem>
          <FeatureItem>
            <strong>實時數據：</strong>支持實時數據更新和系統狀態監控
          </FeatureItem>
          <FeatureItem>
            <strong>安全性：</strong>內建安全中間件，包括 CORS、Helmet 等安全措施
          </FeatureItem>
          <FeatureItem>
            <strong>可擴展性：</strong>模組化設計，易於添加新功能和擴展
          </FeatureItem>
          <FeatureItem>
            <strong>開發友好：</strong>熱重載、錯誤處理、日誌記錄等開發工具
          </FeatureItem>
        </FeatureList>
      </ContentCard>

      <ContentCard>
        <SectionTitle>架構說明</SectionTitle>
        <Description>
          本專案採用微服務架構設計，主要包含以下組件：
        </Description>
        <FeatureList>
          <FeatureItem>
            <strong>前端服務 (Frontend)：</strong>React 18 應用，運行在 3000 端口
          </FeatureItem>
          <FeatureItem>
            <strong>後端服務 (Backend)：</strong>Node.js/Express API 服務，運行在 3001 端口
          </FeatureItem>
          <FeatureItem>
            <strong>反向代理 (Nginx)：</strong>負責路由分發和靜態文件服務，運行在 80 端口
          </FeatureItem>
          <FeatureItem>
            <strong>容器編排 (Docker Compose)：</strong>管理所有服務的生命週期和網路通信
          </FeatureItem>
        </FeatureList>
      </ContentCard>

      <ContentCard>
        <ContactInfo>
          <ContactTitle>🚀 開始使用</ContactTitle>
          <ContactText>
            想要了解更多或參與開發？歡迎查看我們的 GitHub 倉庫！
          </ContactText>
          <ContactText>
            本專案完全開源，歡迎提交 Issue 和 Pull Request
          </ContactText>
          <GitHubLink href="#" target="_blank" rel="noopener noreferrer">
            📚 查看文檔
          </GitHubLink>
        </ContactInfo>
      </ContentCard>
    </AboutContainer>
  );
}

export default About;