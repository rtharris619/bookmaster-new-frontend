'use client'

import React, {useState} from "react";
import SearchBar from "./components/search-bar";
import BookCard from "./components/book-card";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Sample book data
const sampleBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop&crop=center",
    rating: 4.2,
    year: 2020,
    genre: "Fiction",
    description: "A novel about all the choices that go into a life well lived."
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop&crop=center",
    rating: 4.8,
    year: 2018,
    genre: "Self-Help",
    description: "An easy & proven way to build good habits & break bad ones."
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    cover: "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=300&h=450&fit=crop&crop=center",
    rating: 4.5,
    year: 1965,
    genre: "Science Fiction",
    description: "A science fiction epic set on the desert planet Arrakis."
  },
  {
    id: 4,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop&crop=center",
    rating: 4.6,
    year: 2020,
    genre: "Finance",
    description: "Timeless lessons on wealth, greed, and happiness."
  },
  {
    id: 5,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=450&fit=crop&crop=center",
    rating: 4.7,
    year: 2021,
    genre: "Science Fiction",
    description: "A lone astronaut must save humanity in this thrilling tale."
  },
  {
    id: 6,
    title: "Educated",
    author: "Tara Westover",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop&crop=center",
    rating: 4.4,
    year: 2018,
    genre: "Memoir",
    description: "A memoir about a young girl who, kept out of school, leaves her survivalist family."
  },
  {
    id: 7,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop&crop=center",
    rating: 4.3,
    year: 2017,
    genre: "Historical Fiction",
    description: "A reclusive Hollywood icon tells her life story to an unknown journalist."
  },
  {
    id: 8,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop&crop=center",
    rating: 4.5,
    year: 2011,
    genre: "History",
    description: "A brief history of humankind from the Stone Age to the twenty-first century."
  }
];

function HomeContent() {
  const { isLoggedIn } = useAuth();
  const [books, setBooks] = useState(sampleBooks);
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoggedIn) {
    return <>
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <p className="text-gray-400 text-lg">Discover your next favorite book</p>
          </div>
          
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
      </div>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-200">
              {searchTerm ? `Search results for "${searchTerm}"` : 'Featured Books'}
            </h2>
            <span className="text-gray-400">
              {books.length} book{books.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {books.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-500 text-6xl mb-4">📚</div>
              <h3 className="text-xl text-gray-400 mb-2">No books found</h3>
              <p className="text-gray-500">Try adjusting your search terms or genre filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </main>
      </>
  }

  if (!isLoggedIn) {
    return <>
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <p className="text-gray-400 text-lg">Home Contents coming soon...</p>
          </div>
        </div>
      </div>

      <main className="flex-1">
      </main>
      </>
  }
}

export default function Home() {
  

  return (
    <AuthProvider>
      <HomeContent>        
      </HomeContent>
    </AuthProvider>
  );
}
