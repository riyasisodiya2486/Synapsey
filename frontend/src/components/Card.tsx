import { useEffect, useRef } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { InstagramIcon } from "../icons/InstagramIcon";

interface CardProps {
  id: string,
  title: string;
  link: string;
  type: "twitter" | "youtube" | "instagram";
  onDelete?: () => void;
}

export function Card(props: CardProps) {
  const tweetRef = useRef<HTMLDivElement>(null);
   const TypeIcon =
    props.type === "youtube"
      ? <YoutubeIcon />
      : props.type === "instagram"
      ? <InstagramIcon />
      : <TwitterIcon />;

  useEffect(() => {
    if (props.type === "twitter" && (window as any).twttr?.widgets && tweetRef.current) {
      (window as any).twttr.widgets.load(tweetRef.current);
    }

     if (props.type === "instagram" && (window as any).instgrm) {
    (window as any).instgrm.Embeds.process();
  }
  }, [props.link, props.type]);

  return (
    <div className="w- max-h-[430px] shadow-md rounded-lg borde p-4 flex flex-col bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 hover:from-pink-200 hover:via-purple-200 hover:to-blue-200 text-blue-900 transition-all duration-300 border border-blue-200">
     {/* card Header  */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 font-semibold text-gray-800 overflow-hidden whitespace-nowrap text-ellipsis">
          {TypeIcon}
          <span className="max-w-[180px] text-black">{props.title}</span>
        </div>
        <div className="flex gap-2 text-gray-500">
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            <ShareIcon />
          </a>
          <button onClick={props.onDelete} >
            <DeleteIcon />
          </button>
        </div>
      </div>

      {/* Media  */}
      <div className="overflow-hidden flex-grow rounded-md">
        {props.type === "youtube" && (
          <iframe
            className="w-full aspect-video rounded-md"
            src={props.link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {props.type === "instagram" && (
          <div className="overflow-y-auto max-h-[300px] px-1  scrollbar-thumb-gray-200 scrollbar-transparent overflow-x-hidden rounded-md" ref={tweetRef}>
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={props.link}
              data-instgrm-version="14"
              style={{
                background: "#FFF",
                border: 0,
                borderRadius: 3,
                boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
                margin: "1px auto",
                maxWidth: "540px",
                minWidth: "326px",
                padding: 0,
                width: "99.375%",
              }}
            ></blockquote>
          </div>
        )}

        {props.type === "twitter" && (
          <div
            ref={tweetRef}
            className="overflow-y-auto max-h-[300px] px-1  scrollbar-thumb-gray-200 scrollbar-transparent overflow-x-hidden rounded-md"
          >
            <blockquote className="twitter-tweet">
              <a href={props.link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}
      </div>
    </div>
  );
}
