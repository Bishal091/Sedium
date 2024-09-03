import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string; // Change this to string
  id: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  const dateToDisplay = publishedDate
    ? new Date(publishedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown Date";

  return (
    <Link to={`/blog/${id}`}>
      <div className="px-4 border-b mb-[2vh] rounded-md  bg-[#f1f4f1]  border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer hover:shadow-lg transition-shadow duration-300">
       
        <div className="text-2xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
        <div className="text-slate-700 text-sm font-thin pt-4 mb-[3vh]">

          {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
        <div className="flex items-center justify-end"  >
          <Avatar name={authorName} />
          <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            {dateToDisplay}
          </div>
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({ name, size = "small" }: { name: string; size?: "small" | "big" }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-600 rounded-full ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span className={`${size === "small" ? "text-md" : "text-lg"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
      </span>
    </div>
  );
}