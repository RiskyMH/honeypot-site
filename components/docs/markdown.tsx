import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";


function hashify(text: string) {
    return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function TitleHashLinkIcon({ hash }: { hash: string }) {
    return (
        <a
            href={`#${hash}`}
            className="relative inline-block opacity-0 group-hover/title:opacity-100 transition-opacity duration-200 ease-in-out text-amber-500 hover:text-amber-500/85 ms-1 px-1 select-none font-normal"
        >
            #
        </a>
    )
}

export function DocsTitle({ title, description }: { title: string, description?: string }) {
    return (
        <div className="flex flex-col items-start">
            <h1 className="mb-2 text-4xl font-bold text-white scroll-mt-20">
                {title}
            </h1>
            {description && (
                <p className="mb-6 text-lg text-amber-500">
                    {description}
                </p>
            )}
        </div>
    )
}

export function DocsSection({ title, children, id }: { title: string, children: React.ReactNode, id?: string }) {
    return (
        <section className="mb-12 scroll-mt-20" id={id || hashify(title)}>
            <h2 className="mb-3 text-2xl font-bold text-white group/title">
                {title}
                <TitleHashLinkIcon hash={id || hashify(title)} />
            </h2>
            {children}
        </section>
    )
}

export function DocsSubheading({ title, id }: { title: string, id?: string }) {
    return (
        <h3 className="mb-3 text-lg font-semibold text-white scroll-mt-20 group/title" id={id || hashify(title)}>
            {title}
            <TitleHashLinkIcon hash={id || hashify(title)} />
        </h3>
    )
}

export function DocsOl({ children }: { children: React.ReactNode }) {
    children = Array.isArray(children) ? children : [children];
    const size = children.length.toString().length;
    return (
        <ol className="mb-6 space-y-3 text-gray-400">
            {children.map((child, index) => (
                <li key={index} className="flex gap-3">
                    <span className="text-gray-500 w-[1ch]" style={{width: `${size}ch`}}>{index + 1}.</span>
                    <span>{child}</span>
                </li>
            ))}
        </ol>
    )
}

export function DocsP({ children }: { children: React.ReactNode }) {
    return (
        <p className="mb-4 text-gray-400">
            {children}
        </p>
    )
}

export function DocsImg({ src, alt, height }: { src: string, alt: string, height?: number }) {
    return (
        <figure className="mb-6 flex w-full flex-col items-center gap-2">
            <img
                src={src}
                alt={alt}
                className="max-h-130 w-full max-w-3xl rounded-lg border-amber-500/50 border-2 object-contain"
                loading="lazy"
                height={height}
            />
            <figcaption className="text-center text-sm text-gray-500">{alt}</figcaption>
        </figure>
    )
}
export function DocsImgPlaceholder({ alt }: { alt: string }) {
    return (
        <DocsImg src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='700' viewBox='0 0 1200 700'%3E%3Crect width='1200' height='700' fill='%23374151'/%3E%3C/svg%3E" alt={alt} />
    )
}

export function DocsLink({ href, children }: { href: string, children: React.ReactNode }) {
    if (href.startsWith("https")) {
        return (
            <a href={href} className="text-amber-500 hover:underline" target="_blank">
                {children}
            </a>
        )
    }
    return (
        <Link to={href} className="text-amber-500 hover:underline">
            {children}
        </Link>
    )
}

export function DocsLearnMore({ href, text }: { href: string, text: string }) {
    return (
        <p className="text-sm text-gray-400">
            <Link
                to={href}
                className="text-amber-500 hover:underline text-sm"
            >
                Learn more
            </Link>
            {" " + text}
            <ChevronRight className="ml-1 inline h-3 w-3 text-amber-500" />

        </p>
    )
}

export function DocsInlineCode({ children }: { children: React.ReactNode }) {
    return (
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-amber-500 text-sm">
            {children}
        </code>
    )
}

type CalloutTone = "info" | "warn" | "success" | "note";

const calloutStyles: Record<CalloutTone, { border: string; bg: string; text: string; label: string }> = {
    info: {
        border: "border-blue-500/30",
        bg: "bg-blue-500/10",
        text: "text-blue-200",
        label: "Info",
    },
    warn: {
        border: "border-amber-500/30",
        bg: "bg-amber-500/10",
        text: "text-amber-200",
        label: "Warning",
    },
    success: {
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/10",
        text: "text-emerald-200",
        label: "Success",
    },
    note: {
        border: "border-white/10",
        bg: "bg-white/5",
        text: "text-gray-300",
        label: "Note",
    },
};

export function DocsCallout({ tone = "note", title, children }: { tone?: CalloutTone; title?: string; children: React.ReactNode }) {
    const styles = calloutStyles[tone];
    return (
        <div className={`mb-6 rounded-lg border ${styles.border} ${styles.bg} p-4`}>
            <p className={`mb-2 text-xs font-semibold uppercase tracking-wide ${styles.text}`}>
                {title || styles.label}
            </p>
            <div className="text-sm text-gray-300">
                {children}
            </div>
        </div>
    );
}

export function DocsStepList({ children }: { children: React.ReactNode }) {
    return (
        <div className="mb-6 space-y-3">
            {children}
        </div>
    );
}

export function DocsStep({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
    return (
        <div className="flex gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-sm font-semibold text-amber-200 shrink-0">
                {step}
            </div>
            <div>
                <h3 className="mb-1 text-sm font-semibold text-white">{title}</h3>
                <div className="text-sm text-gray-400">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function DocsTable({ headers, rows }: { headers: string[]; rows: Array<Array<React.ReactNode>> }) {
    return (
        <div className="mb-6">
            {/* Desktop: proper table */}
            <div className="hidden sm:block overflow-x-auto rounded-xl border border-white/10 bg-white/5">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-gray-500">
                            {headers.map((header) => (
                                <th key={header} className="px-4 py-3 font-semibold">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <tr key={idx} className={idx !== 0 ? "border-t border-white/10" : ""}>
                                {row.map((cell, cellIdx) => (
                                    <td key={cellIdx} className="px-4 py-3 text-sm text-gray-400">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Mobile: stacked cards */}
            <div className="space-y-3 sm:hidden">
                {rows.map((row, idx) => (
                    <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4">
                        {headers.map((header, headIdx) => (
                            <div key={header} className={headIdx !== 0 ? "mt-3" : ""}>
                                <span className="block text-xs uppercase tracking-wide text-gray-500">{header}</span>
                                <span className="block text-sm text-gray-200 mt-0.5">{row[headIdx]}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function DocsKeyValue({ label, value, hint }: { label: string; value: React.ReactNode; hint?: React.ReactNode }) {
    return (
        <div className="mb-4 rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
            <div className="mt-2 text-sm text-gray-200">{value}</div>
            {hint && <div className="mt-2 text-xs text-gray-500">{hint}</div>}
        </div>
    );
}

export function DocsBadge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "amber" | "blue" }) {
    const toneClass = tone === "amber"
        ? "bg-amber-500/20 text-amber-200"
        : tone === "blue"
            ? "bg-blue-500/20 text-blue-200"
            : "bg-white/10 text-gray-300";
    return (
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${toneClass}`}>
            {children}
        </span>
    );
}

export function DocsCodeBlock({ code, language = "" }: { code: string; language?: string }) {
    return (
        <div className="mb-6 overflow-hidden rounded-lg border border-white/10 bg-black/40">
            {language && (
                <div className="border-b border-white/10 px-4 py-2 text-xs uppercase tracking-wide text-gray-500">
                    {language}
                </div>
            )}
            <pre className="overflow-x-auto px-4 py-3 text-sm text-gray-200 max-w-[90vw] sm:max-w-[90vw] lg:max-w-[70vw] xl:max-w-[80vw] 2xl:max-w-full">
                <code>{code}</code>
            </pre>
        </div>
    );
}

export function DocsUl({ children }: { children: React.ReactNode }) {
    return (
        <ul className="mb-6 space-y-2">
            {children}
        </ul>
    );
}

export function DocsLi({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-2 text-gray-400">
            <span className="mt-1.5 h-1 w-1.5 shrink-0 rounded-full bg-gray-500" />
            <span>{children}</span>
        </li>
    );
}

export function DocsChecklist({ children }: { children: React.ReactNode }) {
    return (
        <ul className="mb-6 space-y-2 text-gray-400">
            {children}
        </ul>
    );
}

export function DocsChecklistItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-2">
            <span className="mt-2 h-2 w-2 rounded-full bg-amber-500/70 shrink-0" />
            <span>{children}</span>
        </li>
    );
}

export function DocsFaqList({ children }: { children: React.ReactNode }) {
    return (
        <div className="mb-6 grid gap-4 md:grid-cols-2">
            {children}
        </div>
    )
}

export function DocsFaqItem({ question, children }: { question: string; children: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-2 text-base font-semibold text-white">{question}</h3>
            <div className="text-sm text-gray-400">{children}</div>
        </div>
    )
}
