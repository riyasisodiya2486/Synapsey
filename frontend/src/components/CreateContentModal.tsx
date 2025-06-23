import { CrossIcon } from "../icons/CrossIcon";
import { BACKEND_URL } from "../pages/config";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import axios from "axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Instagram = "instagram"
}

export function CreateContentModal({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      { link, title, type },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white text-black rounded-xl shadow-lg w-full max-w-md p-6 relative">

        <div className="absolute top-4 right-4 cursor-pointer" onClick={onClose}>
          <CrossIcon />
        </div>

        <div className="space-y-4 mb-6">
          <Input reference={titleRef} placeholder="Title" />
          <Input reference={linkRef} placeholder="Link" />
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-2 text-gray-700">Type</h2>
          <div className="flex gap-3">
            <Button
              text="YouTube"
              variant={type === ContentType.Youtube ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Youtube)}
            />
            <Button
              text="Twitter"
              variant={type === ContentType.Twitter ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Twitter)}
            />
            <Button
              text="Instagram"
              variant={type === ContentType.Instagram ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Instagram)}
            />
          </div>
        </div>

        <div className="text-right">
          <Button onClick={addContent} variant="primary" text="Submit" />
        </div>
      </div>
    </div>
  );
}
