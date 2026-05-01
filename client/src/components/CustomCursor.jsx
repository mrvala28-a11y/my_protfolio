import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomCursor = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isNavbar, setIsNavbar] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [showText, setShowText] = useState(false);
  const [particles, setParticles] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const particleIdRef = useRef(0);

  const lerp = (start, end, factor) => start + (end - start) * factor;

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      posRef.current = { x, y };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;

      const cursorAttr =
        target.getAttribute?.("data-cursor") ||
        target.closest("[data-cursor]")?.getAttribute?.("data-cursor");

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button");

      const isNav = target.closest("nav");

      setIsNavbar(!!isNav);
      setIsHovering(isInteractive);

      if (cursorAttr) {
        setCursorText(cursorAttr);
        setShowText(true);
      } else if (isInteractive) {
        setCursorText("Open");
        setShowText(true);
      } else {
        setCursorText("");
        setShowText(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  // Smooth animation loop
  useEffect(() => {
    let frame;

    const animate = () => {
      const { x, y } = posRef.current;

      const dotX = lerp(cursorPos.x, x, 0.3);
      const dotY = lerp(cursorPos.y, y, 0.3);

      const ringX = lerp(ringPosRef.current.x, x, 0.15);
      const ringY = lerp(ringPosRef.current.y, y, 0.15);

      setCursorPos({ x: dotX, y: dotY });
      setRingPos({ x: ringX, y: ringY });

      ringPosRef.current = { x: ringX, y: ringY };

      // particles
      if (Math.abs(x - ringX) > 2 || Math.abs(y - ringY) > 2) {
        particleIdRef.current += 1;

        if (particleIdRef.current % 3 === 0) {
          setParticles((prev) => [
            ...prev.slice(-12),
            {
              id: particleIdRef.current,
              x: dotX,
              y: dotY,
              life: 1,
            },
          ]);
        }
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [cursorPos]);

  // particle decay
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({ ...p, life: p.life - 0.08 })).filter((p) => p.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  if (!isVisible) return null;

  const expand = isHovering || showText;

  return (
    <>
      {/* DOT */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-green-400 rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: cursorPos.x - 6,
          y: cursorPos.y - 6,
          scale: expand ? 0 : 1,
          opacity: isNavbar ? 0.2 : expand ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* RING */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: ringPos.x - 50,
          y: ringPos.y - 50,
          width: expand ? 100 : 60,
          height: expand ? 100 : 60,
          opacity: isNavbar ? 0 : expand ? 0.9 : 0.5,
          backgroundColor: expand
            ? "rgba(34, 197, 94, 0.15)"
            : "transparent",
          borderWidth: expand ? 2 : 1.5,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        style={{
          borderColor: "#22c55e",
          borderStyle: "solid",
        }}
      />

      {/* TEXT MODE */}
      <AnimatePresence>
        {showText && !isNavbar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="fixed z-[9997] hidden md:block pointer-events-none"
            style={{
              left: ringPos.x - 40,
              top: ringPos.y - 12,
            }}
          >
            <span
              className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md"
              style={{
                color: "#fff",
                background: "rgba(34, 197, 94, 0.2)",
                border: "1px solid rgba(34, 197, 94, 0.6)",
                boxShadow: "0 0 12px rgba(34, 197, 94, 0.4)",
              }}
            >
              {cursorText}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PARTICLES */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.5 }}
          className="fixed w-2 h-2 rounded-full pointer-events-none z-[9996] hidden md:block"
          style={{
            left: p.x - 4,
            top: p.y - 4,
            backgroundColor: "rgba(34,197,94,0.6)",
            boxShadow: "0 0 8px rgba(34,197,94,0.4)",
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;