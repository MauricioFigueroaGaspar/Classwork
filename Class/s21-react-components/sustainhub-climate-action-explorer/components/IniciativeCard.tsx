const InitiativeCard = ({ initiative }: {
    // info que se recibe de las iniciativas
    initiative: {
    id: string,
    title: string,
    category: string,
    votes: number,
    description: string,
    author: string,
    }
}) => {
    // formato de las cartas
    return (
        <div className="border rounded-lg p-4 shadow-sm bg-white">
            <h3 className="text-xl font-bold mb-2">{initiative.title}</h3>
            <p className="text-gray-600 mb-4">Votos: {initiative.votes}</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded w-full font-semibold">Votar</button>
        </div>
    );
};

export default InitiativeCard;