"use client";

import type React from "react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import {
	ZapIcon,
	ArrowRight01Icon,
	Mail01Icon,
	SparklesIcon,
	Timer01Icon,
	GlobeIcon,
	Shield01Icon,
	Rocket01Icon,
	Search01Icon,
	Edit01Icon,
	DomeIcon,
	UserIcon,
	Briefcase01Icon,
	CreditCardIcon,
	CircleIcon,
	StarIcon,
} from "hugeicons-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/classes";
import { TalentixBrandIcon } from "@/components/icons";
import { useTranslations } from "next-intl";
import PixelTrail from "@/components/ui/pixel-trail";

// Shiny Text Component
interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '' }) => {
    const animationDuration = `${speed}s`;

    return (
        <div
            className={`text-[#b5b5b5a4] bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
            style={{
                backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                animationDuration: animationDuration,
            }}
        >
            {text}
        </div>
    );
};

// Section-specific Target Cursor with GSAP
export interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  containerRef?: React.RefObject<HTMLElement | HTMLDivElement | null>;
}

const TargetCursor: React.FC<TargetCursorProps> = ({
  targetSelector = ".cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
  containerRef,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<NodeListOf<HTMLDivElement>>(null);
  const spinTl = useRef<gsap.core.Timeline>(null);
  const [isInContainer, setIsInContainer] = useState(false);

  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 12,
      parallaxStrength: 0.00005,
    }),
    []
  );

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.1,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    if (!cursorRef.current || !containerRef?.current) return;

    const container = containerRef.current;
    const originalCursor = document.body.style.cursor;

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll<HTMLDivElement>(
      ".target-cursor-corner"
    );

    let activeTarget: Element | null = null;
    let currentTargetMove: ((ev: Event) => void) | null = null;
    let currentLeaveHandler: (() => void) | null = null;
    let isAnimatingToTarget = false;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;

    const cleanupTarget = (target: Element) => {
      if (currentTargetMove) {
        target.removeEventListener("mousemove", currentTargetMove);
      }
      if (currentLeaveHandler) {
        target.removeEventListener("mouseleave", currentLeaveHandler);
      }
      currentTargetMove = null;
      currentLeaveHandler = null;
    };

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const createSpinTimeline = () => {
      if (spinTl.current) {
        spinTl.current.kill();
      }
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });
    };

    createSpinTimeline();

    const moveHandler = (e: MouseEvent) => {
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const isInside = e.clientX >= rect.left && e.clientX <= rect.right && 
                      e.clientY >= rect.top && e.clientY <= rect.bottom;
      
      if (isInside && !isInContainer) {
        setIsInContainer(true);
        if (hideDefaultCursor) {
          document.body.style.cursor = 'none';
        }
      } else if (!isInside && isInContainer) {
        setIsInContainer(false);
        document.body.style.cursor = originalCursor;
      }
      
      if (isInContainer) {
        moveCursor(e.clientX, e.clientY);
      }
    };

    const enterHandler = (e: Event) => {
      if (!isInContainer) return;
      
      const mouseEvent = e as MouseEvent;
      const directTarget = mouseEvent.target as Element;
      const allTargets: Element[] = [];
      let current = directTarget;
      
      while (current && current !== document.body) {
        if (current.matches(targetSelector)) {
          allTargets.push(current);
        }
        current = current.parentElement!;
      }

      const target = allTargets[0] || null;
      if (!target || !cursorRef.current || !cornersRef.current) return;

      if (activeTarget === target) return;

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      activeTarget = target;

      gsap.killTweensOf(cursorRef.current, "rotation");
      spinTl.current?.pause();

      gsap.set(cursorRef.current, { rotation: 0 });

      const updateCorners = (mouseX?: number, mouseY?: number) => {
        const rect = target.getBoundingClientRect();
        const cursorRect = cursorRef.current!.getBoundingClientRect();

        const cursorCenterX = cursorRect.left + cursorRect.width / 2;
        const cursorCenterY = cursorRect.top + cursorRect.height / 2;

        const [tlc, trc, brc, blc] = Array.from(cornersRef.current!);

        const { borderWidth, cornerSize, parallaxStrength } = constants;

        let tlOffset = {
          x: rect.left - cursorCenterX - borderWidth,
          y: rect.top - cursorCenterY - borderWidth,
        };
        let trOffset = {
          x: rect.right - cursorCenterX + borderWidth - cornerSize,
          y: rect.top - cursorCenterY - borderWidth,
        };
        let brOffset = {
          x: rect.right - cursorCenterX + borderWidth - cornerSize,
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize,
        };
        let blOffset = {
          x: rect.left - cursorCenterX - borderWidth,
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize,
        };

        if (mouseX !== undefined && mouseY !== undefined) {
          const targetCenterX = rect.left + rect.width / 2;
          const targetCenterY = rect.top + rect.height / 2;
          const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;
          const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;

          tlOffset.x += mouseOffsetX;
          tlOffset.y += mouseOffsetY;
          trOffset.x += mouseOffsetX;
          trOffset.y += mouseOffsetY;
          brOffset.x += mouseOffsetX;
          brOffset.y += mouseOffsetY;
          blOffset.x += mouseOffsetX;
          blOffset.y += mouseOffsetY;
        }

        const tl = gsap.timeline();
        const corners = [tlc, trc, brc, blc];
        const offsets = [tlOffset, trOffset, brOffset, blOffset];

        corners.forEach((corner, index) => {
          tl.to(
            corner,
            {
              x: offsets[index].x,
              y: offsets[index].y,
              duration: 0.2,
              ease: "power2.out",
            },
            0
          );
        });
      };

      isAnimatingToTarget = true;
      updateCorners();

      setTimeout(() => {
        isAnimatingToTarget = false;
      }, 1);

      let moveThrottle: number | null = null;
      const targetMove = (ev: Event) => {
        if (moveThrottle || isAnimatingToTarget) return;
        moveThrottle = requestAnimationFrame(() => {
          const mouseEvent = ev as MouseEvent;
          updateCorners(mouseEvent.clientX, mouseEvent.clientY);
          moveThrottle = null;
        });
      };

      const leaveHandler = () => {
        activeTarget = null;
        isAnimatingToTarget = false;

        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current);
          gsap.killTweensOf(corners);

          const { cornerSize } = constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
          ];

          const tl = gsap.timeline();
          corners.forEach((corner, index) => {
            tl.to(
              corner,
              {
                x: positions[index].x,
                y: positions[index].y,
                duration: 0.3,
                ease: "power3.out",
              },
              0
            );
          });
        }

        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current && spinTl.current) {
            const currentRotation = gsap.getProperty(
              cursorRef.current,
              "rotation"
            ) as number;
            const normalizedRotation = currentRotation % 360;

            spinTl.current.kill();
            spinTl.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });

            gsap.to(cursorRef.current, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: "none",
              onComplete: () => {
                spinTl.current?.restart();
              },
            });
          }
          resumeTimeout = null;
        }, 50);

        cleanupTarget(target);
      };

      currentTargetMove = targetMove;
      currentLeaveHandler = leaveHandler;

      target.addEventListener("mousemove", targetMove);
      target.addEventListener("mouseleave", leaveHandler);
    };

    window.addEventListener("mousemove", moveHandler);
    container.addEventListener("mouseover", enterHandler, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      container.removeEventListener("mouseover", enterHandler);

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
    };
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor, containerRef, isInContainer]);

  useEffect(() => {
    if (!cursorRef.current || !spinTl.current) return;
    
    if (spinTl.current.isActive()) {
      spinTl.current.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });
    }
  }, [spinDuration]);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
      style={{ willChange: 'transform', opacity: isInContainer ? 1 : 0 }}
    >
      <div 
        className="absolute left-1/2 top-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" 
        style={{ willChange: 'transform' }}
      />
      <div 
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0" 
        style={{ willChange: 'transform' }}
      />
      <div 
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0" 
        style={{ willChange: 'transform' }}
      />
      <div 
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform translate-x-1/2 translate-y-1/2 border-l-0 border-t-0" 
        style={{ willChange: 'transform' }}
      />
      <div 
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0" 
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

// Beautiful Hero Section with PixelTrail and GSAP
const AmazingHero: React.FC = () => {
	const t = useTranslations("content.promo");
	const [daysLeft, setDaysLeft] = useState(0);
	const [hoursLeft, setHoursLeft] = useState(0);
	const [minutesLeft, setMinutesLeft] = useState(0);
	const heroRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const ctaRef = useRef<HTMLDivElement>(null);
	const badgeRef = useRef<HTMLDivElement>(null);
	const countdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const updateCountdown = () => {
			const targetDate = new Date("2024-08-25T23:59:00");
			const now = new Date();
			const diff = targetDate.getTime() - now.getTime();
			
			if (diff > 0) {
				const days = Math.floor(diff / (1000 * 60 * 60 * 24));
				const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
				
				setDaysLeft(days);
				setHoursLeft(hours);
				setMinutesLeft(minutes);
			} else {
				setDaysLeft(0);
				setHoursLeft(0);
				setMinutesLeft(0);
			}
		};

		updateCountdown();
		const interval = setInterval(updateCountdown, 60000); // Update every minute

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (!heroRef.current) return;

		// Beautiful GSAP timeline
		const masterTl = gsap.timeline();

		// Initial setup
		gsap.set([titleRef.current, ctaRef.current, badgeRef.current, countdownRef.current], {
			opacity: 0,
			y: 50,
		});

		// Beautiful animations
		masterTl.to(badgeRef.current, {
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power2.out",
		})
		.to(titleRef.current, {
			opacity: 1,
			y: 0,
			duration: 1,
			ease: "power2.out",
		}, "-=0.4")
		.to(countdownRef.current, {
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power2.out",
		}, "-=0.6")
		.to(ctaRef.current, {
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power2.out",
		}, "-=0.6");

		// Daily countdown animation
		if (countdownRef.current) {
			gsap.to(countdownRef.current, {
				scale: 1.05,
				duration: 0.5,
				ease: "power2.out",
				yoyo: true,
				repeat: 1,
				delay: 2,
			});
		}

		return () => {
			masterTl.kill();
		};
	}, []);

	return (
		<div ref={heroRef} className="relative py-12 sm:py-16 md:py-20 px-4 min-h-screen flex items-center justify-center overflow-hidden">
			{/* PixelTrail Background with Correct Primary Color */}
			<div className="absolute inset-0">
				<PixelTrail
					gridSize={25}
					trailSize={0.15}
					maxAge={300}
					interpolate={8}
					color="hsl(32, 95%, 44%)"
					gooeyFilter={{ id: "hero-goo-filter", strength: 3 }}
					className="w-full h-full"
				/>
			</div>

			<div className="max-w-4xl mx-auto text-center relative z-10">
				{/* Badge */}
				<div ref={badgeRef} className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-full mb-6 sm:mb-8">
					<SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
					<span className="text-primary text-xs sm:text-sm font-medium">{t("badge")}</span>
				</div>

				{/* Main Title */}
				<h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
					<span className="text-white">{t("title.main")}</span>
					<br />
					<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
						{t("title.highlight")}
					</span>
				</h1>

				{/* Countdown */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 1.5 }}
					className="mb-8 sm:mb-10"
				>
					<div ref={countdownRef} className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600 rounded-xl sm:rounded-2xl">
						<Timer01Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
						<span className="text-white text-sm sm:text-base font-medium">{t("urgency.title")}</span>
						<span className="text-xl sm:text-2xl font-bold text-primary">{daysLeft}</span>
						<span className="text-gray-400 text-xs sm:text-sm">{t("urgency.days_left")}</span>
						<span className="text-white text-sm sm:text-base font-medium">•</span>
						<span className="text-xl sm:text-2xl font-bold text-primary">{hoursLeft}</span>
						<span className="text-gray-400 text-xs sm:text-sm">h</span>
						<span className="text-white text-sm sm:text-base font-medium">•</span>
						<span className="text-xl sm:text-2xl font-bold text-primary">{minutesLeft}</span>
						<span className="text-gray-400 text-xs sm:text-sm">m</span>
					</div>
				</motion.div>

				{/* CTA Button */}
				<div ref={ctaRef}>
					<motion.div
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						<Button
							intent="primary"
							size="large"
							className="text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-300 shadow-lg shadow-primary/25"
						>
							<span className="flex items-center gap-2 sm:gap-3">
								<Mail01Icon className="w-5 h-5 sm:w-6 sm:h-6" />
								{t("cta.button")}
								<ArrowRight01Icon className="w-4 h-4 sm:w-5 sm:h-5" />
							</span>
						</Button>
					</motion.div>
				</div>

				{/* Description */}
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 2 }}
					className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mt-8 sm:mt-10 px-4"
				>
					{t("description")}
				</motion.p>
			</div>
		</div>
	);
};

// Beautiful Features List Component
const FeaturesList: React.FC = () => {
	const t = useTranslations("content.promo");
	const sectionRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	
	const features = [
		{ 
			icon: GlobeIcon, 
			text: t("features.domain"), 
			color: "from-blue-500 to-cyan-500",
		},
		{ 
			icon: Shield01Icon, 
			text: t("features.ssl"), 
			color: "from-green-500 to-emerald-500",
		},
		{ 
			icon: Rocket01Icon, 
			text: t("features.speed"), 
			color: "from-orange-500 to-red-500",
		},
		{ 
			icon: Edit01Icon, 
			text: t("features.revisions"), 
			color: "from-indigo-500 to-blue-500",
		},
	];

	useEffect(() => {
		if (!listRef.current) return;

		const items = listRef.current.querySelectorAll('.feature-item');
		
		// Beautiful initial setup
		gsap.set(items, {
			opacity: 0,
			x: -50,
		});

		// Beautiful stagger animation
		gsap.to(items, {
			opacity: 1,
			x: 0,
			duration: 0.6,
			ease: "power2.out",
			stagger: 0.1,
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top 80%",
			}
		});
	}, []);

	return (
		<div ref={sectionRef} className="py-12 sm:py-16 md:py-20 px-4 cursor-target">
			<div className="max-w-4xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12 sm:mb-16 cursor-target"
				>
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
						{t("highlight.title")}
					</h2>
					<ShinyText 
						text={t("highlight.description")}
						speed={4}
						className="text-sm sm:text-base text-gray-400"
					/>
				</motion.div>

				<div ref={listRef} className="space-y-4">
					{features.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<div
								key={index}
								className="feature-item group cursor-target relative p-4 sm:p-6 bg-slate-800/20 border border-slate-700/30 rounded-xl hover:bg-slate-800/40 hover:border-primary/50 transition-all duration-300"
							>
								<div className="flex items-center gap-4">
									<div 
										className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${feature.color} group-hover:scale-105 transition-transform duration-300`}
									>
										<Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
									</div>
									<span className="text-gray-300 text-base sm:text-lg group-hover:text-white transition-colors duration-300 font-medium">
										{feature.text}
									</span>
									<div className="ml-auto">
										<CircleIcon className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

// Beautiful Stats Component with Special Talentix Card
const StatsSection: React.FC = () => {
	const t = useTranslations("content.promo");
	const stats = [
		{ number: "100%", label: "Responsive", icon: GlobeIcon },
		{ number: "24/7", label: "Soporte", icon: Shield01Icon },
		{ number: "5", label: "Páginas", icon: DomeIcon },
	];

	const sectionRef = useRef<HTMLDivElement>(null);
	const statsRef = useRef<HTMLDivElement>(null);
	const specialCardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!statsRef.current) return;

		const statElements = statsRef.current.querySelectorAll('.stat-item');
		
		gsap.set(statElements, {
			opacity: 0,
			y: 50,
			scale: 0.8,
		});

		gsap.to(statElements, {
			opacity: 1,
			y: 0,
			scale: 1,
			duration: 0.8,
			ease: "back.out(1.7)",
			stagger: 0.2,
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top 80%",
			}
		});

		// Special card animation
		if (specialCardRef.current) {
			gsap.set(specialCardRef.current, {
				opacity: 0,
				scale: 0.5,
				rotation: -15,
			});

			gsap.to(specialCardRef.current, {
				opacity: 1,
				scale: 1,
				rotation: 0,
				duration: 1,
				ease: "elastic.out(1, 0.3)",
				delay: 0.5,
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
				}
			});
		}
	}, []);

	return (
		<div ref={sectionRef} className="py-16 sm:py-20 px-4 relative overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900" />
			
			<div className="max-w-6xl mx-auto relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16 sm:mb-20"
				>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
						<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
							Estadísticas
						</span>
						<br />
						<span className="text-white">que Importan</span>
					</h2>
					<ShinyText 
						text="Números que respaldan nuestra calidad" 
						speed={3}
						className="text-lg sm:text-xl text-gray-300"
					/>
				</motion.div>

				<div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
					{stats.map((stat, index) => {
						const Icon = stat.icon;
						return (
							<div
								key={index}
								className="stat-item group text-center p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
							>
								<div className="mb-4">
									<div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-gradient-to-r from-primary to-accent group-hover:scale-110 transition-transform duration-300 shadow-lg">
										<Icon className="w-8 h-8 text-white" />
									</div>
								</div>
								<div className="text-3xl sm:text-4xl font-bold text-primary mb-2 group-hover:scale-105 transition-transform duration-300">
									{stat.number}
								</div>
								<div className="text-gray-300 text-base sm:text-lg font-medium">
									{stat.label}
								</div>
							</div>
						);
					})}
				</div>

				{/* Special Talentix Card with Primary Background */}
				<div ref={specialCardRef} className="max-w-2xl mx-auto">
					<div className="relative p-8 sm:p-12 bg-gradient-to-br from-primary to-accent rounded-3xl shadow-2xl overflow-hidden group cursor-target">
						{/* Background Pattern */}
						<div className="absolute inset-0 opacity-10">
							<div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl" />
							<div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full blur-2xl" />
						</div>
						
						{/* Content */}
						<div className="relative z-10 text-center">
							{/* Talentix Logo */}
							<div className="mb-6">
								<div className="w-20 h-20 mx-auto bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
									<TalentixBrandIcon className="w-12 h-12 text-white" />
								</div>
							</div>
							
							<h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:scale-105 transition-transform duration-300">
								{t("pricing.price")}
							</h3>
							
							<div className="flex items-center justify-center gap-3 mb-6">
								<span className="text-white/70 line-through text-lg">
									{t("pricing.original_price")}
								</span>
								<span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
									{t("pricing.discount")}
								</span>
							</div>
							
							<p className="text-white/90 text-base sm:text-lg mb-8 leading-relaxed">
								{t("description")}
							</p>
							
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Button
									intent="secondary"
									size="large"
									className="text-lg px-8 py-4 rounded-2xl bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300"
								>
									<span className="flex items-center gap-3">
										<Mail01Icon className="w-5 h-5" />
										{t("cta.button")}
										<ArrowRight01Icon className="w-4 h-4" />
									</span>
								</Button>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// Beautiful Pages Timeline Component
const PagesTimeline: React.FC = () => {
	const t = useTranslations("content.promo");
	const pages = [
		{
			icon: DomeIcon,
			title: t("pages.home.title"),
			description: t("pages.home.description"),
			step: "01"
		},
		{
			icon: UserIcon,
			title: t("pages.about.title"),
			description: t("pages.about.description"),
			step: "02"
		},
		{
			icon: Briefcase01Icon,
			title: t("pages.portfolio.title"),
			description: t("pages.portfolio.description"),
			step: "03"
		},
		{
			icon: Mail01Icon,
			title: t("pages.contact.title"),
			description: t("pages.contact.description"),
			step: "04"
		},
	];

	const sectionRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!timelineRef.current) return;

		const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
		
		gsap.set(timelineItems, {
			opacity: 0,
			x: -100,
		});

		gsap.to(timelineItems, {
			opacity: 1,
			x: 0,
			duration: 0.8,
			ease: "power2.out",
			stagger: 0.3,
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top 80%",
			}
		});
	}, []);

	return (
		<div ref={sectionRef} className="py-16 sm:py-20 px-4 relative overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black" />
			
			<div className="max-w-5xl mx-auto relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16 sm:mb-20"
				>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
						<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
							{t("pages.title")}
						</span>
					</h2>
					<ShinyText 
						text="Cada página diseñada para convertir visitantes en clientes" 
						speed={3}
						className="text-lg sm:text-xl text-gray-300"
					/>
				</motion.div>

				<div ref={timelineRef} className="space-y-8">
					{pages.map((page, index) => {
						const Icon = page.icon;
						return (
							<div
								key={index}
								className="timeline-item group relative p-6 sm:p-8 bg-slate-800/20 border border-slate-700/30 rounded-2xl hover:bg-slate-800/40 hover:border-primary/50 transition-all duration-300"
							>
								<div className="flex items-start gap-6">
									<div className="flex-shrink-0">
										<div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r from-primary to-accent group-hover:scale-110 transition-transform duration-300 shadow-lg">
											<Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
										</div>
									</div>
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<span className="text-sm sm:text-base font-bold text-primary bg-primary/20 px-2 py-1 rounded">
												{page.step}
											</span>
											<h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
												{page.title}
											</h3>
										</div>
										<p className="text-gray-300 text-sm sm:text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
											{page.description}
										</p>
									</div>
									{index < pages.length - 1 && (
										<div className="absolute left-6 sm:left-8 top-full w-0.5 h-8 bg-gradient-to-b from-primary to-transparent" />
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

const PromotionPage: React.FC = () => {
	const t = useTranslations("content.promo");
	const featuresRef = useRef<HTMLDivElement>(null);

	return (
		<main className="min-h-screen overflow-hidden relative bg-black text-white">
			{/* Hero Section with PixelTrail */}
			<AmazingHero />

			{/* Features List Section with Cursor */}
			<TargetCursor 
				spinDuration={3}
				hideDefaultCursor={true}
				containerRef={featuresRef}
			/>
			<div ref={featuresRef}>
				<FeaturesList />
			</div>

			{/* Stats Section with Special Talentix Card */}
			<StatsSection />

			{/* Pages Timeline Section */}
			<PagesTimeline />

			{/* Footer */}
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				className="text-center py-8 sm:py-12"
			>
				<div className="inline-flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
					<TalentixBrandIcon className="w-4 h-4 sm:w-5 sm:h-5" />
					<span>Powered by Talentix</span>
				</div>
			</motion.div>
		</main>
	);
};

export default PromotionPage;
