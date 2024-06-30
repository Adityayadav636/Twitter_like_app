import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { q, reco } from "../api/users";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import FollowBtn from "./FollowBtn";

function Result({ data, isLoading, isError, error }) {
  if (isLoading) return <Loader />;
  if (isError) return toast.error(error.message);

  return (
    <div className="text-[#d9d9d9] space-y-3 bg-[#202327] rounded-xl w-11/12 xl:w-9/12">
      {data &&
        data.map((user) => (
          <div
            key={user.username} // Ensure each item has a unique key
            className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3237/3237472.png"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="ml-4 leading-5 group">
              <h4 className="font-bold group-hover:underline">
                <Link to={`/${user.username}`}>{user.username}</Link>
              </h4>
              <h5 className="text-gray-500 text-[15px]">@{user.username}</h5>
            </div>
         
          </div>
        ))}
    </div>
  );
}

const Search = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["search", search],
    queryFn: () => {
      if (search) {
        return q(search);
      }
      return { users: [] };
    },
  });

  const { data: recommendedUsers } = useQuery({
    queryKey: ["user"],
    queryFn: reco,
  });

  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
      <div className="sticky top-0 py-1.5 bg-black z-50 w-11/12 xl:w-9/12">
        <div className="flex items-center bg-[#202327] p-3 rounded-full relative">
          <SearchIcon className="text-gray-500 h-5 z-50" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="bg-transparent placeholder-gray-500 outline-none mt-2 text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full focus:outline-none rounded-full focus:shadow-lg"
            placeholder="Search users"
          />
        </div>
      </div>

      {data?.users.length > 0 && (
        <Result data={data.users} isLoading={isLoading} isError={isError} error={error} />
      )}

      <div className="text-[#d9d9d9] space-y-3 bg-[#202327] pt-2 rounded-xl w-11/12 xl:w-9/12">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {/* Map recommended users */}
        {recommendedUsers &&
          recommendedUsers.map((user) => (
            <div
              key={user.username} // Ensure each item has a unique key
              className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3237/3237472.png"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="ml-4 leading-5 group">
                <h4 className="font-bold group-hover:underline">
                  <Link to={`/${user.username}`}>{user.username}</Link>
                </h4>
                <h5 className="text-gray-500 text-[15px]">@{user.username}</h5>
              </div>
              <FollowBtn user={user} page={false} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
