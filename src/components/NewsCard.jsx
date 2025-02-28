

export default function NewsCard({ article }) {
    return (
        <a href={article.link} target="_blank" rel="noopener noreferrer" className="block p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">{article.title}</h3> {/* Added color to title */}
        <p className="text-sm text-gray-700">{article.description}</p>
      </a>
    );
}