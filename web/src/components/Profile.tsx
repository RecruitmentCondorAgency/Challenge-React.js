import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { getUniversities } from "../services/api.services";
import { FaExternalLinkAlt, FaStar } from "react-icons/fa";
interface universityInterface {
  name: string;
  location: {
    Country: string;
    City: string;
  };
  description: string;
  isFavorite: boolean;
  website: string;
  currency: string;
  Language: string;
  population: number;
}
export const Profile = () => {
  const [universities, setUniversities] = useState<universityInterface[]>([]);
  const [singleUni, setSingleUni] = useState<universityInterface | null>(null);
  useEffect(() => {
    getUniversities().then((result: universityInterface[]) => {
      setUniversities(result);
    });
  }, []);
  const selected = (element: universityInterface) => {
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
        <div className="">
          <h1 className="text-4xl font-extrabold m-3 text-sky-500">
            My favorites
          </h1>
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
        <div>
          <h1 className="text-4xl font-extrabold m-3 text-sky-500">
            Selected University
          </h1>
          <div className="bg-white shadow-md rounded-md p-4 w-[500px] min-h-[500px]">
            {singleUni ? (
              <div className="my-5">
                <h1 className=" font-bold my-5">
                  <span className="text-xl">{singleUni?.name} </span>
                </h1>
                <p>{singleUni.description}</p>
                <p  className="my-5"> <span>Website </span><span className="text-sky-500 "> {singleUni.website}</span></p>
                <p  className="my-5"> <span>Location </span><span className="text-sky-500 m-3"> {singleUni.location.Country + ' ' + singleUni.location.City}</span></p>
                <p  className="my-5"> <span>Currency </span><span className="m-3"> {singleUni.currency}</span></p>
                <p  className="my-5"> <span>Population </span><span className="m-3"> {singleUni.population}</span></p>
              </div>
            ) : (
              <div className="text-center">No data selected</div>
            )}
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
