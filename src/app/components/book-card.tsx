import React from 'react';
import { Star, Calendar, User } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  rating: number;
  year: number;
  genre: string;
  description: string;
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-600" />
      );
    }

    return stars;
  };

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group cursor-pointer">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop&crop=center";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Badge className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700">
            {book.genre}
          </Badge>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {book.title}
          </h3>
          
          <div className="flex items-center text-gray-400 mb-2">
            <User className="h-4 w-4 mr-1" />
            <span className="text-sm">{book.author}</span>
          </div>

          <div className="flex items-center text-gray-400 mb-3">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm">{book.year}</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              {renderStars(book.rating)}
            </div>
            <span className="text-sm font-medium text-gray-300">
              {book.rating.toFixed(1)}
            </span>
          </div>

          <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
            {book.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
