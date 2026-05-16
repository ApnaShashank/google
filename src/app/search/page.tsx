import Link from "next/link";
import SearchHeader from "@/components/SearchHeader";
import Sidebar from "@/components/Sidebar";
import ChatInput from "@/components/ChatInput";
import { ChevronDown, Sparkles } from "lucide-react";

async function getSearchResults(query: string) {
  const apiKey = process.env.SERP_API_KEY;
  if (!apiKey) {
    console.error("SERP_API_KEY is not defined");
    return null;
  }

  try {
    const res = await fetch(`https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${apiKey}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching search results:", error);
    return null;
  }
}

async function getAiSummary(query: string) {
  const mistralKey = process.env.MISTRAL_API_KEY;
  if (mistralKey) {
    try {
      const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${mistralKey}`
        },
        body: JSON.stringify({
          model: "open-mistral-7b",
          messages: [
            {
              role: "system",
              content: "You are the Google AI Search overview assistant. Generate a highly informative, structured response for the user's search query. Highlight the most crucial direct answer in your first sentence. Keep the entire response under 100 words and write as a plain paragraph without headers."
            },
            {
              role: "user",
              content: query
            }
          ]
        })
      });
      if (res.ok) {
        const data = await res.json();
        return data.choices?.[0]?.message?.content || "";
      }
    } catch (e) {
      console.error("Mistral API call failed, trying Cohere:", e);
    }
  }

  // Fallback to Cohere if Mistral fails or is not available
  const cohereKey = process.env.COHERE_API_KEY;
  if (cohereKey) {
    try {
      const res = await fetch("https://api.cohere.com/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cohereKey}`
        },
        body: JSON.stringify({
          message: `You are the Google AI Search overview assistant. Generate an informative search summary (under 100 words) for: ${query}. Make the very first sentence a direct answer.`
        })
      });
      if (res.ok) {
        const data = await res.json();
        return data.text || "";
      }
    } catch (e) {
      console.error("Cohere API call failed:", e);
    }
  }

  // Final fallback snippet if both key connections fail
  return "Could not connect to AI services at the moment. However, we have fetched the latest live organic search results for your query below.";
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const isAi = params.ai === "true";
  const tbm = typeof params.tbm === "string" ? params.tbm : "";
  
  if (!q) {
    return (
      <div className="min-h-screen flex flex-col bg-[#22242A]">
        <SearchHeader query="" />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-xl text-gray-400">Please enter a search term.</p>
        </main>
      </div>
    );
  }

  const results = await getSearchResults(q);

  if (isAi) {
    // Fetch AI Summary dynamically using Mistral / Cohere API
    const aiSummary = await getAiSummary(q);
    const firstPeriodIdx = aiSummary.indexOf(". ");
    let firstSentence = aiSummary;
    let remainingText = "";

    if (firstPeriodIdx !== -1) {
      firstSentence = aiSummary.substring(0, firstPeriodIdx + 1);
      remainingText = aiSummary.substring(firstPeriodIdx + 2);
    }

    return (
      <div className="flex min-h-screen bg-[#22242A] text-gray-200">
        {/* Left Sidebar */}
        <Sidebar isOpen={true} />

        {/* Search Layout Area */}
        <div className="flex-grow flex flex-col min-h-screen overflow-x-hidden">
          <SearchHeader query={q} isAiMode={true} />

          <main className="flex-grow flex flex-col lg:flex-row p-6 gap-6 w-full max-w-7xl mx-auto">
            {/* Left AI Column */}
            <div className="flex-grow lg:w-2/3 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                {/* Search Term Pill Button */}
                <div className="flex justify-end">
                  <span className="bg-[#303134] text-gray-300 px-4 py-1.5 rounded-full text-sm font-medium">
                    {q}
                  </span>
                </div>

                {/* AI Text Output */}
                <div className="space-y-4">
                  <div className="text-base text-gray-100 leading-relaxed">
                    <strong className="text-lg text-gray-100 block mb-2 font-medium">AI Overview</strong>
                    <span className="bg-[#2a4365] text-[#a8c7fa] px-1.5 py-0.5 rounded font-medium inline mr-1 leading-loose">
                      {firstSentence}
                    </span>{" "}
                    <span>{remainingText}</span>
                  </div>
                </div>

                {/* Image Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="bg-[#303134] border border-[#4d5162] rounded-xl overflow-hidden shadow-sm">
                    <div className="h-28 bg-[#1e1f22] flex items-center justify-center p-4">
                      <div className="w-12 h-12 rounded-full border border-blue-500/30 flex items-center justify-center bg-blue-500/10">
                        <Sparkles className="w-6 h-6 text-blue-300 animate-pulse" />
                      </div>
                    </div>
                    <div className="p-3 border-t border-[#4d5162]">
                      <h4 className="text-xs font-semibold text-gray-200">Artificial Intelligence</h4>
                      <p className="text-[10px] text-gray-400 mt-1">Foundational systems simulating logic.</p>
                    </div>
                  </div>

                  <div className="bg-[#303134] border border-[#4d5162] rounded-xl overflow-hidden shadow-sm">
                    <div className="h-28 bg-[#1e1f22] flex items-center justify-center p-4">
                      <div className="w-12 h-12 rounded-full border border-purple-500/30 flex items-center justify-center bg-purple-500/10">
                        <svg className="w-6 h-6 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                      </div>
                    </div>
                    <div className="p-3 border-t border-[#4d5162]">
                      <h4 className="text-xs font-semibold text-gray-200">Machine Learning</h4>
                      <p className="text-[10px] text-gray-400 mt-1">Algorithms enabling data adaptation.</p>
                    </div>
                  </div>

                  <div className="bg-[#303134] border border-[#4d5162] rounded-xl overflow-hidden shadow-sm">
                    <div className="h-28 bg-[#1e1f22] flex items-center justify-center p-4">
                      <div className="w-12 h-12 rounded-full border border-pink-500/30 flex items-center justify-center bg-pink-500/10">
                        <svg className="w-6 h-6 text-pink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9.09 9 1.24 5.12 1.67-3.12 1.67 3.12 1.24-5.12"/></svg>
                      </div>
                    </div>
                    <div className="p-3 border-t border-[#4d5162]">
                      <h4 className="text-xs font-semibold text-gray-200">Deep Learning</h4>
                      <p className="text-[10px] text-gray-400 mt-1">Multi-layer neural network logic.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Interactive "Ask anything" Chat Input */}
              <ChatInput placeholder="Ask a follow-up question..." />
            </div>

            {/* Right Column ("17 sites" panel) */}
            <div className="lg:w-1/3 space-y-4">
              <div className="bg-[#1e1f22] border border-[#303134] rounded-2xl p-4 space-y-4 shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-400 border-b border-[#303134] pb-2">
                  <span className="font-semibold text-gray-300">17 sites</span>
                  <button className="flex items-center space-x-1 hover:text-white">
                    <span>Show all</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  {results?.organic_results?.slice(0, 3).map((result: any, idx: number) => (
                    <Link key={idx} href={result.link} className="block bg-[#2b2c31] border border-[#303134] hover:border-[#4d5162] rounded-xl p-3 transition-colors">
                      <div className="flex items-center space-x-2 text-[10px] text-gray-400 mb-1">
                        {result.favicon ? (
                          <img src={result.favicon} alt="" className="w-3 h-3 rounded-full" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-gray-500" />
                        )}
                        <span className="truncate">{result.displayed_link}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-[#a8c7fa] hover:underline line-clamp-1 mb-1">
                        {result.title}
                      </h4>
                      <p className="text-[10px] text-gray-300 line-clamp-2 leading-relaxed">
                        {result.snippet}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // STANDARD GOOGLE SEARCH RESULTS VIEW
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#22242A] text-gray-200">
      <SearchHeader query={q} tbm={tbm} />
      
      <main className="flex-grow w-full max-w-6xl px-4 sm:pl-32 py-6">
        {results?.search_information?.formatted_total_results && (
          <p className="text-sm text-gray-400 mb-6">
            About {results.search_information.formatted_total_results} results ({results.search_information.formatted_search_time} seconds)
          </p>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow max-w-2xl space-y-8">
            {results?.organic_results?.map((result: any) => (
              <div key={result.position} className="max-w-2xl">
                <div className="group">
                  <Link href={result.link} className="block">
                    <div className="flex items-center space-x-2 text-sm text-gray-300 mb-1">
                      {result.favicon && (
                        <img src={result.favicon} alt="" className="w-4 h-4 rounded-full" />
                      )}
                      <span>{result.displayed_link}</span>
                    </div>
                    <h3 className="text-xl text-[#a8c7fa] group-hover:underline mb-1">
                      {result.title}
                    </h3>
                  </Link>
                </div>
                <p className="text-sm text-gray-300 line-clamp-2 mt-1">
                  {result.snippet}
                </p>
                {result.sitelinks && (
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                    {result.sitelinks.inline?.map((link: any, idx: number) => (
                      <Link key={idx} href={link.link} className="text-sm text-[#a8c7fa] hover:underline">
                        {link.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {(!results || !results.organic_results || results.organic_results.length === 0) && (
              <div className="text-gray-300">
                <p>Your search - <b>{q}</b> - did not match any documents.</p>
                <p className="mt-4">Suggestions:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Make sure that all words are spelled correctly.</li>
                  <li>Try different keywords.</li>
                  <li>Try more general keywords.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {results?.related_searches && (
          <div className="mt-12 max-w-2xl">
            <h3 className="text-xl mb-4 text-gray-200">Related searches</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.related_searches.map((related: any, idx: number) => (
                <Link key={idx} href={related.link} className="flex items-center space-x-3 bg-[#303134] hover:bg-[#4d5162] rounded-full px-4 py-2 transition-colors">
                  <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-gray-400 fill-current">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                  </svg>
                  <span className="text-sm font-medium text-gray-300">{related.query}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
