import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { StoryViewerProps } from "../types";
import { overlayVariants, progressVariants, slideVariants } from "../utils/motion";
export default function StoryViewer({
    story,
    onNext,
    onPrev,
    onClose,
    autoAdvance = true,
    isFirstStory = false,
    isLastStory = false,
}: StoryViewerProps) {
    const [progress, setProgress] = useState(0);
    const [direction, setDirection] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        setProgress(0);
        if (!autoAdvance) return;
        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(intervalRef.current!);
                    setDirection(1);
                    onNext();
                    return 0;
                }
                return prev + 2; // Fills in ~5s (2% every 100ms)
            });
        }, 100);

        return () => clearInterval(intervalRef.current!);
    }, [story, autoAdvance, onNext]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const x = e.clientX;
        if (x < window.innerWidth / 2) {
            setDirection(-1);
            onPrev();
        } else {
            setDirection(1);
            onNext();
        }
    };

    const handlePrevClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDirection(-1);
        onPrev();
    };

    const handleNextClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDirection(1);
        onNext();
    };



    return (
        <motion.div
            className="fixed inset-0 bg-black flex items-center justify-center"
            onClick={handleClick}
            variants={overlayVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
        >
            {/* Progress Bar */}
            <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gray-700"
                variants={progressVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, delay: 0.1 }}
            >
                <motion.div
                    className="h-full bg-white"
                    style={{ width: `${progress}%` }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>

            {/* Previous Button */}
            {!isFirstStory && (
                <button
                    onClick={handlePrevClick}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white text-xl z-10 transition-all duration-200"
                    aria-label="Previous story"
                >
                    &#8249;
                </button>
            )}

            {/* Next Button */}
            {!isLastStory && (
                <button
                    onClick={handleNextClick}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white text-xl z-10 transition-all duration-200"
                    aria-label="Next story"
                >
                    &#8250;
                </button>
            )}

            {/* Story Image with Animation */}
            <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                    key={story.id}
                    src={story.image}
                    alt="Story"
                    className="max-w-full max-h-full object-contain"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                        scale: { duration: 0.3 },
                    }}
                />
            </AnimatePresence>

            {/* Close Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors duration-200"
                aria-label="Close story"
            >
                ×
            </button>
        </motion.div>
    );
}