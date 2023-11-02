import type { Props } from "$store/components/ui/PromotionalModal.tsx";

export default function LinkButton({
  button,
  modalCloseExpiredDate,
  setCookieOnCloseModal,
}:
  & Pick<Props, "button">
  & {
    modalCloseExpiredDate: number;
    setCookieOnCloseModal: (
      cookieValue: string,
      expirationSeconds: number,
    ) => void;
  }) {
  function closeModal() {
    if (button.link) {
      window.location.href = button.link;
    }

    setCookieOnCloseModal("closed", modalCloseExpiredDate);
  }

  if (button.variation === "bg-to-br") {
    return (
      <button
        onClick={closeModal}
        class="relative inline-flex items-center justify-start px-5 py-3 overflow-hidden font-bold rounded-full group"
      >
        <span class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]">
        </span>
        <span class="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8">
        </span>
        <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
          {button.label}
        </span>
        <span class="absolute inset-0 border-2 border-white rounded-full">
        </span>
      </button>
    );
  }

  if (button.variation === "bg-to-tr") {
    return (
      <button
        onClick={closeModal}
        class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
      >
        <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0">
        </span>
        <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
          {button.label}
        </span>
      </button>
    );
  }

  if (button.variation === "bg-gradient") {
    return (
      <button
        onClick={closeModal}
        class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
      >
        <span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute">
        </span>
        <span class="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
          <span class="relative text-white">{button.label}</span>
        </span>
      </button>
    );
  }

  if (button.variation === "psychic") {
    return (
      <button
        onClick={closeModal}
        class="relative px-6 py-3 font-bold text-white rounded-lg group"
      >
        <span class="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-purple-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0">
        </span>
        <span class="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-pink-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen">
        </span>
        <span class="relative">{button.label}</span>
      </button>
    );
  }

  return (
    <button
      onClick={closeModal}
      class="relative inline-block px-4 py-2 font-medium group"
    >
      <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0" />
      <span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black" />
      <span class="relative text-black group-hover:text-white">
        {button.label}
      </span>
    </button>
  );
}
