import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { GoogleGenerativeAI } from "@google/generative-ai";
import gifLoading from "../components/assets/Double Ring@1x-1.0s-200px-200px.svg"

export default function NewsPage() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchNews() {
    try {
      setLoading(true);
      const genAI = new GoogleGenerativeAI("AIzaSyDvw3WeTiMZil_Y_ePNrXZU7Kz9ShH5Jsw");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Get me the latest news on chiropractic care, bone health, and spinal health along this month, with this format: 
[

{

id: 1,

title: "Chiropractic Neck Adjustments and Risk",

description: "Inquest highlights the importance of patient history reviews.",

link: "https://www.example.com/news1", // Replace with actual news link

}

], 
and please give the news url which when it clicked it will go to the news page, and img url according to the news. just give the answer in the form of array, and please remove any file format from the code just pure [{},{}...].`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      let array = text.split("[");
      let a = array[1].split("]")[0];
      const news = "[" + a + "]";
      setNewsArticles(JSON.parse(news));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans"> {/* Added background and font */}
      <header className="py-6 bg-white shadow-md">
        <h1 className="text-3xl font-extrabold text-center text-blue-700"> {/* Centered header */}
          Chiropractic & Bone News Around The World
        </h1>
      </header>

      {loading ? (<>
        <div className="flex justify-center mt-28">
          <img src={gifLoading} className="w-1/5" />
        </div>
      </>) : (
        <main className="container mx-auto px-4 py-8"> {/* Added container for content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> {/* Increased gap for better spacing */}
            {newsArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </main>)}
    </div>
  )
}