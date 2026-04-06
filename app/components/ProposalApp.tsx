"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

type Screen = "main" | "no-response" | "last-chance" | "yes";

const NO_RESPONSES = [
  { message: "Noooo wait!! 🥺",                         subtext: "I will take you here! 🏔️",                         image: "/Rishikesh.jpeg",      imageAlt: "Rishikesh" },
  { message: "Are you sureeee?? 😢",                     subtext: "I will take you on long drives, forever! 🚗🌅",     image: "/LongDrive.jpeg",      imageAlt: "Long Drive together" },
  { message: "Please reconsider!! 🍦",                   subtext: "I will get you Gelatos everytime you ask me 🥹",    image: "/Gelato.jpeg",         imageAlt: "Gelato date" },
  {
    message: "खोया रहूं याद तेरी कर के नादानियां",
    subtext: "बटुए में रखूं तेरी सांभ के निशानियां 🥹",
    image: "/WalletPicture.jpeg",
    imageAlt: "Wallet picture",
  },
  { message: "Okay but what about our coffee dates? ☕",  subtext: "Every single morning, coffee with you 🌸",          image: "/Cofee.jpeg",          imageAlt: "Coffee together" },
  { message: "But what about these vacations!! 🐯",      subtext: "Am I not your favorite vacation partner? 🌿",       image: "/jimCorbett.jpeg",     imageAlt: "Jim Corbett adventure" },
  { message: "Just see how happy you are with me 🌿",    subtext: "You, me, and countless pictures of you posing 💕",  image: "/OldEngland.jpeg",     imageAlt: "Old England" },
  { message: "Seeeeee, lazy mornings and happy youuu ✨", subtext: "Every corner of this world, with you 🌍",           image: "/bohemiaPicture.jpeg", imageAlt: "Bohemia together" },
];

const ALL_IMAGES = [...NO_RESPONSES.map((r) => r.image), "/GzbHome.jpeg"];

const FLOATING_HEARTS = ["💕", "🌸", "✨", "💖", "🌺", "💗", "🌷", "💝", "⭐", "🦋"];

export default function ProposalApp() {
  const [screen, setScreen] = useState<Screen>("main");
  const [noCount, setNoCount] = useState(0);

  const [showConfetti, setShowConfetti] = useState(false);


  const handleYes = useCallback(() => {
    setScreen("yes");
    setShowConfetti(true);
  }, []);

  const handleNo = useCallback(() => {
    const next = noCount + 1;
    setNoCount(next);
    if (next >= NO_RESPONSES.length) {
      setScreen("last-chance");
    } else {
      setScreen("no-response");
    }
  }, [noCount]);

  const currentResponse = NO_RESPONSES[Math.min(noCount, NO_RESPONSES.length - 1)];

  // Background image for current screen
  const bgImage =
    screen === "no-response" ? currentResponse.image :
    screen === "yes" ? "/GzbHome.jpeg" :
    null;

  return (
    <div className={`relative min-h-dvh flex justify-center overflow-hidden ${currentResponse.image === "/WalletPicture.jpeg" && screen === "no-response" ? "items-start" : "items-end"}`}>
      {/* Preload all images silently so there's no lag on first show */}
      <div className="hidden" aria-hidden>
        {ALL_IMAGES.map((src) => (
          <Image key={src} src={src} alt="" fill priority sizes="1px" />
        ))}
      </div>

      {/* ── BACKGROUND ── */}
      {bgImage ? (
        <>
          {/* blurred fill so no black bars */}
          <Image
            src={bgImage}
            alt=""
            fill
            className="object-cover object-center scale-110 blur-lg"
            priority
            aria-hidden
          />
          {/* sharp full image on top, contained */}
          <Image
            src={bgImage}
            alt="background"
            fill
            className="object-contain"
            priority
          />
          {/* overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-fuchsia-100" />
      )}

      {/* Floating hearts — only on non-image screens */}
      {!bgImage && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {FLOATING_HEARTS.map((heart, i) => (
            <span
              key={i}
              className="absolute opacity-40 animate-float"
              style={{
                left: `${(i * 10 + 5) % 100}%`,
                top: `${(i * 13 + 8) % 100}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${4 + (i % 4)}s`,
                fontSize: `${1.2 + (i % 3) * 0.5}rem`,
              }}
            >
              {heart}
            </span>
          ))}
        </div>
      )}

      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-xl animate-confetti"
              style={{
                left: `${(i * 2.5) % 100}%`,
                top: "-10%",
                animationDelay: `${(i * 0.1) % 2}s`,
                animationDuration: `${2 + (i % 3)}s`,
              }}
            >
              {["💍", "💖", "🌸", "✨", "💕", "🎉", "🥂", "💐", "🌷", "🦋"][i % 10]}
            </span>
          ))}
        </div>
      )}

      {/* ── CONTENT (anchored to bottom so image is visible above, top for wallet) ── */}
      <div className={`relative z-10 w-full max-w-sm px-4 ${currentResponse.image === "/WalletPicture.jpeg" && screen === "no-response" ? "pt-10" : "pb-10"}`}>

        {/* ── MAIN SCREEN ── */}
        {screen === "main" && (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="text-7xl animate-bounce-slow drop-shadow-lg select-none">🧸</div>

            <div className="bg-white/70 backdrop-blur-sm rounded-3xl px-6 py-5 shadow-xl border border-pink-200 w-full">
              <p className="font-dancing text-xl text-rose-400 mb-1">A question from the heart...</p>
              <h1 className="font-dancing text-4xl font-bold text-rose-600 leading-tight">
                Will you marry me? 💍
              </h1>
            </div>

            <div className="relative flex items-center justify-center gap-6 w-full min-h-[72px]">
              <button
                onClick={handleYes}
                className="font-nunito font-bold text-xl px-10 py-4 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg hover:scale-110 transition-all duration-200 active:scale-95"
              >
                Yes! 💕
              </button>
              <button
                onClick={handleNo}
                className="font-nunito font-semibold text-lg px-7 py-3 rounded-full bg-white/80 text-rose-400 border-2 border-rose-200 shadow hover:bg-rose-50 active:scale-95 select-none"
              >
                No 🙈
              </button>
            </div>
          </div>
        )}

        {/* ── NO RESPONSE SCREEN ── */}
        {screen === "no-response" && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="text-5xl animate-wiggle select-none">🧸</div>

            <div className="bg-white/20 backdrop-blur-md rounded-3xl px-5 py-4 shadow-xl border border-white/40 w-full">
              <p className="font-dancing text-2xl font-bold text-white drop-shadow mb-1">
                {currentResponse.message}
              </p>
              <p className="font-nunito text-white/90 text-base drop-shadow">
                {currentResponse.subtext}
              </p>
            </div>

            <div className="relative flex items-center justify-center gap-6 w-full min-h-[72px]">
              <button
                onClick={handleYes}
                className="font-nunito font-bold text-xl px-10 py-4 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg hover:scale-110 transition-all duration-200 active:scale-95"
              >
                Yes! 💕
              </button>
              <button
                onClick={handleNo}
                className="font-nunito font-semibold text-lg px-7 py-3 rounded-full bg-white/30 backdrop-blur-sm text-white border-2 border-white/50 shadow hover:bg-white/40 active:scale-95 select-none"
              >
                No 🙈
              </button>
            </div>
          </div>
        )}

        {/* ── LAST CHANCE SCREEN ── */}
        {screen === "last-chance" && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="text-5xl animate-wiggle select-none">🥺🧸🥺</div>

            <div className="bg-white/70 backdrop-blur-sm rounded-3xl px-5 py-4 shadow-xl border border-pink-200 w-full">
              <p className="font-dancing text-2xl font-bold text-rose-600 mb-1">
                Okay... I&apos;m all out of reasons 😭
              </p>
              <p className="font-nunito text-rose-400 text-base">
                But just know, I love you more than anything 💕
              </p>
              <p className="font-dancing text-xl text-rose-500 mt-2">
                So please, please, please...
              </p>
            </div>

            <p className="font-dancing text-rose-500 text-xl animate-pulse font-bold">
              Will you marry me? 💍
            </p>

            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={handleYes}
                className="font-nunito font-bold text-xl px-10 py-4 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg hover:scale-110 transition-all duration-200 active:scale-95"
              >
                Yes! 💍
              </button>
              <button
                onClick={handleYes}
                className="font-nunito font-bold text-xl px-10 py-4 rounded-full bg-gradient-to-r from-fuchsia-400 to-rose-400 text-white shadow-lg hover:scale-110 transition-all duration-200 active:scale-95"
              >
                Yes!! 💖
              </button>
            </div>
          </div>
        )}

        {/* ── YES SCREEN ── */}
        {screen === "yes" && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="text-5xl select-none animate-bounce-slow">🧸💍🧸</div>

            <div className="bg-white/20 backdrop-blur-md rounded-3xl px-6 py-5 shadow-2xl border border-white/40 w-full">
              <p className="font-dancing text-xl text-white/80 mb-1">She said...</p>
              <h1 className="font-dancing text-5xl font-bold text-white drop-shadow-lg leading-tight">
                YES!! 🎉💍
              </h1>
              <p className="font-nunito text-white/90 text-base mt-3 leading-relaxed drop-shadow">
                You just made me the happiest person in the whole world 🥹
              </p>
              <p className="font-dancing text-xl text-white/80 mt-2">
                Forever starts now... 🌸
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
