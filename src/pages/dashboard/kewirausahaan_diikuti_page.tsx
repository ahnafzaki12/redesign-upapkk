import { useState, useMemo } from 'react';
import { Search, Eye, Trash2, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchableDropdown from '../../components/SearchableDropdown';
import { kewirausahaanData } from '../../data/kewirausahaanData';

interface KewirausahaanDiikutiItem {
  id: number;
  eventName: string;
  kewirausahaanName: string;
  pembimbing: string;
  lokasi: string;
  dateStart: string;
  dateEnd: string;
  slug?: string;
}

export default function KewirausahaanDiikutiPage() {
  // Helpers for formatting
  const parseIndonesianDate = (dateStr: string, defaultYear: string) => {
    const months: Record<string, string> = {
      jan: '01', januari: '01', feb: '02', februari: '02', mar: '03', maret: '03', 
      apr: '04', april: '04', mei: '05', jun: '06', juni: '06', jul: '07', juli: '07', 
      ags: '08', agustus: '08', sep: '09', september: '09', okt: '10', oktober: '10', 
      nov: '11', november: '11', des: '12', desember: '12'
    };
    const parts = dateStr.trim().toLowerCase().split(' ');
    if (parts.length === 1) return `${defaultYear}-01-${parts[0].padStart(2, '0')}`;
    const d = parts[0].padStart(2, '0');
    const m = months[parts[1]] || '01';
    const y = parts[2] || defaultYear;
    return `${y}-${m}-${d}`;
  };

  const formatScheduleToDates = (schedule: string) => {
    if (!schedule) return { start: 'N/A', end: 'N/A' };
    const parts = schedule.split('-');
    if (parts.length !== 2) return { start: schedule, end: schedule };
    
    let startStr = parts[0].trim();
    let endStr = parts[1].trim();
    
    const endTokens = endStr.split(' ');
    const defaultYear = endTokens.length === 3 ? endTokens[2] : '2026';
    const defaultMonth = endTokens.length >= 2 ? endTokens[1] : 'Januari';
    
    if (startStr.split(' ').length === 1) startStr = `${startStr} ${defaultMonth} ${defaultYear}`;
    else if (startStr.split(' ').length === 2) startStr = `${startStr} ${defaultYear}`;
    if (endStr.split(' ').length === 2) endStr = `${endStr} ${defaultYear}`;
    
    return {
      start: parseIndonesianDate(startStr, defaultYear),
      end: parseIndonesianDate(endStr, defaultYear)
    };
  };

  // Map real data to table format
  const generateTableData = (): KewirausahaanDiikutiItem[] => {
    try {
      if (!kewirausahaanData || kewirausahaanData.length === 0) {
        console.warn('kewirausahaanData is empty');
        return [];
      }
      
      const dummyPembimbing = [
        "Dr. Budi Santoso, S.T., M.Kom.", 
        "Prof. Dr. Ir. Siti Aminah, M.T.", 
        "Ir. Joko Widodo, M.B.A."
      ];

      const dummyPenyelenggara = [
        "UPA - Pengembangan Karir dan Kewirausahaan UPNVJT",
        "Kementerian Koperasi dan UKM",
        "BEM Universitas Negeri",
        "HIMA Manajemen BizTech",
        "Pusat Inovasi Mahasiswa"
      ];

      return kewirausahaanData.map((item, index) => {
        const dates = formatScheduleToDates(item.schedule);
        // Menentukan nama kewirausahaan (karena data asli belum memiliki field 'organizer')
        let kewirausahaanName = dummyPenyelenggara[index % dummyPenyelenggara.length];
        if (item.title.includes('PMW')) {
          kewirausahaanName = "UPA - Pengembangan Karir dan Kewirausahaan UPNVJT";
        } else if (item.title.includes('National')) {
          kewirausahaanName = "Kementerian Riset dan Teknologi";
        }

        return {
          id: item.id,
          eventName: item.title || 'Unknown',
          kewirausahaanName: kewirausahaanName,
          pembimbing: dummyPembimbing[index % dummyPembimbing.length],
          lokasi: item.method?.toLowerCase().includes('online') ? 'Online' : `Offline, ${item.level === 'Kampus/instansi' ? 'Gedung Kuliah Bersama UPNVJT' : 'Graha Inovasi Center'}`,
          dateStart: dates.start,
          dateEnd: dates.end,
          slug: item.slug
        };
      });
    } catch (error) {
      console.error('Error generating table data:', error);
      return [];
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTime, setSearchTime] = useState(0.42);
  const [tableData] = useState(() => generateTableData());

  // Filter & Pagination Logic
  const filteredData = useMemo(() => {
    try {
      const start = performance.now();
      const result = tableData.filter(item =>
        item.kewirausahaanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.pembimbing.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.eventName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const end = performance.now();
      setSearchTime(Number(((end - start) / 1000 + 0.12).toFixed(4)));
      setCurrentPage(1);
      return result;
    } catch (error) {
      console.error('Error filtering data:', error);
      return tableData;
    }
  }, [searchTerm, tableData]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, filteredData.length);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 w-full max-w-360 mx-auto animate-fade-in fade-in-up transition-all duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-5 mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kewirausahaan Diikuti</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Kelola dan pantau program kewirausahaan yang Anda ikuti.</p>
        </div>
      </div>

      {/* Control Tools Section */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 relative z-10">
        
        {/* Entries Control */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Show</span>
          <SearchableDropdown
            value={String(entriesPerPage)}
            onChange={(val) => setEntriesPerPage(Number(val))}
            options={['5', '10', '25', '50']}
            placeholder={String(entriesPerPage)}
            showSearch={false}
            containerClass="w-20"
          />
          <span className="text-sm font-medium text-gray-600">entries</span>
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-72 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari aktivitas..."
            className="w-full bg-white border border-slate-200/60 text-gray-900 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 block pl-10 p-2.5 transition-all shadow-sm hover:border-slate-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm relative z-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600 border-collapse">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold w-16 text-center">No</th>
                <th scope="col" className="px-6 py-4 font-semibold whitespace-nowrap">Event Name</th>
                <th scope="col" className="px-6 py-4 font-semibold whitespace-nowrap">Nama Kewirausahaan</th>
                <th scope="col" className="px-6 py-4 font-semibold whitespace-nowrap">Pembimbing</th>
                <th scope="col" className="px-6 py-4 font-semibold whitespace-nowrap">Lokasi</th>
                <th scope="col" className="px-6 py-4 font-semibold whitespace-nowrap w-32 border-x border-gray-100 text-center">Date Range</th>
                <th scope="col" className="px-6 py-4 font-semibold text-center w-28">Option</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr key={item.id} className="bg-white hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4 font-medium text-gray-900 text-center">
                      {(currentPage - 1) * entriesPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <span>{item.eventName}</span>
                        {item.slug && (
                          <Link to={`/kewirausahaan/${item.slug}`} className="text-teal-600 hover:text-teal-700 transition-colors" title="Lihat Detail Program">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-teal-600">
                      {item.kewirausahaanName}
                    </td>
                    <td className="px-6 py-4">
                      {item.pembimbing}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {item.lokasi}
                    </td>
                    <td className="p-0 border-x border-gray-100">
                        <div className="flex flex-col h-full divide-y divide-gray-100">
                          <span className="block px-4 py-2 text-center text-xs font-semibold text-gray-700 border-b border-gray-100">{item.dateStart}</span>
                          <span className="block px-4 py-2 text-center text-xs font-medium text-gray-500">{item.dateEnd}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button title="Detail" className="p-1.5 rounded-md text-teal-600 flex items-center justify-center hover:bg-teal-50 transition-colors border border-transparent hover:border-teal-100">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button title="Delete" className="p-1.5 rounded-md text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors border border-transparent hover:border-red-100">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500 bg-gray-50/30">
                    <div className="flex flex-col items-center justify-center">
                        <Search className="w-8 h-8 text-gray-300 mb-3" />
                        <p className="text-base font-medium">Tidak ada data ditemukan</p>
                        <p className="text-sm mt-1">Coba sesuaikan kata kunci pencarian Anda.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer / Pagination Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between pt-6 gap-4 border-t border-gray-100 mt-6 pb-2">
        <div className="text-sm font-medium text-gray-500 w-full text-center lg:text-left flex flex-col md:flex-row gap-2 md:items-center">
          <span>Showing <strong className="text-gray-900">{filteredData.length > 0 ? startEntry : 0}</strong> to <strong className="text-gray-900">{endEntry}</strong> of <strong className="text-gray-900">{filteredData.length}</strong> entries.</span>
          <span className="hidden md:inline text-gray-300">|</span>
          <span className="text-gray-400 italic">Search took {searchTime} seconds.</span>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-1.5 p-1 bg-white border border-gray-200 rounded-lg shadow-sm">
            <button
              title="Prev"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center px-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-md transition-colors ${
                    currentPage === page
                      ? 'bg-teal-500 text-white shadow-sm ring-1 ring-teal-600/50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
               title="Next"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}