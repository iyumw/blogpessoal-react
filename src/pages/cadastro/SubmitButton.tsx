import { Puff } from "react-loader-spinner";

interface SubmitButtonProps {
  isLoading: boolean;
  text: string;
}

export function SubmitButton({ isLoading, text }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="rounded-lg bg-blush-100 hover:bg-blush-50 text-white font-bold py-3 w-full transition-colors flex items-center justify-center"
      disabled={isLoading}
    >
      {isLoading ? (
        <Puff
          height="24"
          width="24"
          color="#ffffff"
          ariaLabel="puff-loading"
        />
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
}