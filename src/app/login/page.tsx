'use client'

import React, {useState} from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import { Input } from '../components/ui/input';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('Login attempt:', { email, password });

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  return (
    <>
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Bookmaster</h1>
          </Link>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="space-y-1">
            <CardTitle className='text-2xl text-white'>Welcome back</CardTitle>
            <CardDescription className='text-gray-400'>Enter your credentials to access your account</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className='space-y-2'>
                <label htmlFor='email'>Email</label>
                <Input 
                  id="email"
                  type="email"
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='bg-gray-700 blue-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400'
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='password'>Password</label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='bg-gray-700 blue-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400 pr-10'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200'
                  >
                    {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                  </button>
                </div>                
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-400">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                  Forgot password?
                </Link>
              </div>
            </CardContent>

            <CardFooter className='flex flex-col space-y-4'>
              <Button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white'
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>

              <div className='text-center text-sm text-gray-400'>
                Don't have an account?{' '}
                <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        <div className='mt-8 text-center'>
          <Link href='/' className='text-blue-400 hover:text-gray-200 text-sm'>
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}