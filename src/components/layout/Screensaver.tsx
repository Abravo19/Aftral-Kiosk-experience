import React, { useEffect, useState, useMemo } from 'react';
import { MousePointerClick, Megaphone, MapPin, GraduationCap, Truck } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface ScreensaverProps {
  onWake: () => void;
}

interface SlideData {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  img: string;
  Icon?: React.ElementType; // Use React.ElementType instead of importing LucideIcon type
}

export const Screensaver: React.FC<ScreensaverProps> = ({ onWake }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { data } = useData();

  // Memoize slides to prevent recreation on every render
  const slides: SlideData[] = useMemo(() => {
    const staticSlides: SlideData[] = [
      { 
          id: 'brand',
          type: 'BRAND',
          title: "50 ans d'excellence", 
          subtitle: "Leader de la formation Transport & Logistique", 
          img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
      },
      { 
          id: 'offer',
          type: 'OFFER',
          title: "Du CAP au Bac+5", 
          subtitle: "Formez-vous à chaque étape de votre carrière", 
          img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
          Icon: GraduationCap
      },
      { 
          id: 'jobs',
          type: 'JOBS',
          title: "Des métiers qui recrutent", 
          subtitle: "100% de nos apprenants trouvent un emploi", 
          img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
          Icon: Truck
      },
      { 
          id: 'local',
          type: 'LOCAL',
          title: "Bienvenue à AFTRAL", 
          subtitle: "Votre centre de formation expert à proximité", 
          img: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
          Icon: MapPin
      }
    ];

    const promoSlides: SlideData[] = data?.newsItems
        ? data.newsItems
            .filter(n => n.priority === 1)
            .map(n => ({
                id: n.id,
                type: n.type,
                title: n.title,
                subtitle: n.summary,
                img: n.image || "https://picsum.photos/seed/generic/1080/1920",
                Icon: n.type === 'PROMOTION' ? Megaphone : undefined
            }))
        : [];

    return [
        staticSlides[0], 
        ...promoSlides,
        staticSlides[1], 
        staticSlides[2], 
        staticSlides[3]  
    ];
  }, [data]);

  useEffect(() => {
    if (slides.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 10000); 
    
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black text-white cursor-pointer overflow-hidden" onClick={onWake}>
        {slides.map((slide, index) => {
            const isActive = index === activeSlide;
            return (
                <div 
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    {/* Background Image with Ken Burns Effect */}
                    <div className="absolute inset-0 overflow-hidden">
                        <img 
                            src={slide.img} 
                            alt=""
                            className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${isActive ? 'scale-110' : 'scale-100'}`} 
                        />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90"></div>

                    {/* Content Zone */}
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-32 px-12 text-center">
                        
                        <div className={`transition-all duration-1000 delay-300 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            {slide.type === 'PROMOTION' && (
                                <div className="bg-aftral-red text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest mb-8 inline-flex items-center gap-3 shadow-lg border border-red-400">
                                    <Megaphone size={24} /> Offre Spéciale
                                </div>
                            )}
                            {slide.Icon && slide.type !== 'PROMOTION' && (
                                <div className="bg-white/10 p-4 rounded-full inline-block mb-6 backdrop-blur-md">
                                    <slide.Icon size={48} className="text-white" />
                                </div>
                            )}
                        </div>
                        
                        <h1 className={`text-6xl font-bold mb-6 drop-shadow-xl leading-tight transition-all duration-1000 delay-500 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            {slide.title}
                        </h1>
                        <p className={`text-3xl text-gray-200 font-medium max-w-4xl transition-all duration-1000 delay-700 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            {slide.subtitle}
                        </p>
                    </div>
                </div>
            );
        })}

        {/* Persistent CTA */}
        <div className="absolute bottom-12 left-0 right-0 z-50 flex justify-center">
             <div className="animate-bounce flex items-center gap-4 bg-white text-aftral-dark px-10 py-5 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] border-4 border-white/50 backdrop-blur-sm">
                <div className="bg-aftral-red p-2 rounded-full text-white">
                    <MousePointerClick size={32} />
                </div>
                <span className="text-2xl font-bold uppercase tracking-wider">Toucher l'écran pour commencer</span>
            </div>
        </div>
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gray-800 z-50">
             {/* Use key to force unmount/remount for animation reset */}
            <div 
                key={activeSlide}
                className="h-full bg-aftral-red animate-[progress_10s_linear_forward]"
                style={{ width: '100%' }} // Let animation handle the width
            ></div>
            <style>{`
                @keyframes progress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
            `}</style>
        </div>
    </div>
  );
};