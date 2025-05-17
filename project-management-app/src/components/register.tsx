import React, { useState } from 'react';
import { signIn } from "next-auth/react";

const UserRegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registrationError, setRegistrationError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const validateForm = () => {
        let isValid = true;
        let error = "";

        if (formData.name.trim().length < 2) {
            error = 'Name must be at least 2 characters.';
            isValid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            error = 'Please enter a valid email address.';
            isValid = false;
        }

        if (formData.password.length < 8) {
            error = 'Password must be at least 8 characters.';
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            error = 'Passwords do not match.';
            isValid = false;
        }

        return { isValid, error };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { isValid, error } = validateForm();
        if (!isValid) {
            setRegistrationError(error);
            return;
        }

        setIsSubmitting(true);
        setRegistrationError('');

        try {
            // Simulate API call (replace with your actual API logic)
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Simulate successful registration
            if (formData.email === 'test@example.com') {
                throw new Error('Email address is already taken.');
            }

            setRegistrationSuccess(true);
            setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
            setRegistrationError(errorMessage);

        } finally {
            setIsSubmitting(false);
        }
    };

    if (registrationSuccess) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-gray-900 shadow-lg rounded-xl p-8 max-w-md w-full text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Registration Successful!
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Thank you for registering. Proceed to login.
                    </p>
                    <button
                        onClick={() => void signIn()}
                        className="cursor-pointer bg-gray-600 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-900 shadow-lg rounded-xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-white text-center mb-6">
                    Register User
                </h2>
                <p className="text-white text-center mb-4">
                    Create an account to get started.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-white text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300 dark:border-gray-600`}
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white  leading-tight focus:outline-none focus:shadow-outline border-gray-300 dark:border-gray-600`}
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white  leading-tight focus:outline-none focus:shadow-outline border-gray-300 dark:border-gray-600`}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 ttext-gray-700 bg-white  leading-tight focus:outline-none focus:shadow-outline border-gray-300 dark:border-gray-600`}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    {registrationError && (
                        <p className="text-red-500 dark:text-red-400 text-sm">{registrationError}</p>
                    )}

                    <button
                        type="submit"
                        className={`cursor-pointer w-full bg-gray-900 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="text-gray-500 dark:text-gray-400 text-center mb-4">
                    Already Registered!
                    <button
                        className="cursor-pointer px-1 py-3 font-semibold text-white no-underline transition hover:text-white/20"
                        onClick={() => void signIn()}
                    >
                        Login
                    </button>
                    Here.
                </p>
            </div>
        </div>
    );
};

export default UserRegisterForm;