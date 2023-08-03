import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { getUniversities } from "../services/api.services";
// import { UniversityModel } from "../models/University.model";
import { UniversitiesLists } from "../components/UniversitiesLists";
import { UniversityModel } from "../models/University.model";


export const Profile = () => {
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
        <div className="">
          <h1 className="text-4xl font-extrabold m-3 text-sky-500">
            My favorites
          </h1>
          <UniversitiesLists selected={selected} universities={universities}/>
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
