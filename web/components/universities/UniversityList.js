import UniversityCard from "./UniversityCard";

export default function UniversityList({ universities, onStarClick }) {
    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {universities.map((_university) => (
                    <UniversityCard university={_university} onStarClick={onStarClick}/>
                ))}
            </ul>
        </div>
    )
}