import React from 'react'
import { FaExternalLinkAlt, FaStar } from 'react-icons/fa';

export const UniversitiesLists = ({universities, selected}) => {
  return (
    <div>{universities.map((element: any, i: number) => {
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
      })}</div>
  )
}
