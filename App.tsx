
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getMotivationalQuotes } from './services/geminiService';
import { LoadingSpinner } from './components/LoadingSpinner';
import { QuoteCard } from './components/QuoteCard';
import { PurpleHeartIcon, SparkleIcon } from './components/Icons';

const App: React.FC = () => {
  const [quotes, setQuotes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const birthdayPersonName = "Farhani Ersa";

  const fetchQuotes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedQuotes = await getMotivationalQuotes(birthdayPersonName);
      setQuotes(fetchedQuotes);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("API_KEY")) {
             setError("Kunci API belum dikonfigurasi. Silakan atur variabel lingkungan API_KEY.");
        } else {
             setError(`Gagal memuat kata-kata motivasi: ${err.message}`);
        }
      } else {
        setError("Terjadi kesalahan yang tidak diketahui saat memuat kata-kata motivasi.");
      }
      setQuotes([]); // Clear quotes on error
    } finally {
      setIsLoading(false);
    }
  }, [birthdayPersonName]);

  useEffect(() => {
    fetchQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchQuotes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white flex flex-col items-center justify-center p-4 selection:bg-purple-400 selection:text-purple-900 overflow-y-auto">
      <main className="bg-white/10 backdrop-blur-md shadow-2xl rounded-xl p-6 md:p-10 max-w-2xl w-full text-center transform transition-all duration-500 ease-in-out animate-fade-in-up my-10">
        
        <div className="relative mb-6">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-3 relative z-10"
            style={{ fontFamily: "'Dancing Script', cursive", color: '#f3e8ff' }}
          >
            Selamat Ulang Tahun
          </h1>
          <h2 
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-4 relative z-10"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {birthdayPersonName}!
          </h2>
          <p className="text-purple-300 text-lg mb-2 flex items-center justify-center space-x-2">
            <PurpleHeartIcon className="w-7 h-7 text-pink-400" />
            <span>Semoga harimu penuh cinta dan kebahagiaan!</span>
            <PurpleHeartIcon className="w-7 h-7 text-pink-400" />
          </p>
          <p className="text-sm text-purple-400 font-semibold tracking-wider">
            💜 BORAHAE {birthdayPersonName.toUpperCase()}! 💜
          </p>
        </div>

        <div className="my-8 border-t-2 border-purple-500/50 w-3/4 mx-auto"></div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-purple-200 mb-6 flex items-center justify-center">
            <SparkleIcon className="w-6 h-6 mr-2 text-yellow-300" />
            Untaian Doa Untukmu
            <SparkleIcon className="w-6 h-6 ml-2 text-yellow-300" />
          </h3>
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-red-300 bg-red-800/50 p-3 rounded-md">{error}</p>}
          {!isLoading && !error && quotes.length > 0 && (
            <div className="space-y-4">
              {quotes.map((quote, index) => (
                <QuoteCard key={index} quote={quote} />
              ))}
            </div>
          )}
          {!isLoading && !error && quotes.length === 0 && (
            <p className="text-purple-300">Tidak ada kata-kata motivasi saat ini.</p>
          )}
        </div>

        <div className="my-8 border-t-2 border-purple-500/50 w-3/4 mx-auto"></div>
        
        <footer className="mt-10 pt-6 border-t-2 border-purple-500/50">
          <p className="text-sm text-purple-400">
            Dibuat dengan <PurpleHeartIcon className="w-4 h-4 inline-block align-middle" /> oleh AI untuk {birthdayPersonName}.
          </p>
          <p className="text-xs text-purple-500 mt-1">
            Tema Ungu & Inspirasi BTS Army
          </p>
        </footer>
      </main>
      
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-purple-400/30 rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 80 + 20}px`,
              height: `${Math.random() * 80 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>
       <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
