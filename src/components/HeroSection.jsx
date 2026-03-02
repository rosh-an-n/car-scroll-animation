"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const basePath = process.env.NODE_ENV === "production" ? "/car-scroll-animation" : "";
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const sectionRef = useRef(null);
    const carRef = useRef(null);
    const trailRef = useRef(null);
    const valueTextRef = useRef(null);

    useEffect(() => {
        const car = carRef.current;
        const trail = trailRef.current;
        const valueAdd = valueTextRef.current;
        if (!car || !trail || !valueAdd) return;

        const letters = gsap.utils.toArray(".value-letter");
        const valueRect = valueAdd.getBoundingClientRect();
        const letterOffsets = letters.map(l => l.offsetLeft);
        const roadWidth = window.innerWidth;
        const carWidth = 150;
        const endX = roadWidth - carWidth;

        // intro animation on page load
        gsap.from(car, { opacity: 0, x: -50, duration: 1, ease: "power2.out" });
        gsap.from(".road", { scaleX: 0.8, opacity: 0, duration: 0.8, ease: "power2.out" });
        gsap.from(".text-box", {
            opacity: 0, y: 30, duration: 0.6,
            stagger: 0.15, delay: 0.5, ease: "power2.out"
        });

        // scroll animation
        const tween = gsap.to(car, {
            scrollTrigger: {
                trigger: ".section",
                start: "top top",
                end: "bottom top",
                scrub: true,
                pin: ".track",
            },
            x: endX,
            ease: "none",
            onUpdate: function () {
                const carX = gsap.getProperty(car, "x") + carWidth / 2;
                letters.forEach((letter, i) => {
                    const letterX = valueRect.left + letterOffsets[i];
                    letter.style.opacity = carX >= letterX ? 1 : 0;
                });
                gsap.set(trail, { width: carX });
            },
        });

        gsap.to("#box1", {
            scrollTrigger: { trigger: ".section", start: "top+=400 top", end: "top+=600 top", scrub: true },
            opacity: 1,
        });
        gsap.to("#box2", {
            scrollTrigger: { trigger: ".section", start: "top+=600 top", end: "top+=800 top", scrub: true },
            opacity: 1,
        });
        gsap.to("#box3", {
            scrollTrigger: { trigger: ".section", start: "top+=800 top", end: "top+=1000 top", scrub: true },
            opacity: 1,
        });
        gsap.to("#box4", {
            scrollTrigger: { trigger: ".section", start: "top+=1000 top", end: "top+=1200 top", scrub: true },
            opacity: 1,
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            tween.kill();
        };
    }, []);

    return (
        <div ref={sectionRef} className="section">
            <div className="track">
                <div className="road" id="road">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img ref={carRef} src={`${basePath}/car-top.png`} alt="car" className="car" id="car" />
                    <div ref={trailRef} className="trail" id="trail"></div>
                    <div ref={valueTextRef} className="value-add" id="valueText" style={{ top: "30%" }}>
                        <span className="value-letter">W</span>
                        <span className="value-letter">E</span>
                        <span className="value-letter">L</span>
                        <span className="value-letter">C</span>
                        <span className="value-letter">O</span>
                        <span className="value-letter">M</span>
                        <span className="value-letter">E</span>
                        <span className="value-letter">&nbsp;</span>
                        <span className="value-letter">I</span>
                        <span className="value-letter">T</span>
                        <span className="value-letter">Z</span>
                        <span className="value-letter">F</span>
                        <span className="value-letter">I</span>
                        <span className="value-letter">Z</span>
                        <span className="value-letter">Z</span>
                    </div>
                </div>
                <div className="text-box" id="box1" style={{ top: "5%", right: "30%" }}>
                    <span className="num-box">58%</span> Increase in pick up point use
                </div>
                <div className="text-box" id="box2" style={{ bottom: "5%", right: "35%" }}>
                    <span className="num-box">23%</span> Decreased in customer phone calls
                </div>
                <div className="text-box" id="box3" style={{ top: "5%", right: "10%" }}>
                    <span className="num-box">27%</span> Increase in pick up point use
                </div>
                <div className="text-box" id="box4" style={{ bottom: "5%", right: "12.5%" }}>
                    <span className="num-box">40%</span> Decreased in customer phone calls
                </div>
            </div>
        </div>
    );
}
