'use client';

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap/gsap.config';
import './RotatingText.css';

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export interface RotatingTextProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'transition' | 'initial' | 'animate' | 'exit'> {
  texts: string[];
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>((props, ref) => {
  const {
    texts,
    rotationInterval = 4000,
    staggerDuration = 0.04,
    staggerFrom = 'last',
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  
  const handleIndexChange = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex);
  }, []);

  useImperativeHandle(ref, () => ({
    next: () => handleIndexChange((currentIndex + 1) % texts.length),
    previous: () => handleIndexChange((currentIndex - 1 + texts.length) % texts.length),
    jumpTo: handleIndexChange,
    reset: () => handleIndexChange(0)
  }));

  useEffect(() => {
    if (texts.length <= 1) return;
    const intervalId = setInterval(() => {
      if (!containerRef.current) return;
      const chars = containerRef.current.querySelectorAll('.rt-char');
      
      timelineRef.current = gsap.timeline({
        onComplete: () => {
          handleIndexChange((currentIndex + 1) % texts.length);
        }
      });

      if (chars.length > 0) {
        timelineRef.current.to(chars, {
          y: '-120%',
          opacity: 0,
          duration: 0.4,
          stagger: { amount: staggerDuration * chars.length, from: (staggerFrom === 'first' ? 'start' : staggerFrom === 'last' ? 'end' : staggerFrom) as "start" | "center" | "edges" | "random" | "end" | number },
          ease: 'power2.in'
        });
      } else {
        handleIndexChange((currentIndex + 1) % texts.length);
      }
    }, rotationInterval);

    return () => clearInterval(intervalId);
  }, [texts.length, rotationInterval, staggerDuration, staggerFrom, currentIndex, handleIndexChange]);

  useEffect(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll('.rt-char');
    if (chars.length === 0) return;
    
    gsap.fromTo(chars, 
      { y: '100%', opacity: 0 }, 
      { 
        y: '0%', 
        opacity: 1, 
        duration: 0.6, 
        stagger: { amount: staggerDuration * chars.length, from: (staggerFrom === 'first' ? 'start' : staggerFrom === 'last' ? 'end' : staggerFrom) as "start" | "center" | "edges" | "random" | "end" | number }, 
        ease: 'back.out(1.5)' 
      }
    );
  }, [currentIndex, staggerDuration, staggerFrom]);

  return (
    <span ref={containerRef} className={cn('inline-flex relative overflow-hidden', mainClassName)} {...rest}>
      <span className="sr-only">{texts[currentIndex]}</span>
      <span className={cn("inline-flex overflow-hidden pb-1", splitLevelClassName)} aria-hidden="true">
        {texts[currentIndex].split('').map((char, i) => (
          <span key={i} className={cn('rt-char inline-block will-change-transform', elementLevelClassName)}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </span>
  );
});

RotatingText.displayName = 'RotatingText';
export default RotatingText;
