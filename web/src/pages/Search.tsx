import React, { useEffect, useState } from 'react'
import { getUniversities } from '../services/api.services';
import { Navbar } from '../components/Navbar';
import { FaExternalLinkAlt, FaSearch, FaStar } from 'react-icons/fa';
import { UniversityModel } from '../models/University.model';

export const Search = () => {
  const [universities, setUniversities] = useState<UniversityModel[]>([]);
  const [singleUni, setSingleUni] = useState<UniversityModel | null>(null);
  useEffect(() => {
    getUniversities().then((result: UniversityModel[]) => {
      setUniversities(result);
    });
  }, []);
  const selected = (element: UniversityModel) => {
    console.log(element);
    setSingleUni(element);
    return element;
  };
  return (
    <div>
      <Navbar
        items={[
          { path: "/search", name: "Search" },
          { path: "/profile", name: "Profile" },
          { path: "/", name: "Logout" },
        ]}
      />
      <div className="flex justify-center">
        <div className="px-3">
          <div >
            <div className="mt-5 flex justify-center items-centers w-full">
              <div className="flex w-full px-5">
                <input type="text" className="mx-3 w-full border rounded" placeholder="Search" />
                <div className="">
                  <button className="bg-sky-500 text-white p-3 rounded hover:bg-sky-400 focus:outline-none">
                    <FaSearch/>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {universities.map((element, i: number) => {
            return (
              <div key={i} className="m-3">
                <div>
                  <div className="bg-white shadow-md rounded-md p-4 w-[500px]">
                    <h1 className=" font-bold">
                      <span className="text-xl">{element.name} </span>
                      <small className="text-gray-400">
                        {element.location.Country}
                      </small>
                    </h1>
                    <div className="flex justify-between">
                      <span>{element.description.substring(0, 50)}</span>
                      <span className="flex gap-2">
                        <FaStar
                          style={{
                            color: !element.isFavorite
                              ? "rgb(251 191 36)"
                              : "gray",
                          }}
                          className=""
                        />
                        <button onClick={() => selected(element)}>
                          <FaExternalLinkAlt
                            className=""
                            style={{ color: "gray" }}
                          />
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
