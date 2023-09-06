import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LinkCardsProps {
  title: string;
  url: string;
  img: string;
}

const LinkCard = ({ title, url, img }: LinkCardsProps) => {
  const router = useRouter();

  const navigate = () => {
    router.push(url);
  };

  return (
    <div
      onClick={navigate}
      className="grid cursor-pointer hover:scale-105 flex-1 md:max-w-[45%] min-h-[65vh] place-items-center relative h-full rounded hover:rounded-3xl ease-out duration-700 overflow-hidden border-2 border-[var(--dark-electric-blue)] hover:border-[var(--blue)] hover:after:backdrop-blur-[3px] after:w-full after:h-full after:bg-black/60 after:absolute after:z-10 hover:shadow-[0px_0px_30px_1px_rgba(0,255,117,0.3)]"
    >
      <h2 className="text-3xl font-bold text-[var(--light-green)] z-20 card-hover:bg-cyan-400">
        {title}
      </h2>
      <Image
        className="absolute w-full h-full"
        src={img}
        alt={title}
        width={800}
        height={800}
      />
    </div>
  );
};

export default LinkCard;
