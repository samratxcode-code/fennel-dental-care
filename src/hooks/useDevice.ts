"use client";

import { useState, useEffect } from "react";

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

export function useDevice(initialIsMobile = false): DeviceInfo {
  const [device, setDevice] = useState<DeviceInfo>({
    isMobile: initialIsMobile,
    isTablet: false,
    isDesktop: !initialIsMobile,
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      setDevice({
        isMobile,
        isTablet,
        isDesktop,
        width,
      });
    };

    // Initial check on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return device;
}
