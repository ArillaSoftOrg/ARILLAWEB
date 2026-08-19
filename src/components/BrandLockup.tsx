'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './BrandLockup.module.css';

const DESCRIPTORS = ['YAZILIM', 'SOFTWARE', 'CREATIVE'] as const;
const ROTATION_DELAY_MS = 3500;
const TRANSITION_DELAY_MS = 180;

type BrandLockupProps = {
  className?: string;
  descriptorMode?: 'rotating' | 'hidden';
  rotationEnabled?: boolean;
  variant?: 'default' | 'maintenance' | 'surface';
};

export default function BrandLockup({
  className,
  descriptorMode = 'rotating',
  rotationEnabled = true,
  variant = 'default',
}: BrandLockupProps) {
  const [descriptorIndex, setDescriptorIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (descriptorMode !== 'rotating' || !rotationEnabled) {
      setDescriptorIndex(0);
      setVisible(true);
      return;
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (motionQuery.matches) {
      setDescriptorIndex(0);
      setVisible(true);
      return;
    }

    const intervalId = window.setInterval(() => {
      setVisible(false);

      timeoutRef.current = window.setTimeout(() => {
        setDescriptorIndex((current) => (current + 1) % DESCRIPTORS.length);
        setVisible(true);
      }, TRANSITION_DELAY_MS);
    }, ROTATION_DELAY_MS);

    return () => {
      window.clearInterval(intervalId);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [descriptorMode, rotationEnabled]);

  return (
    <span
      aria-hidden="true"
      className={[styles.lockup, className].filter(Boolean).join(' ')}
      data-descriptor-mode={descriptorMode}
      data-variant={variant}
    >
      <img className={styles.mark} src="/logoarilla.png" alt="" />
      <span className={styles.wordStack}>
        <span className={styles.wordmark}>ARILLA</span>
        <span className={styles.descriptor} data-visible={String(visible)}>
          {DESCRIPTORS[descriptorIndex]}
        </span>
      </span>
    </span>
  );
}
