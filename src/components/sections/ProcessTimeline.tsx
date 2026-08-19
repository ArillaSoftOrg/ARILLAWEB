'use client';

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './ProcessTimeline.module.css';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: Step[];
  accentColor: string;
  start: boolean;
}

type StepStatus = 'future' | 'active' | 'completed';

const INITIAL_DELAY = 200;
const STEP_INTERVAL = 850;
const FINAL_HOLD = 850;

function useSequentialTimeline(stepCount: number, start: boolean) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [finished, setFinished] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current || stepCount === 0) return;
    startedRef.current = true;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setActiveIndex(stepCount - 1);
      setFinished(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < stepCount; i++) {
      timers.push(setTimeout(() => setActiveIndex(i), INITIAL_DELAY + i * STEP_INTERVAL));
    }
    timers.push(
      setTimeout(
        () => setFinished(true),
        INITIAL_DELAY + (stepCount - 1) * STEP_INTERVAL + FINAL_HOLD
      )
    );

    return () => timers.forEach(clearTimeout);
  }, [start, stepCount]);

  const statuses: StepStatus[] = Array.from({ length: stepCount }, (_, i) => {
    if (activeIndex === -1) return 'future';
    if (i < activeIndex) return 'completed';
    if (i === activeIndex) return finished ? 'completed' : 'active';
    return 'future';
  });

  const progress = stepCount > 1 && activeIndex >= 0 ? (activeIndex / (stepCount - 1)) * 100 : 0;

  return { statuses, progress, activeIndex, started: activeIndex !== -1 };
}

function nodeStyle(status: StepStatus, accentColor: string) {
  if (status === 'future') {
    return {
      background: '#ffffff',
      border: '1.5px solid rgba(15,23,42,0.18)',
      color: 'rgba(15,23,42,0.35)',
      boxShadow: 'none',
      transform: 'scale(1)',
    };
  }
  if (status === 'active') {
    return {
      background: accentColor,
      border: `1.5px solid ${accentColor}`,
      color: '#ffffff',
      boxShadow: `0 0 0 6px ${accentColor}22, 0 14px 30px ${accentColor}40`,
      transform: 'scale(1.08)',
    };
  }
  return {
    background: '#ffffff',
    border: `1px solid ${accentColor}55`,
    color: accentColor,
    boxShadow: `0 12px 28px ${accentColor}1f`,
    transform: 'scale(1)',
  };
}

function contentStyle(status: StepStatus): { opacity: number; transform: string } {
  if (status === 'future') return { opacity: 0.42, transform: 'translateY(6px)' };
  if (status === 'active') return { opacity: 1, transform: 'translateY(0)' };
  return { opacity: 0.78, transform: 'translateY(0)' };
}

function connectorColor(status: StepStatus, accentColor: string) {
  return status === 'future' ? 'rgba(15,23,42,0.14)' : accentColor;
}

function NodeCircle({
  number,
  status,
  accentColor,
}: {
  number: number;
  status: StepStatus;
  accentColor: string;
}) {
  return (
    <div className={styles.node} style={nodeStyle(status, accentColor)}>
      {number}
    </div>
  );
}

function StepContent({
  step,
  status,
  className,
}: {
  step: Step;
  status: StepStatus;
  className: string;
}) {
  return (
    <div className={className} style={contentStyle(status)}>
      <h3
        className="text-role-subheading"
        style={{ fontSize: '22px', margin: '0 0 10px', textWrap: 'balance' }}
      >
        {step.title}
      </h3>
      <p className="text-role-body" style={{ margin: 0, color: '#64748b' }}>
        {step.description}
      </p>
    </div>
  );
}

export default function ProcessTimeline({ steps, accentColor, start }: ProcessTimelineProps) {
  const { statuses, progress, activeIndex, started } = useSequentialTimeline(
    steps.length,
    start
  );

  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [nodeYs, setNodeYs] = useState<number[]>([]);

  useLayoutEffect(() => {
    function measure() {
      const container = mobileContainerRef.current;
      if (!container) return;
      const containerTop = container.getBoundingClientRect().top;
      const ys = nodeRefs.current.map((node) => {
        if (!node) return 0;
        const rect = node.getBoundingClientRect();
        return rect.top - containerTop + rect.height / 2;
      });
      setNodeYs(ys);
    }
    measure();
    window.addEventListener('resize', measure);

    const container = mobileContainerRef.current;
    const observer = container ? new ResizeObserver(() => measure()) : null;
    observer?.observe(container as HTMLDivElement);

    return () => {
      window.removeEventListener('resize', measure);
      observer?.disconnect();
    };
  }, [steps.length]);

  const trackTop = nodeYs[0] ?? 0;
  const trackHeight = nodeYs.length ? Math.max((nodeYs[nodeYs.length - 1] ?? 0) - trackTop, 0) : 0;
  const progressHeight =
    started && nodeYs.length ? Math.max((nodeYs[activeIndex] ?? trackTop) - trackTop, 0) : 0;

  return (
    <div
      className={styles.wrapper}
      style={{ ['--accent' as string]: accentColor } as React.CSSProperties}
    >
      {/* Desktop: alternating horizontal timeline */}
      <div className={styles.desktop}>
        <div className={styles.desktopGrid}>
          {steps.map((step, i) => {
            const above = i % 2 === 0;
            return (
              <div key={`top-${step.title}`} className={styles.desktopZoneTop}>
                {above && (
                  <StepContent step={step} status={statuses[i]} className={styles.desktopContent} />
                )}
              </div>
            );
          })}

          {steps.map((step, i) => {
            const above = i % 2 === 0;
            return (
              <div key={`ctop-${step.title}`} className={styles.connectorSlot}>
                {above && (
                  <span
                    className={styles.connector}
                    style={{ background: connectorColor(statuses[i], accentColor) }}
                  />
                )}
              </div>
            );
          })}

          <div
            className={styles.trackSlot}
            style={{ gridColumn: '1 / -1', gridRow: 3 }}
            aria-hidden="true"
          >
            <div className={styles.desktopTrack} />
            <div
              className={styles.desktopProgress}
              style={{ width: `${progress}%`, background: accentColor }}
            />
          </div>

          {steps.map((step, i) => (
            <div
              key={`node-${step.title}`}
              className={styles.desktopNodeSlot}
              style={{ gridColumn: i + 1, gridRow: 3 }}
            >
              <NodeCircle number={step.number} status={statuses[i]} accentColor={accentColor} />
            </div>
          ))}

          {steps.map((step, i) => {
            const above = i % 2 === 0;
            return (
              <div key={`cbot-${step.title}`} className={styles.connectorSlot}>
                {!above && (
                  <span
                    className={styles.connector}
                    style={{ background: connectorColor(statuses[i], accentColor) }}
                  />
                )}
              </div>
            );
          })}

          {steps.map((step, i) => {
            const above = i % 2 === 0;
            return (
              <div key={`bot-${step.title}`} className={styles.desktopZoneBottom}>
                {!above && (
                  <StepContent step={step} status={statuses[i]} className={styles.desktopContent} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: alternating vertical timeline */}
      <div className={styles.mobile} ref={mobileContainerRef}>
        <div
          className={styles.mobileTrack}
          style={{ top: trackTop, height: trackHeight }}
          aria-hidden="true"
        />
        <div
          className={styles.mobileProgress}
          style={{ top: trackTop, height: progressHeight, background: accentColor }}
          aria-hidden="true"
        />
        <div className={styles.mobileGrid}>
          {steps.map((step, i) => {
            const isRight = i % 2 === 0;
            const status = statuses[i];
            return (
              <Fragment key={step.title}>
                <div className={`${styles.mobileCell} ${styles.mobileCellLeft}`}>
                  {!isRight && (
                    <>
                      <span
                        className={styles.mobileConnector}
                        style={{ background: connectorColor(status, accentColor) }}
                      />
                      <StepContent step={step} status={status} className={styles.mobileContent} />
                    </>
                  )}
                </div>
                <div
                  className={styles.mobileNodeCell}
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                >
                  <NodeCircle number={step.number} status={status} accentColor={accentColor} />
                </div>
                <div className={`${styles.mobileCell} ${styles.mobileCellRight}`}>
                  {isRight && (
                    <>
                      <span
                        className={styles.mobileConnector}
                        style={{ background: connectorColor(status, accentColor) }}
                      />
                      <StepContent step={step} status={status} className={styles.mobileContent} />
                    </>
                  )}
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
