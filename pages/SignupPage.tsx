import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { UserRole } from '../types';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const SignupPage: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.Student);
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { addToast } = useToast();
  const password = watch('password');

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await signup({
        fullName: data.fullName,
        email: data.email,
        section: 'CSE-DS',
        role,
      });
      addToast('Signup successful! Welcome to Note Nest.', 'success');
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      addToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1965&auto=format&fit=crop')" }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create a new account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <div className="flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setRole(UserRole.Student)}
                className={`w-full py-2 px-4 border border-gray-300 rounded-l-md ${role === UserRole.Student ? 'bg-accent text-white' : 'bg-white text-gray-700'}`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole(UserRole.Faculty)}
                className={`w-full py-2 px-4 border-t border-b border-r border-gray-300 rounded-r-md ${role === UserRole.Faculty ? 'bg-accent text-white' : 'bg-white text-gray-700'}`}
              >
                Faculty
              </button>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="fullName"
              label="Full Name"
              type="text"
              error={errors.fullName?.message as string}
              {...register('fullName', { required: 'Full name is required' })}
            />
            <Input
              id="email"
              label="Email address"
              type="email"
              error={errors.email?.message as string}
              {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' } })}
            />
             <Input
              id="section"
              label="Section"
              type="text"
              value="CSE-DS"
              disabled
              {...register('section')}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              error={errors.password?.message as string}
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            />
            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              error={errors.confirmPassword?.message as string}
              {...register('confirmPassword', { required: 'Please confirm your password', validate: value => value === password || 'Passwords do not match' })}
            />
            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Sign up'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-accent hover:text-blue-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;