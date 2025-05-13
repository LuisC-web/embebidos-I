import React, { useState } from "react";
import { Joystick } from "react-joystick-component";
import type { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import View3D from "./View3D";

const BASE_COLOR = "#858B94";
const STICK_COLOR = "#C5A35E";

const JoyStick: React.FC = () => {
  // Estados de posición
  const [posLeft, setPosLeft] = useState({ x: 0, y: 0 });
  const [posRight, setPosRight] = useState({ x: 0, y: 0 });
  // Estados para 'disabled' tras soltar
  const [disabledLeft, setDisabledLeft] = useState(false);
  const [disabledRight, setDisabledRight] = useState(false);

  // Handlers izquierdo
  const handleMoveLeft = (e: IJoystickUpdateEvent) => {
    setPosLeft({ x: e.x ?? 0, y: e.y ?? 0 });
  };
  const handleStopLeft = () => {
    // Al soltar, reseteamos y deshabilitamos para forzar pos
    setPosLeft({ x: 0, y: 0 });
    setDisabledLeft(true);
  };

  // Handlers derecho
  const handleMoveRight = (e: IJoystickUpdateEvent) => {
    setPosRight({ x: e.x ?? 0, y: e.y ?? 0 });
  };
  const handleStopRight = () => {
    setPosRight({ x: 0, y: 0 });
    setDisabledRight(true);
  };

  return (
    <div className="flex flex-col justify-evenly items-center w-full h-screen">
      <div className="">
        <View3D />
      </div>
      <div className="flex justify-evenly items-center w-full mt-6">
        <Joystick
          size={100}
          baseColor={BASE_COLOR}
          stickColor={STICK_COLOR}
          move={handleMoveLeft}
          stop={handleStopLeft}
          pos={posLeft}
          disabled={disabledLeft}
        />
        <Joystick
          size={100}
          baseColor={BASE_COLOR}
          stickColor={STICK_COLOR}
          move={handleMoveRight}
          stop={handleStopRight}
          pos={posRight}
          disabled={disabledRight}
        />
      </div>
    </div>
  );
};

export default JoyStick;
