import React, { useState } from 'react';
import { signIn } from "next-auth/react";

type LoginProps = {
    setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
};
const LoginForm = ({ setIsRegister }: LoginProps) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const validateForm = () => {
        let isValid = true;
        let error = "";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            error = 'Please enter a valid email address.';
            isValid = false;
        }

        if (formData.password.length < 8) {
            error = 'Password must be at least 8 characters.';
            isValid = false;
        }
        return { isValid, error };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { isValid, error } = validateForm();
        if (!isValid) {
            setLoginError(error);
            return;
        }

        setIsSubmitting(true);
        setLoginError('');

        try {
            await signIn("credentials", {
                redirect: true,
                email: formData.email,
                password: formData.password,
                callbackUrl: '/'
            });
            setFormData({ email: '', password: '' });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'SignIn failed. Please try again.';
            setLoginError(errorMessage);

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-900 shadow-lg rounded-xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-white text-center mb-6">
                    Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">

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

                    {loginError && (
                        <p className="text-red-500 dark:text-red-400 text-sm">{loginError}</p>
                    )}

                    <button
                        type="submit"
                        className={`cursor-pointer w-full bg-gray-900 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Signing in ...' : 'Login'}
                    </button>
                    <p className="text-gray-500 dark:text-gray-400 text-center mb-4">
                        {`Don't have an account?`}
                        <button
                            className="cursor-pointer px-1 py-3 font-semibold text-white no-underline transition hover:text-white/20"
                            onClick={() => void setIsRegister(true)}
                        >
                            Register
                        </button>
                        now.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;