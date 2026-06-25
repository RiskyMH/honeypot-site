#!/usr/bin/env bun
import { Glob } from "bun";
import sizeOf from "image-size";
import path from "path";
import fs from "fs";

const DIST_DIR_A = path.resolve(import.meta.dirname, ".output/public");
const DIST_DIR_B = path.resolve(import.meta.dirname, "dist/client");

/**
 * Optimizes all <img> elements across generated HTML assets using native Bun primitives.
 */
async function lockImageAspectRatios() {
    const DIST_DIR = fs.existsSync(DIST_DIR_A) ? DIST_DIR_A : fs.existsSync(DIST_DIR_B) ? DIST_DIR_B : null;
    if (!DIST_DIR) {
        console.error('❌ "dist" folder not found. Run your production build first.');
        process.exit(1);
    }

    console.log("🚀 Starting Bun-powered layout-shift optimization...");

    // Instantiate a modern, high-performance Bun file glob
    const glob = new Glob("**/*.html");
    const htmlFiles: string[] = await Array.fromAsync(glob.scan({ cwd: DIST_DIR, absolute: true }));

    if (htmlFiles.length === 0) {
        console.log("ℹ️ No HTML files discovered inside dist folder.");
        return;
    }

    let totalImagesOptimized = 0;

    // Process all matched HTML files concurrently using Bun file buffers
    await Promise.all(
        htmlFiles.map(async (filePath) => {
            const fileBytes = Bun.file(filePath);
            const htmlContent = await fileBytes.text();

            // Early escape if the file contains no images to save operations
            if (!htmlContent.includes("<img")) return;

            const currentFileDir = path.dirname(filePath);

            // Native streaming HTML transformer
            const rewriter = new HTMLRewriter().on("img", {
                async element(element) {
                    const src = element.getAttribute("src");

                    const heightAttr = element.getAttribute("height");
                    const widthAttr = element.getAttribute("width");

                    // Skip if the image already has explicit width and height attributes
                    if (heightAttr && widthAttr) {
                        return;
                    }

                    // Skip missing sources, base64 data strings, and remote network assets
                    if (!src || src.startsWith("data:") || src.startsWith("http://") || src.startsWith("https://")) {
                        return;
                    }

                    // Strip cache-busting arguments or query strings (?v=123)
                    const [cleanSrcPath] = src.split("?");

                    // Determine the correct asset home directory mapping
                    let absoluteImgPath = cleanSrcPath.startsWith("/")
                        ? path.join(DIST_DIR, cleanSrcPath)
                        : path.resolve(currentFileDir, cleanSrcPath);

                    if (fs.existsSync(absoluteImgPath)) {
                        try {
                            const dimensions = sizeOf(await Bun.file(absoluteImgPath).bytes());

                            if (dimensions.width && dimensions.height) {
                                // 1. Structural hints for the browser layout engine
                                element.setAttribute("width", dimensions.width.toString());
                                element.setAttribute("height", dimensions.height.toString());

                                // 2. High-performance design attributes
                                const styleRules = [
                                    `aspect-ratio: ${dimensions.width} / ${dimensions.height}`,
                                    // "width: 100%",
                                    // "height: auto",
                                    "content-visibility: auto",
                                    `contain-intrinsic-size: auto ${dimensions.height}px`,
                                ].join("; ");

                                // Read existing inline styles if they are already present
                                const currentStyle = element.getAttribute("style");
                                element.setAttribute(
                                    "style",
                                    currentStyle ? `${currentStyle}; ${styleRules}` : styleRules
                                );

                                totalImagesOptimized++;
                            }
                        } catch (err) {
                            // Gracefully pass unsupported file configurations
                        }
                    }
                }
            });

            // Transform the output via streaming allocation and write it back to disk
            const optimizedHtml = rewriter.transform(htmlContent);
            await Bun.write(filePath, optimizedHtml);

            console.log(`⚡ Fixed image CLS for: ./${path.relative(DIST_DIR, filePath)}`);
        })
    );

    console.log(`\n✨ Done! Optimized ${totalImagesOptimized} images with zero third-party HTML parsing dependencies.\n`);
}

lockImageAspectRatios().catch((err) => {
    console.error("❌ Optimization execution broken:", err);
    process.exit(1);
});
