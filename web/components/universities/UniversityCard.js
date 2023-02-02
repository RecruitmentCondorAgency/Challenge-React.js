import {ArrowUpRightIcon, CheckCircleIcon, NoSymbolIcon, StarIcon as StarIconSolid} from "@heroicons/react/24/solid";
import {StarIcon} from "@heroicons/react/24/outline";
import {useContext, useState} from "react";
import UserContext from "../../store/user-context";

export default function UniversityCard(
    {
        university,
        starredByDefault = false,
        onStarClick
    }) {
    const userCtx = useContext(UserContext)

    const [starred, setStarred] = useState(starredByDefault)

    const starClickHandler = async () => {
        if (starred) {
            await onStarClick(false, university)
            setStarred(false)
        } else {
            await onStarClick(true, university)
            setStarred(true)
        }
    }

    return (
        <li key={university.domains[0]}>
            <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="truncate">
                        <div className="flex text-sm">
                            <p className="truncate font-medium text-indigo-600">{university.name}</p>
                            <p className="ml-1 flex-shrink-0 font-normal text-gray-500">in {university.country}</p>
                        </div>
                        <div className="mt-2 flex">
                            <div className="flex items-center text-sm text-gray-500">
                                {university.country === 'Mexico' && (
                                    <>
                                        <CheckCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        <p>
                                            Located in the same country as you.
                                        </p>
                                    </>
                                )}
                                {university.country !== 'Mexico' && (
                                    <>
                                        <NoSymbolIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        <p>
                                            Located in different country than you.
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                    <a href={university.web_pages[0]} target="_blank">
                        <ArrowUpRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </a>
                </div>
                {userCtx.isLoggedIn && (
                    <div className="ml-5 flex-shrink-0">
                        <button onClick={starClickHandler}>
                            {starred ?
                                <StarIconSolid className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                :
                                <StarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            }
                        </button>
                    </div>
                )}
            </div>
        </li>
    )
}