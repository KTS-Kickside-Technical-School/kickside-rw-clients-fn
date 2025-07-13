import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BsEye } from 'react-icons/bs';
import { BiComment, BiEdit } from 'react-icons/bi';

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
import { journalistFindAnalysis } from '../../../utils/requests/articlesRequest';
import { MonthlyAnalytics } from '../../../utils/types/Article';
import SEO from '../../../utils/SEO';
import DigitalClock from '../../../Components/DigitalClock';
import { getGreeting } from '../../../utils/helpers/articleHelpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [journalistAnalysis, setJournalistAnalysis] = useState<any>(null);
  
  const profileParsed = sessionStorage.getItem('profile');
  const profile = profileParsed ? JSON.parse(profileParsed) : {};

  const getJournalistAnalysis = async (year: any) => {
    try {
      const response = await journalistFindAnalysis(year);
      if (response.status === 200) {
        setJournalistAnalysis(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error getting journalist analysis', error);
      toast.error('Unknown error occurred fetching the journalist analysis.');
    }
  };

  useEffect(() => {
    getJournalistAnalysis(year);
  }, [year]);

  if (!journalistAnalysis || !journalistAnalysis.monthlyAnalytics) {
    return (
      <div className="flex flex-col items-center p-5">
        <div className="w-48 h-5 bg-gray-300 rounded animate-pulse mb-4"></div>

        <div className="w-full max-w-3xl h-48 bg-gray-300 rounded animate-pulse mb-6"></div>

        <div className="flex space-x-4">
          <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  const data: any = {
    labels: journalistAnalysis.monthlyAnalytics.map(
      (item: MonthlyAnalytics) => item.month
    ),
    datasets: [
      {
        label: 'Total Views',
        data: journalistAnalysis.monthlyAnalytics.map(
          (item: MonthlyAnalytics) => item.views
        ),
        backgroundColor: '#4C94E7',
        borderColor: '#ACACAC',
        borderWidth: 1,
        type: 'bar',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Views and Comments Trends',
      },
    },
  };

  const handleExport = (format: any) => {
    const chartElement = document.getElementById('myChart');

    if (!chartElement) {
      console.error('Chart element not found');
      return;
    }

    if (!journalistAnalysis || !journalistAnalysis.monthlyAnalytics) {
      console.error('No data available for export');
      return;
    }

    const dynamicData = journalistAnalysis.monthlyAnalytics.map(
      (item: any) => ({
        month: item.month,
        views: item.views,
        comments: item.comments,
      })
    );

    switch (format) {
      case 'png':
        html2canvas(chartElement).then((canvas) => {
          const img = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = img;
          a.download = 'chart.png';
          a.click();
        });
        break;

      case 'pdf':
        html2canvas(chartElement).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const doc = new jsPDF();
          doc.addImage(imgData, 'PNG', 10, 10, 180, 160);
          doc.text('Monthly Analytics Report', 10, 10);
          dynamicData.forEach((data: any, index: any) => {
            doc.text(
              `${index + 1}. ${data.month} - Views: ${data.views}, Comments: ${
                data.comments
              }`,
              10,
              180 + index * 10
            );
          });
          doc.save('chart.pdf');
        });
        break;

      case 'excel':
      case 'csv':
        const ws = XLSX.utils.json_to_sheet(dynamicData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data');
        if (format === 'excel') {
          XLSX.writeFile(wb, 'chart_data.xlsx');
        } else {
          const csv = XLSX.utils.sheet_to_csv(ws);
          const blob = new Blob([csv], { type: 'text/csv' });
          saveAs(blob, 'chart_data.csv');
        }
        break;
      default:
        console.error('Invalid format');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <SEO
        mainData={{
          title: 'Journalist Dashboard – Analytics & Performance',
          description:
            'View journalist performance metrics, article stats, and engagement analytics from the Kickside newsroom dashboard.',
          author: 'Kickside Rwanda',
          type: 'website',
          publishedAt: new Date().toISOString(),
        }}
        canonicalUrl="https://www.kickside.rw/staff/dashboard"
      />

      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 text-center sm:text-left">
            Dashboard
          </h1>

          <div className="flex items-center justify-center sm:justify-end space-x-4 w-full sm:w-auto">
            <DigitalClock />
          </div>
        </div>
        <div className="text-center sm:text-left mt-2 sm:mt-0">
          <span className="text-gray-600 text-sm sm:text-base">
            {getGreeting(profile.firstName)}
          </span>
        </div>
      </header>

      <main className="container mx-auto mt-6 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded shadow-md flex items-center">
            <div className="text-blue-500 text-3xl mr-4">
              <BsEye />
            </div>
            <div>
              <p className="text-gray-600">Total Views</p>
              <p className="text-xl font-bold">
                {journalistAnalysis?.totalViews}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded shadow-md flex items-center">
            <div className="text-green-500 text-3xl mr-4">
              <BiComment />
            </div>
            <div>
              <p className="text-gray-600">Total Comments</p>
              <p className="text-xl font-bold text-primary">
                {journalistAnalysis.totalComments}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded shadow-md flex items-center">
            <div className="text-yellow-500 text-3xl mr-4">
              <BiEdit className="text-primary" />
            </div>
            <div>
              <p className="text-gray-600">Total Articles</p>
              <p className="text-xl font-bold">
                {journalistAnalysis?.totalArticles}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white mt-8 p-6 rounded shadow-md relative">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">
                Views and Comments Trends for {year}
              </h1>
            </div>

            <div className="flex space-x-4">
              <div className="flex flex-col">
                <select
                  className="p-2 border rounded mb-4 bg-white"
                  defaultValue="Select Format"
                  onChange={(e) => handleExport(e.target.value)}
                >
                  <option value="Select Format" disabled>
                    Select Export Format
                  </option>
                  <option value="png">PNG</option>
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>

              <div className="flex flex-col">
                <select
                  className="p-2 border rounded"
                  value={year}
                  onChange={(e) => {
                    setYear(Number(e.target.value));
                  }}
                >
                  {Array.from(
                    { length: new Date().getFullYear() - 2023 + 1 },
                    (_, i) => new Date().getFullYear() - i
                  ).map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div id="myChart" className="w-full h-[400px]">
            {journalistAnalysis && <Bar data={data} options={options} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
