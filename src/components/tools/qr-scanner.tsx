"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { Camera, Upload, Copy, Check, ExternalLink, CircleX } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { track } from "@/lib/stats/stats";

function looksLikeUrl(text: string) {
  return /^https?:\/\//i.test(text.trim());
}

export default function QrScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [result, setResult] = useState("");
  const { copied, copy } = useCopy();

  const stopCamera = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setScanning(false);
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  const tick = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      frameRef.current = requestAnimationFrame(tick);
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      frameRef.current = requestAnimationFrame(tick);
      return;
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(frame.data, frame.width, frame.height, { inversionAttempts: "dontInvert" });
    if (code?.data) {
      setResult(code.data);
      track("filesProcessed");
      stopCamera();
      return;
    }
    frameRef.current = requestAnimationFrame(tick);
  }, [stopCamera]);

  const startCamera = async () => {
    setCameraError("");
    setResult("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setScanning(true);
      frameRef.current = requestAnimationFrame(tick);
    } catch {
      setCameraError("Couldn't access the camera. Check your browser's camera permission, or upload a QR image instead.");
      setScanning(false);
    }
  };

  const onFile = (file: File) => {
    setResult("");
    setCameraError("");
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(frame.data, frame.width, frame.height);
      if (code?.data) {
        setResult(code.data);
        track("filesProcessed");
      } else {
        setCameraError("No QR code found in that image. Try a clearer, well-lit photo of the code.");
      }
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Scan a QR code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-black">
            <video ref={videoRef} className={scanning ? "aspect-square w-full object-cover" : "hidden"} muted playsInline />
            {!scanning && (
              <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 bg-secondary/40 p-6 text-center">
                <Camera className="size-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Camera preview appears here</p>
              </div>
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />

          <div className="flex flex-wrap gap-2">
            {!scanning ? (
              <Button onClick={startCamera}><Camera /> Start camera</Button>
            ) : (
              <Button variant="outline" onClick={stopCamera}><CircleX /> Stop</Button>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload /> Upload QR image instead
            </Button>
          </div>

          {cameraError && (
            <p className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{cameraError}</p>
          )}

          <p className="text-xs text-muted-foreground">
            Camera video and uploaded images are processed locally in your browser — nothing is recorded or uploaded to a server.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {result ? (
            <>
              <p className="break-all rounded-xl border border-border bg-card p-4 text-sm">{result}</p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => copy(result)}>
                  {copied ? <Check className="text-emerald-500" /> : <Copy />} {copied ? "Copied" : "Copy"}
                </Button>
                {looksLikeUrl(result) && (
                  <a
                    href={result}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ size: "sm", variant: "outline" })}
                  >
                    <ExternalLink /> Open link
                  </a>
                )}
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Start the camera or upload an image to decode a QR code.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
