import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from '../config/api';

const StatsContainer = styled.div`
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const StatIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 15px;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
`;

const StatDescription = styled.div`
  color: #888;
  font-size: 0.9rem;
  margin-top: 8px;
`;

const SystemInfoCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const SystemInfoTitle = styled.h2`
  color: #333;
  margin-bottom: 25px;
  text-align: center;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const InfoItem = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #667eea;
`;

const InfoLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 5px;
  font-weight: 500;
`;

const InfoValue = styled.div`
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px;
  color: white;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  background: rgba(255, 255, 255, 0.95);
  color: #c33;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  margin: 20px 0;
`;

const RefreshButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: block;
  margin: 20px auto;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.stats();
      setStats(response.data.data);
    } catch (err) {
      setError('無法載入統計數據');
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) {
      return `${days}天 ${hours}小時 ${minutes}分鐘`;
    } else if (hours > 0) {
      return `${hours}小時 ${minutes}分鐘`;
    } else {
      return `${minutes}分鐘`;
    }
  };

  const formatMemory = (bytes) => {
    const mb = (bytes / 1024 / 1024).toFixed(2);
    return `${mb} MB`;
  };

  if (loading) {
    return (
      <StatsContainer>
        <PageTitle>系統統計</PageTitle>
        <LoadingMessage>
          <div className="spinner" style={{ margin: '0 auto 20px' }}></div>
          載入統計數據中...
        </LoadingMessage>
      </StatsContainer>
    );
  }

  if (error) {
    return (
      <StatsContainer>
        <PageTitle>系統統計</PageTitle>
        <ErrorMessage>
          {error}
          <RefreshButton onClick={fetchStats}>重新載入</RefreshButton>
        </ErrorMessage>
      </StatsContainer>
    );
  }

  return (
    <StatsContainer>
      <PageTitle>系統統計</PageTitle>
      
      <StatsGrid>
        <StatCard>
          <StatIcon>👥</StatIcon>
          <StatValue>{stats?.totalUsers || 0}</StatValue>
          <StatLabel>總用戶數</StatLabel>
          <StatDescription>系統註冊用戶總數</StatDescription>
        </StatCard>
        
        <StatCard>
          <StatIcon>🟢</StatIcon>
          <StatValue>{stats?.activeUsers || 0}</StatValue>
          <StatLabel>活躍用戶</StatLabel>
          <StatDescription>當前活躍用戶數量</StatDescription>
        </StatCard>
        
        <StatCard>
          <StatIcon>📝</StatIcon>
          <StatValue>{stats?.totalPosts || 0}</StatValue>
          <StatLabel>總貼文數</StatLabel>
          <StatDescription>系統中的貼文總數</StatDescription>
        </StatCard>
        
        <StatCard>
          <StatIcon>⏱️</StatIcon>
          <StatValue>{stats?.serverUptime ? formatUptime(stats.serverUptime) : 'N/A'}</StatValue>
          <StatLabel>服務運行時間</StatLabel>
          <StatDescription>伺服器持續運行時間</StatDescription>
        </StatCard>
      </StatsGrid>

      <SystemInfoCard>
        <SystemInfoTitle>系統資訊</SystemInfoTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Node.js 版本</InfoLabel>
            <InfoValue>{stats?.nodeVersion || 'N/A'}</InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>記憶體使用量 (RSS)</InfoLabel>
            <InfoValue>
              {stats?.memoryUsage?.rss ? formatMemory(stats.memoryUsage.rss) : 'N/A'}
            </InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>堆記憶體使用量</InfoLabel>
            <InfoValue>
              {stats?.memoryUsage?.heapUsed ? formatMemory(stats.memoryUsage.heapUsed) : 'N/A'}
            </InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>堆記憶體總量</InfoLabel>
            <InfoValue>
              {stats?.memoryUsage?.heapTotal ? formatMemory(stats.memoryUsage.heapTotal) : 'N/A'}
            </InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>外部記憶體</InfoLabel>
            <InfoValue>
              {stats?.memoryUsage?.external ? formatMemory(stats.memoryUsage.external) : 'N/A'}
            </InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>陣列緩衝區</InfoLabel>
            <InfoValue>
              {stats?.memoryUsage?.arrayBuffers ? formatMemory(stats.memoryUsage.arrayBuffers) : 'N/A'}
            </InfoValue>
          </InfoItem>
        </InfoGrid>
      </SystemInfoCard>

      <RefreshButton onClick={fetchStats} disabled={loading}>
        {loading ? '載入中...' : '🔄 重新整理'}
      </RefreshButton>
    </StatsContainer>
  );
}

export default Stats;