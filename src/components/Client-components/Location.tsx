"use client";

import { useState } from "react";

import Image from "next/image";

import { FaTimes } from "react-icons/fa";

import IconLocation from "../../assets/icon-location.png";

export default function Location() {
  const [location, setLocation] = useState<boolean>(false);
  const showLocation = () => setLocation(!location);

  return (
    <div className="flex items-center gap-2 absolute">
      <Image src={IconLocation} alt="Icone de localização" />

      <a onClick={showLocation}>Selecione uma localização</a>

      {/* <aside>
          <div style={myFont.style} className={myFont.className}>
            <p>Qual a sua localização</p>
            <button>
              <FaTimes onClick={showLocation} />
            </button>
          </div>
        </aside> */}
    </div>
  );
}
