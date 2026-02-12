import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Star, Truck, Package, Bus, Info } from 'lucide-react';
import { useData } from '../context/DataContext';
import { JobProfile } from '../types/types';

export const JobSheets: React.FC = () => {
  const { data } = useData();
  const [selectedJob, setSelectedJob] = useState<JobProfile | null>(null);

  // Find a news item to tease
  const newsTeaser = useMemo(() => {
    if (!data) return undefined;
    // Prefer standard news over promotions for this section
    return data.newsItems.find(n => n.type === 'NEWS') || data.newsItems[0];
  }, [data]);

  const getIcon = (category: string) => {
    switch(category) {
      case 'Transport': return <Truck size={32} />;
      case 'Logistique': return <Package size={32} />;
      case 'Voyageurs': return <Bus size={32} />;
      default: return <Truck size={32} />;
    }
  };

  const getColor = (category: string) => {
    switch(category) {
      case 'Transport': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Logistique': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Voyageurs': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (selectedJob) {
    return (
      <div className="h-full flex flex-col animate-fadeIn">
        <button 
          onClick={() => setSelectedJob(null)}
          className="flex items-center gap-2 text-gray-600 mb-6 font-bold hover:text-aftral-red transition-colors self-start"
        >
          <ArrowLeft size={24} />
          Retour à la liste
        </button>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex-1 flex flex-col">
           <div className="p-8 border-b border-gray-100 bg-gray-50">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4 ${getColor(selectedJob.category)}`}>
                  {getIcon(selectedJob.category)}
                  {selectedJob.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedJob.title}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{selectedJob.description}</p>
           </div>

           <div className="p-8 overflow-y-auto">
              <div className="grid grid-cols-1 gap-8">
                
                {/* Missions */}
                <section>
                    <h3 className="text-xl font-bold text-aftral-dark mb-4 flex items-center gap-3">
                        <div className="bg-aftral-red/10 p-2 rounded-lg text-aftral-red">
                            <CheckCircle size={24} />
                        </div>
                        Missions principales
                    </h3>
                    <ul className="grid grid-cols-1 gap-3">
                        {selectedJob.missions.map((mission, idx) => (
                            <li key={idx} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                                <span className="w-2 h-2 rounded-full bg-aftral-red mt-2 shrink-0"></span>
                                <span className="text-gray-700 font-medium">{mission}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Skills */}
                <section>
                    <h3 className="text-xl font-bold text-aftral-dark mb-4 flex items-center gap-3">
                        <div className="bg-aftral-red/10 p-2 rounded-lg text-aftral-red">
                            <Star size={24} />
                        </div>
                        Compétences clés
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {selectedJob.skills.map((skill, idx) => (
                            <span key={idx} className="bg-white border-2 border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Training */}
                <section>
                    <h3 className="text-xl font-bold text-aftral-dark mb-4 flex items-center gap-3">
                        <div className="bg-aftral-red/10 p-2 rounded-lg text-aftral-red">
                            <BookOpen size={24} />
                        </div>
                        Formations AFTRAL
                    </h3>
                    <div className="space-y-3">
                        {selectedJob.trainingPaths.map((path, idx) => (
                             <div key={idx} className="flex items-center gap-3 text-gray-700 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                <div className="bg-white p-1 rounded-full">
                                    <ArrowRight size={16} className="text-blue-600" />
                                </div>
                                <span className="font-semibold">{path}</span>
                             </div>
                        ))}
                    </div>
                </section>

              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fiches Métiers</h1>
        <p className="text-gray-500 text-lg">Découvrez les opportunités du secteur Transport & Logistique.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 overflow-y-auto pb-20">
        {data?.jobProfiles.map(job => (
            <button 
                key={job.id} 
                onClick={() => setSelectedJob(job)}
                className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-aftral-red transition-all flex items-center justify-between text-left"
            >
                <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${getColor(job.category)}`}>
                        {getIcon(job.category)}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-aftral-red transition-colors">{job.title}</h3>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mt-1">{job.category}</p>
                    </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-full group-hover:bg-aftral-red group-hover:text-white transition-colors">
                    <ArrowRight size={24} />
                </div>
            </button>
        ))}
        
        {/* Dynamic News Teaser instead of generic banner */}
        {newsTeaser ? (
             <div className="bg-gray-800 text-white rounded-2xl p-6 mt-4 flex items-center justify-between shadow-lg">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                         <Info size={16} className="text-blue-400"/>
                         <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">Actualité</span>
                    </div>
                    <h3 className="font-bold text-xl mb-1">{newsTeaser.title}</h3>
                    <p className="opacity-80 text-sm line-clamp-1">{newsTeaser.summary}</p>
                </div>
                <button className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors shrink-0 ml-4">
                    <ArrowRight size={24} />
                </button>
            </div>
        ) : (
            <div className="bg-gray-800 text-white rounded-2xl p-6 mt-4 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-xl">Vous ne trouvez pas votre métier ?</h3>
                    <p className="opacity-80">Nos conseillers sont là pour vous guider.</p>
                </div>
                <div className="bg-white/10 p-3 rounded-full">
                    <BookOpen size={24} />
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
