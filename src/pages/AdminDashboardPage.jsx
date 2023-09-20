import React, { useEffect, useState } from "react";
import MkdSDK from "../utils/MkdSDK";
import { ReactSortable } from "react-sortablejs";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router";

const AdminDashboardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState([]);
  const [totalVideos, setTotalVideos] = useState(0);
  const videosPerPage = 10; 
  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();


const fetchVideos = async (page) => {
  try {
    const sdk = new MkdSDK();

    const response = await sdk.callRestAPI(
      {
        payload: {},
        page: page,
        limit: videosPerPage,
      },
      "PAGINATE"
    );

    setVideos(response.list);
    setTotalVideos(response.total);
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
};
const handleNextPage = () => {
  if (currentPage < Math.ceil(totalVideos / videosPerPage)) {
    setCurrentPage(currentPage + 1);
  }
};


const handlePrevPage = () => {
  if (currentPage > 0) {
    setCurrentPage(currentPage - 1);
  }
};

const Logout = () => {
  dispatch({
    type: 'LOGOUT'
  })
  navigate('/admin/login')
};

useEffect(() => {
  fetchVideos(currentPage);
}, [currentPage]);


  return (
    <>
      <div className="w-full text-gray-700 px-4 sm:px-12 md:px-[113px] text-textPrimary font-[MontserratThin]">

        <header className="flex justify-between items-center pt-[43px]">
          <div>
            <h1 className="text-4xl font-[ClashDisplayBold]">APP</h1>
          </div>
          <div>
            <button onClick={()=>Logout()} className="bg-bgSecondary py-2 px-5 text-xs rounded-2xl text-textSecondary">Logout</button>
          </div>
        </header>

        <main className="py-32">
          <div className="py-[20px] flex justify-between items-center">
            <div><h2 className="text-[40px]">Today's Leaderboard</h2></div>

            <div className="text-[14px] flex items-center bg-bgTertiary2 rounded-[8px] py-3 px-6">
              <p className="mx-2 ">30 May 2022</p>
              <p className="mx-2 w-1 h-1 rounded-full bg-bgTertiary"></p>
              <p className="mx-2 rounded-[6px] bg-bgSecondary text-textSecondary py-[4px] px-[10px] text-[11px] mr-2">Submissions Open</p>
              <p className="mx-2 w-1 h-1 rounded-full bg-bgTertiary"></p>
              <p className="mx-2 ">11:34</p>
            </div>
          </div>

        <table className="w-full border-1 w-full">
          <thead>
            <tr>
              <td className="py-[16px]">#</td>
              <td>Title</td>
              <td>Author</td>
              <td className="break-keep">Most Liked</td>
            </tr>
          </thead>

            <ReactSortable tag="tbody" list={videos} setList={setVideos} handle='#handler'>
              {
              videos.map((video,i)=>{
                return(
                  <tr id="handler" key={i} className="mt-4 border-[0.1px] border-spacing-y-3 border-collapse rounded-[16px] border-textPrimary py-[16px] px-[18px]">
                    <td className="py-[16px] px-[18px]">{video.id}</td>
                    <td className="py-[16px] px-[18px] flex items-center rounded-xl">
                      <img className="w-[118px] min-w-[118px] h-[64px] mr-3 rounded-[8px]" src={video.photo} alt={video.username} loading="lazy"/>
                      <p>{video.title}</p>
                     
                    </td>
                    <td className="py-[16px] px-[18px]">{video.username}</td>
                    <td className="py-[16px] px-[18px]">{video.like}</td>
                  </tr>
                )
              })
            }
            </ReactSortable>
        </table>

        <div className="w-full flex justify-between py-5">
          {currentPage > 0 && (
            <button onClick={handlePrevPage} className="bg-bgSecondary py-4 px-10 text-xs rounded-md text-textSecondary font-[MontserratRegular]">Previous
            </button>
          )}

          {currentPage < Math.ceil(totalVideos / videosPerPage) && (
            <button onClick={handleNextPage} className="bg-bgSecondary py-4 px-10 text-xs rounded-md text-textSecondary font-[MontserratRegular]">Next</button>
          )}
        </div>

        </main>

      </div>


    </>
  );
};

export default AdminDashboardPage;
