import { IS_BROWSER } from "$fresh/runtime.ts";

export interface SpinProps {
  value: string;
  result: string;
  /**
   * @format color
   */
  color: string;
}

export interface Props {
  title: string;
  subtitle?: string;
  /**
   * @title Set the roulette values. Max: 8
   */
  spinValues: SpinProps[];
}

export default function SpinWheel({ title, subtitle, spinValues }: Props) {
  function handleSpin() {
    if (IS_BROWSER) {
      const wheel = document.getElementById("wheel")!;
      const spinWheelResult = document.getElementById("spin-wheel-result")!;
      let value = Math.ceil(Math.random() * 3600);

      const completeTurns = Math.floor(value / 360);
      const currentItem = (completeTurns + 1) % 8;

      const stopAngle = currentItem * 45;
      wheel.style.transform = `rotate(${stopAngle + 720}deg)`;

      const spinWheelNumber = document.querySelector(
        `.spin-wheel-number[data-id="${currentItem}"] span`,
      );

      if (!spinWheelNumber) {
        return;
      }

      const stoppedNumber = spinWheelNumber.textContent;

      const couponMap: Record<string, string> = {
        "0": "Opa, não foi dessa vez. Tente novamente mais tarde",
        "50": "CUPOM50",
        "60": "CUPOM60",
        "100": "CUPOM100",
      };

      spinWheelResult.innerText = "Girando...";

      setTimeout(() => {
        if (stoppedNumber) {
          const textReturnned = couponMap[stoppedNumber] ||
            "Opa, não foi dessa vez. Tente novamente mais tarde";
          spinWheelResult.innerText = textReturnned;
        }
      }, 1000);

      value = Math.ceil(Math.random() * 3600);
    }
  }

  return (
    <>
      <label
        for="my_modal_spin"
        class="fixed bottom-24 right-7 z-40 animate-pulse"
      >
        <div class="relative px-5 py-2 font-medium text-white group mt-4 cursor-pointer">
          <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-orange-500 group-hover:bg-orange-700 group-hover:skew-x-12">
          </span>
          <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-orange-700 group-hover:bg-orange-500 group-hover:-skew-x-12">
          </span>
          <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-orange-600 -rotate-12">
          </span>
          <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-orange-400 -rotate-12">
          </span>
          <span class="relative">Girar roleta</span>
        </div>
      </label>

      <input type="checkbox" id="my_modal_spin" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box overflow-hidden">
          <div class="flex flex-col gap-0.5 items-center justify-center">
            <h1 class="text-lg font-bold">{title}</h1>
            {subtitle && <p class="py-4">{subtitle}</p>}

            <div class="w-[400px] h-[400px] relative flex items-center justify-center">
              <div
                onClick={handleSpin}
                class="absolute w-[60px] h-[60px] bg-white rounded-[50%] z-10 flex items-center justify-center font-semibold text-[#333] leading-[0.1em] border-4 border-solid border-[rgba(0,0,0,0.75)] cursor-pointer select-none before:absolute before:-top-[28px] before:w-5 before:h-[30px] before:bg-white before:polygon-clip"
              >
                Girar
              </div>

              <div
                id="wheel"
                class="absolute top-0 left-0 w-full h-full bg-[#333] rounded-[50%] overflow-hidden spin-wheel-shadow transform duration-1000 ease-in-out"
              >
                {spinValues &&
                  spinValues.slice(0, 8).map((item, index) => (
                    <div
                      data-id={index + 1}
                      style={`--i:${index + 1};--clr:${item.color}`}
                      class="absolute w-1/2 h-1/2 spin-wheel-number flex items-center justify-center select-none cursor-pointer"
                    >
                      <span class="relative rotate-45 text-lg text-white shadow-sm after:content-['%'] after:absolute after:text-[0.75em]">
                        {item.value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div class="relative px-5 py-2 font-medium text-white group mt-4">
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-orange-500 group-hover:bg-orange-700 group-hover:skew-x-12">
              </span>
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-orange-700 group-hover:bg-orange-500 group-hover:-skew-x-12">
              </span>
              <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-orange-600 -rotate-12">
              </span>
              <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-orange-400 -rotate-12">
              </span>
              <span id="spin-wheel-result" class="relative">
                Gire para desvendar um cupom
              </span>
            </div>
          </div>
        </div>
        <label class="modal-backdrop" for="my_modal_spin">Close</label>
      </div>
    </>
  );
}
