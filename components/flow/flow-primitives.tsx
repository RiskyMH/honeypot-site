import React, { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export type NodeVariant =
  | 'amber'
  | 'amber-dashed'
  | 'blue'
  | 'gray'
  | 'green'
  | 'green-dashed'

const NODE_VARIANTS: Record<NodeVariant, string> = {
  amber: 'border-primary/30 bg-primary/[0.06] text-primary/85',
  'amber-dashed': 'border-dashed border-primary/30 bg-primary/[0.03] text-primary/85',
  blue: 'border-blue-500/30 bg-blue-500/[0.06] text-blue-400/85',
  gray: 'border-border bg-muted/25 text-foreground/90',
  green: 'border-green-500/30 bg-green-500/[0.06] text-green-400/85',
  'green-dashed': 'border-dashed border-green-500/30 bg-green-500/[0.03] text-green-400/85',
}

const LINE = 'stroke-muted-foreground/60'

export interface FlowProps {
  id?: string
  title?: string
  compact?: boolean
  children: React.ReactNode
  className?: string
}

export function Flow({ id, title, compact = false, children, className }: FlowProps) {
  const items = React.Children.toArray(children)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el || el.scrollWidth <= el.clientWidth) return
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
  }, [])

  return (
    <section
      id={id}
      className={cn(
        'w-full max-w-3xl scroll-mt-24 rounded-xl border border-border bg-[#12151a] p-4 text-foreground',
        !compact && 'sm:p-6',
        className,
      )}
    >
      {title && (
        <h2
          className={cn(
            'mb-5 text-base font-semibold text-foreground sm:mb-6 sm:text-lg',
            compact && 'text-center',
          )}
        >
          {title}
        </h2>
      )}

      <div
        ref={scrollRef}
        className={cn(
          'pb-2',
          compact ? 'overflow-visible' : 'overflow-x-auto overscroll-x-contain',
        )}
      >
        <div
          className={cn(
            'flex flex-col items-center',
            compact ? 'mx-auto w-48 max-w-full' : 'min-w-[600px]',
          )}
        >
          {items.map((child, index) => {
            const isLast = index === items.length - 1
            const isTerminalSplit =
              React.isValidElement(child) &&
              (child.type === Split || child.type === Tracks)
            const downLabel = React.isValidElement<{ downLabel?: string }>(child)
              ? child.props.downLabel
              : undefined

            return (
              <React.Fragment key={index}>
                {child}
                {!isLast && !isTerminalSplit && (
                  <DownArrow label={downLabel} compact={compact} />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export interface StepProps {
  variant?: NodeVariant
  edge?: string
  downLabel?: string
  className?: string
  children: React.ReactNode
}

export function Step({ variant = 'blue', className, children }: StepProps) {
  return (
    <div
      className={cn(
        'flex min-h-14 w-48 shrink-0 flex-col items-center justify-center rounded-lg border px-3.5 py-2.5 text-center text-[13px] leading-snug',
        NODE_VARIANTS[variant],
        className,
      )}
    >
      {children}
    </div>
  )
}

export interface BranchProps {
  question: React.ReactNode
  questionVariant?: NodeVariant
  downLabel?: string
  exitLabel: string
  exitNode: React.ReactNode
  exitVariant?: NodeVariant
  exitDashed?: boolean
}

export function Branch({
  question,
  questionVariant = 'blue',
  exitLabel,
  exitNode,
  exitVariant = 'gray',
  exitDashed = false,
}: BranchProps) {
  return (
    <div className="flex w-full justify-center">
      <div className="relative">
        <Step variant={questionVariant}>{question}</Step>

        <div className="absolute left-full top-1/2 flex -translate-y-1/2 items-center">
          <RightArrow label={exitLabel} dashed={exitDashed} />
          <Step variant={exitVariant}>{exitNode}</Step>
        </div>
      </div>
    </div>
  )
}

export interface ParallelProps {
  title?: string
  direction?: 'row' | 'column'
  children: React.ReactNode
}

export function Parallel({ title, direction = 'row', children }: ParallelProps) {
  const items = React.Children.toArray(children)

  return (
    <div className="rounded-lg border border-border bg-secondary/30 px-4 pb-4 pt-3">
      {title && (
        <div className="mb-3 text-xs font-medium text-muted-foreground">
          {title}
        </div>
      )}

      {direction === 'row' ? (
        <div className="flex flex-wrap items-stretch justify-center gap-3">
          {items}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {items.map((child, idx) => (
            <React.Fragment key={idx}>
              {child}
              {idx < items.length - 1 && <DownArrow compact />}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

export interface SplitProps {
  question: React.ReactNode
  merge?: boolean
  children: [React.ReactElement<StepProps>, React.ReactElement<StepProps>]
}

export function Split({ question, merge = true, children }: SplitProps) {
  const [left, right] = children

  return (
    <div className="flex flex-col items-center">
      <Step variant="blue">{question}</Step>

      <div className="relative h-11 w-64">
        <svg className={cn('h-full w-full overflow-visible', LINE)} fill="none" strokeWidth={1.5}>
          <line x1="105" y1="0" x2="55" y2="40" />
          <line x1="151" y1="0" x2="201" y2="40" />
        </svg>

        {left.props.edge && (
          <span className="absolute left-7 top-2.5 bg-[#12151a] px-1.5 text-[11px] text-muted-foreground">
            {left.props.edge}
          </span>
        )}
        {right.props.edge && (
          <span className="absolute right-7 top-2.5 bg-[#12151a] px-1.5 text-[11px] text-muted-foreground">
            {right.props.edge}
          </span>
        )}
      </div>

      <div className="flex items-stretch justify-center gap-4">
        {left}
        {right}
      </div>

      {merge && (
        <div className="h-10 w-64">
          <svg className={cn('h-full w-full overflow-visible', LINE)} fill="none" strokeWidth={1.5}>
            <line x1="55" y1="0" x2="124" y2="36" />
            <line x1="201" y1="0" x2="132" y2="36" />
          </svg>
        </div>
      )}
    </div>
  )
}

export interface TrackColumnProps {
  title: string
  stretch?: boolean
  children: React.ReactNode
}

export function TrackColumn({ title, stretch = true, children }: TrackColumnProps) {
  const items = React.Children.toArray(children)

  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center rounded-lg border border-border bg-secondary/30 px-3 pb-4 pt-3',
        stretch && 'h-full',
      )}
    >
      <div className="mb-3 w-full text-left text-xs font-medium text-muted-foreground">
        {title}
      </div>
      <div className={cn('flex flex-col items-center', stretch && 'h-full flex-1')}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item}
            {index < items.length - 1 && <DownArrow compact />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export interface TracksProps {
  children: React.ReactNode
}

export function Tracks({ children }: TracksProps) {
  const cols = React.Children.toArray(children)

  return (
    <div className="flex w-full flex-col items-center">
      <svg
        viewBox="0 0 600 44"
        className={cn('h-11 w-full max-w-2xl overflow-visible', LINE)}
        fill="none"
        strokeWidth={1.5}
      >
        <line x1="280" y1="0" x2="100" y2="40" />
        <line x1="300" y1="0" x2="300" y2="40" />
        <line x1="320" y1="0" x2="500" y2="40" />
      </svg>

      <div className="grid w-full max-w-2xl grid-cols-3 items-stretch gap-3">
        {cols}
      </div>

      <svg
        viewBox="0 0 600 48"
        className={cn('h-12 w-full max-w-2xl overflow-visible', LINE)}
        fill="none"
        strokeWidth={1.5}
      >
        <line x1="100" y1="0" x2="285" y2="44" />
        <line x1="300" y1="0" x2="300" y2="44" />
        <line x1="500" y1="0" x2="315" y2="44" />
      </svg>
    </div>
  )
}

function DownArrow({ label, compact = false }: { label?: string; compact?: boolean }) {
  return (
    <div
      className={cn(
        'relative flex w-8 shrink-0 flex-col items-center justify-center',
        compact ? 'h-6' : 'h-10',
      )}
    >
      <svg className={cn('h-full w-4 overflow-visible', LINE)} fill="none" strokeWidth={1.5}>
        <line x1="8" y1="0" x2="8" y2={compact ? 22 : 36} />
      </svg>
      {label && (
        <span className="absolute whitespace-nowrap bg-[#12151a] px-1.5 py-0.5 text-[11px] text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  )
}

function RightArrow({ label, dashed = false }: { label?: string; dashed?: boolean }) {
  return (
    <div className="relative flex h-6 w-16 shrink-0 items-center justify-center">
      <svg className={cn('h-4 w-full overflow-visible', LINE)} fill="none" strokeWidth={1.5}>
        <line
          x1="0"
          y1="8"
          x2="60"
          y2="8"
          strokeDasharray={dashed ? '4 3' : undefined}
        />
      </svg>
      {label && (
        <span
          className={cn(
            'absolute bg-[#12151a] px-1.5 text-[11px] text-muted-foreground',
            dashed ? '-top-4 w-16 text-center leading-tight' : 'whitespace-nowrap',
          )}
        >
          {label}
        </span>
      )}
    </div>
  )
}
