
export interface CardProps {
	children: React.ReactNode
}

const Card = (props: CardProps) => {
	return (
		<div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 rounded-lg shadow-lg mt-10">
			{props?.children}
		</div>

	)
}

export default Card;

