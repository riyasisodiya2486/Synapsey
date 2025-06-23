import { useEffect, useState } from "react"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { Button } from "../components/Button"
import { PlusIcon } from "../icons/PlusIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import { ShareIcon } from "../icons/ShareIcon"
import { BACKEND_URL } from "./config"
import axios from "axios"
import { Search } from "../components/Search"
import dashboardbg from "../assets/dashboardbg.jpg"
import { useRef } from "react"

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const {contents, refresh} = useContent();
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(()=>{
    refresh();
  }, [modalOpen, refresh])

  return (
    <div className="relative min-h-screen  text-white overflow-x-hidden ">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
         <img src={dashboardbg} alt="bg" className="h-screen w-full"/>
      </div>
      <Sidebar />

      <div className="ml-64 px-6 py-6">
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)}/>
        {/* header  */}
        <div className="flex  flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <span className="text-3xl sm:text-4xl font-semibold ">
            All Notes
          </span>
          {/* SearchBar  */}
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          {/* Buttons  */}
          <div className="flex gap-3 flex-wrap">
            <Button
              onClick={() => setModalOpen(true)}
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
            />
            <Button
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  { share: true },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                alert(shareUrl);
              }}
              variant="secondary"
              text="Share Brain"
              startIcon={<ShareIcon />}
            />
          </div>
        </div>


        <div className="flex flex-wrap gap-6 justify-start">
          {contents
            .filter((item: any) =>
              item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.type.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((props: any) => (
              <Card
                id={props._id}
                key={props._id}
                type={props.type}
                link={props.link}
                title={props.title}
                onDelete={async () => {
                  const confirmDelete = window.confirm("Are you sure you want to delete this content?");
                  if (!confirmDelete) return;

                  try {
                    await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                      data: { id: props._id },
                      headers: {
                        Authorization: localStorage.getItem("token"),
                      },
                    });
                    refresh();
                  } catch (err) {
                    alert("Failed to delete content.");
                    console.error(err);
                  }
                }}
              />
            ))}
        </div>

      </div>
    </div>
  );
}
