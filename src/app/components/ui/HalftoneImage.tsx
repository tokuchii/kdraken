"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface HalftoneOptions {
  cellSize?: number;
  contrast?: number;
  renderScale?: number;
}

export function useHalftone(
  imageSrc: string | null,
  options: HalftoneOptions = {}
) {
  const { cellSize = 6, contrast = 1.25, renderScale = 3 } = options;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const render = useCallback(
    (dotColor: string, bgColor: string) => {
      if (!imageSrc || !canvasRef.current) return;

      let cancelled = false;
      setIsProcessing(true);

      const img = new Image();
      img.src = imageSrc;

      img.onload = () => {
        if (cancelled || !canvasRef.current) return;

        const W = img.naturalWidth;
        const H = img.naturalHeight;

        const srcCanvas = document.createElement("canvas");
        srcCanvas.width = W;
        srcCanvas.height = H;
        const srcCtx = srcCanvas.getContext("2d")!;
        srcCtx.drawImage(img, 0, 0, W, H);

        const imageData = srcCtx.getImageData(0, 0, W, H);
        const data = imageData.data;

        const gray = new Float32Array(W * H);
        let min = 255;
        let max = 0;

        for (let i = 0; i < W * H; i++) {
          const r = data[i * 4];
          const g = data[i * 4 + 1];
          const b = data[i * 4 + 2];
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          gray[i] = lum;
          if (lum < min) min = lum;
          if (lum > max) max = lum;
        }

        const range = Math.max(1, max - min);

        for (let i = 0; i < W * H; i++) {
          let v = ((gray[i] - min) / range) * 255;
          v = (v - 128) * contrast + 128;
          gray[i] = Math.max(0, Math.min(255, v));
        }

        const outCanvas = canvasRef.current;
        const outW = W * renderScale;
        const outH = H * renderScale;
        outCanvas.width = outW;
        outCanvas.height = outH;
        outCanvas.style.width = `${W}px`;
        outCanvas.style.height = `${H}px`;

        const ctx = outCanvas.getContext("2d")!;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, outW, outH);
        ctx.fillStyle = dotColor;

        const maxRadius = cellSize * 0.62 * renderScale;

        for (let y = 0; y < H; y += cellSize) {
          for (let x = 0; x < W; x += cellSize) {
            const idx = y * W + x;
            const brightness = gray[idx] / 255;
            const r = (1 - brightness) * maxRadius;
            if (r > 0.5) {
              ctx.beginPath();
              ctx.arc(x * renderScale, y * renderScale, r, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        if (!cancelled) setIsProcessing(false);
      };

      img.onerror = () => {
        if (!cancelled) setIsProcessing(false);
      };

      return () => {
        cancelled = true;
      };
    },
    [imageSrc, cellSize, contrast, renderScale]
  );

  // Render for current theme on mount and on theme change
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const dotColor = isDark ? "#FAFAFA" : "#18181B";
    const bgColor = isDark ? "#09090B" : "#FAFAFA";
    return render(dotColor, bgColor);
  }, [render]);

  // Re-render when theme class changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      const dotColor = isDark ? "#FAFAFA" : "#18181B";
      const bgColor = isDark ? "#09090B" : "#FAFAFA";
      render(dotColor, bgColor);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [render]);

  return { canvasRef, isProcessing };
}
