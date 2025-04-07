import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { dashboardService } from '../services/dashboardService';
import { Dashboard as DashboardType } from '../dtos/typeDashboard';
import { Alert } from 'antd';

// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await dashboardService.getDashboard();
        if (response.status === '200') {
          setDashboardData(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu dashboard:', err);
        setError('Không thể tải dữ liệu dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const chartData = {
    labels: dashboardData?.chart.labels || [],
    datasets: [
      {
        label: 'Tiền nạp',
        data: dashboardData?.chart.values || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Thống kê tiền nạp theo tháng',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Số tiền',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Tháng/Năm',
        },
      },
    },
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        Dashboard
      </h1>

      {loading && (
        <div style={{ textAlign: 'center', fontSize: '16px' }}>
          Đang tải dữ liệu...
        </div>
      )}
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: '20px' }}
        />
      )}

      {!loading && !error && dashboardData && (
        <>
          {/* Các card số liệu */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                background: '#ffffff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                transition: 'transform 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.05)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            >
              <h3 style={{ margin: '0 0 10px', color: '#555' }}>
                Tổng người nghe
              </h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                {dashboardData.totalListeners}
              </p>
            </div>

            <div
              style={{
                background: '#ffffff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                transition: 'transform 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.05)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            >
              <h3 style={{ margin: '0 0 10px', color: '#555' }}>
                Tổng người dùng
              </h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                {dashboardData.totalUsers}
              </p>
            </div>

            <div
              style={{
                background: '#ffffff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                transition: 'transform 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.05)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            >
              <h3 style={{ margin: '0 0 10px', color: '#555' }}>
                Tổng blog
              </h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' }}>
                {dashboardData.totalBlogs}
              </p>
            </div>

            <div
              style={{
                background: '#ffffff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                transition: 'transform 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.05)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            >
              <h3 style={{ margin: '0 0 10px', color: '#555' }}>
                Tổng số tiền nạp
              </h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f5222d' }}>
                {dashboardData.totalTransaction.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </p>
            </div>
          </div>

          {/* Biểu đồ */}
          <div
            style={{
              background: '#ffffff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Bar data={chartData} options={chartOptions} />
          </div>
        </>
      )}

      {!loading && !error && !dashboardData && (
        <div style={{ textAlign: 'center', fontSize: '16px' }}>
          Không có dữ liệu để hiển thị.
        </div>
      )}
    </div>
  );
};