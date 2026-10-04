import React, { useRef, useState, useEffect } from 'react';
import { BRAND } from '../brand.config';

export const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(45);
  const [isMuted, setIsMuted] = useState(false);
  const [videoMissing, setVideoMissing] = useState(false);
  const [placeholderDismissed, setPlaceholderDismissed] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoMissing) {
      setPlaceholderDismissed(false);
      return;
    }
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'NotSupportedError') {
          setIsPlaying(false);
          setVideoMissing(true);
          setPlaceholderDismissed(false);
          return;
        }
        console.error('No se pudo reproducir el video de cómo comprar.', error);
      });
    }
  };

  const handleVideoError = () => {
    setIsPlaying(false);
    setVideoMissing(true);
    setPlaceholderDismissed(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="w-full bg-brand-surface-hover py-14 sm:py-20 border-y border-brand-border" id="como-comprar">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col gap-1 max-w-2xl mb-10">
          <span className="font-body text-xs uppercase tracking-widest text-brand-secondary font-bold">
            {BRAND.howToBuy.tagline}
          </span>
          <h2 className="font-headline text-3xl sm:text-5xl uppercase text-brand-primary-deep tracking-tight leading-tight">
            {BRAND.howToBuy.title}
          </h2>
          <p className="font-body text-sm sm:text-base text-brand-text-secondary">
            {BRAND.howToBuy.description}
          </p>
        </div>

        {/* 2-Column Split: Custom HTML5 Video Player + 3 Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Custom Native HTML5 Video Player */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative bg-brand-primary shadow-xl overflow-hidden group aspect-video flex items-center justify-center border border-brand-primary">
              {/* Native HTML5 Video Tag */}
              <video
                ref={videoRef}
                src={BRAND.howToBuy.videoUrl}
                poster={BRAND.howToBuy.posterUrl}
                playsInline
                preload="none"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                onError={handleVideoError}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Badges on Top */}
              <div className="absolute top-4 left-4 bg-brand-primary text-white px-3 py-1 font-body text-[11px] uppercase tracking-wider font-bold flex items-center gap-1.5 shadow-sm pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-brand-danger animate-pulse"></span>
                <span>{BRAND.howToBuy.badge}</span>
              </div>

              <div className="absolute top-4 right-4 bg-brand-primary-deep/80 backdrop-blur-sm text-white px-2.5 py-1 font-body text-[11px] font-bold pointer-events-none">
                {BRAND.howToBuy.duration}
              </div>

              {/* Giant Industrial Play Trigger Button (Visible when paused) */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Reproducir video de guía de compra"
                  className="absolute z-20 w-20 h-20 bg-brand-secondary hover:bg-brand-secondary-dark text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  <span className="material-symbols-outlined text-5xl ml-1">play_arrow</span>
                </button>
              )}

              {videoMissing && !placeholderDismissed && (
                <div
                  role="status"
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-brand-primary-deep/90 px-6 text-center text-white"
                >
                  <p className="max-w-md font-body text-sm sm:text-base leading-relaxed">
                    {BRAND.howToBuy.placeholderMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setPlaceholderDismissed(true)}
                    className="bg-brand-secondary px-5 py-2.5 font-body text-xs uppercase tracking-wider font-bold text-white hover:bg-brand-secondary-dark transition-colors"
                  >
                    Entendido
                  </button>
                </div>
              )}

              {/* Video Player Scrub Bar UI */}
              <div className="absolute bottom-0 inset-x-0 bg-brand-primary-deep/90 backdrop-blur-xs p-3 flex flex-col gap-2 z-20">
                {/* Scrub line */}
                <div
                  onClick={handleSeek}
                  className="w-full bg-brand-text-muted/30 h-1.5 relative cursor-pointer group/scrub"
                >
                  <div
                    className="bg-brand-secondary h-full relative"
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                  >
                    <span className="absolute right-0 -top-1 w-3 h-3 bg-white rounded-full shadow-sm opacity-0 group-hover/scrub:opacity-100 transition-opacity"></span>
                  </div>
                </div>

                {/* Controls Bar */}
                <div className="flex items-center justify-between text-white font-body text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="hover:text-brand-accent-light transition-colors cursor-pointer"
                      aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {isPlaying ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="hover:text-brand-accent-light transition-colors cursor-pointer"
                      aria-label="Silenciar"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {isMuted ? 'volume_off' : 'volume_up'}
                      </span>
                    </button>
                    <span className="font-mono text-[11px]">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-brand-accent-light">
                    <span className="font-bold text-[11px] uppercase tracking-wider hidden sm:inline">
                      PASO 1 • SELECCIÓN DE CURVAS
                    </span>
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="hover:text-white transition-colors cursor-pointer"
                      aria-label="Pantalla completa"
                    >
                      <span className="material-symbols-outlined text-lg">fullscreen</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <span className="font-body text-xs uppercase tracking-wider text-brand-text-secondary pt-2">
              {BRAND.howToBuy.caption}
            </span>
          </div>

          {/* 3 Steps Breakdown Tiles */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {BRAND.howToBuy.steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-5 shadow-sm border border-brand-border flex items-start gap-4 hover:border-brand-primary transition-colors"
              >
                <div
                  className={`w-12 h-12 flex-shrink-0 flex items-center justify-center font-headline text-2xl font-bold shadow-sm ${
                    idx === 2
                      ? 'bg-brand-secondary text-white'
                      : 'bg-brand-primary text-white'
                  }`}
                >
                  {step.number}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-body text-[11px] uppercase tracking-wider text-brand-secondary font-bold">
                    {step.badge}
                  </span>
                  <h3 className="font-headline text-xl uppercase text-brand-primary-deep">
                    {step.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-brand-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
